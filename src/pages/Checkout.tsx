import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Buyer = { name: string; email: string; phone: string };
type Product = { id?: string; title: string; description?: string; price: number; image?: string };

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state as any) || {};
  const buyer: Buyer | undefined = state.buyer;
  const product: Product | undefined = state.product;
  const includeRecording: boolean = !!state.includeRecording;

  const finalTitle = product ? (includeRecording ? `${product.title} + Aula Gravada` : product.title) : '';
  const finalPrice = product ? product.price + (includeRecording ? 100 : 0) : 0;

  const brickContainerRef = useRef<HTMLDivElement | null>(null);
  const [brickReady, setBrickReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pixData, setPixData] = useState<{
    qr_code_base64?: string;
    qr_code?: string;
    qr_code_link?: string;
  } | null>(null);

  useEffect(() => {
    if (!buyer || !product) return;

    const MP = (window as any).MercadoPago;
    const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY;
    if (!MP || !publicKey) return;

    if (brickContainerRef.current) brickContainerRef.current.innerHTML = '';
    const mp = new MP(publicKey, { locale: 'pt-BR' });
    const bricks = mp.bricks();

  bricks.create('payment', 'payment-brick', {
      initialization: { amount: Number(finalPrice) },
      customization: {
        visual: { style: { theme: 'default' } },
        paymentMethods: { ticket: 'all', bankTransfer: 'all', creditCard: 'all' }
      },
      callbacks: {
        onReady: () => setBrickReady(true),
        onSubmit: async (cardData: any) => {
          try {
            setError(null);
            const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
            const url = backendUrl ? `${backendUrl}/process_payment` : '/api/process_payment';

            const nameParts = buyer.name.trim().split(' ');
            // Detecta método de pagamento de forma robusta
            const method = cardData?.paymentMethodId
              || cardData?.payment_method_id
              || cardData?.selectedPaymentMethod?.id
              || cardData?.selectedPaymentMethod
              || '';

            const isPix = typeof method === 'string' && method.toLowerCase().includes('pix');

            const body: any = {
              transaction_amount: Number(finalPrice),
              description: finalTitle,
              payment_method_id: method || 'pix',
              payer: {
                email: buyer.email,
                first_name: nameParts[0] || '',
                last_name: nameParts.slice(1).join(' ') || '',
              }
            };

            // Inclusões condicionais: cartão pode enviar token e parcelas
            if (cardData?.token) body.token = cardData.token;
            if (cardData?.installments) body.installments = Number(cardData.installments) || 1;
            if (cardData?.payer?.identification) body.payer.identification = cardData.payer.identification;

            const resp = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
            if (!resp.ok) throw new Error(await resp.text());
            const data = await resp.json();
            if (data.status === 'approved' || data.status === 'authorized') {
              navigate('/checkout-success');
            } else if (data.point_of_interaction?.transaction_data?.ticket_url) {
              window.location.href = data.point_of_interaction.transaction_data.ticket_url;
            } else if (data.point_of_interaction?.transaction_data?.qr_code || data.point_of_interaction?.transaction_data?.qr_code_base64) {
              // Exibe QR Code PIX na página
              const t = data.point_of_interaction.transaction_data;
              setPixData({
                qr_code: t.qr_code,
                qr_code_base64: t.qr_code_base64,
                qr_code_link: t.qr_code_link
              });
            } else {
              navigate('/checkout-success');
            }
          } catch (e: any) {
            setError(e?.message || 'Erro ao processar pagamento');
          }
        },
        onError: () => setError('Erro no componente de pagamento')
      }
    });
  }, [buyer, product, includeRecording, finalPrice, finalTitle, navigate]);

  if (!buyer || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center space-y-4">
            <div className="text-lg font-semibold">Sessão de checkout expirada</div>
            <p className="text-sm text-gray-600">Volte e preencha seus dados para continuar.</p>
            <Button onClick={() => navigate('/')}>Voltar</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="text-2xl font-bold">Pagamento</div>
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded">{error}</div>
          )}
          {!pixData && <div ref={brickContainerRef} id="payment-brick"></div>}
          {pixData && (
            <div className="space-y-3">
              <div className="text-sm text-gray-700">Escaneie o QR Code abaixo para pagar via PIX:</div>
              {pixData.qr_code_base64 ? (
                <img
                  alt="QR Code PIX"
                  className="w-64 h-64 border rounded bg-white"
                  src={`data:image/png;base64,${pixData.qr_code_base64}`}
                />
              ) : (
                <div className="text-xs text-gray-500">QR Code indisponível</div>
              )}
              {pixData.qr_code && (
                <div className="text-xs break-all bg-gray-50 p-2 rounded border">{pixData.qr_code}</div>
              )}
              <div className="flex gap-2">
                {pixData.qr_code && (
                  <Button
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(pixData.qr_code!);
                      } catch {}
                    }}
                  >Copiar código PIX</Button>
                )}
                {pixData.qr_code_link && (
                  <Button type="button" onClick={() => window.open(pixData.qr_code_link!, '_blank')}>Abrir no app do banco</Button>
                )}
              </div>
              <div className="text-xs text-gray-500">Após o pagamento, você será redirecionado automaticamente ou pode voltar para a página.</div>
            </div>
          )}
          <Button variant="outline" onClick={() => navigate(-1)}>Voltar</Button>
        </div>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="aspect-video bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                <img src={product.image || '/up.png'} alt={product.title} className="object-cover w-full h-full" />
              </div>
              <div className="mt-4">
                <div className="text-lg font-semibold">{finalTitle}</div>
                <div className="text-gray-600 text-sm mt-1">{product.description || 'Compra 100% segura pelo Mercado Pago'}</div>
                <div className="mt-3 text-xl font-bold">R$ {finalPrice.toFixed(2)}</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-sm text-gray-600 space-y-1">
              <div>Nome: {buyer.name}</div>
              <div>Email: {buyer.email}</div>
              <div>WhatsApp: {buyer.phone}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
