import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cardholderName, setCardholderName] = useState(buyer?.name || '');
  const [docType, setDocType] = useState('CPF');
  const [docNumber, setDocNumber] = useState('');
  const [installments, setInstallments] = useState(1);
  const [paymentMethodId, setPaymentMethodId] = useState<string>('');

  // Mercado Pago Fields
  const numberEl = useRef<HTMLDivElement | null>(null);
  const expEl = useRef<HTMLDivElement | null>(null);
  const cvvEl = useRef<HTMLDivElement | null>(null);
  const fieldsRef = useRef<any>(null);

  useEffect(() => {
    if (!buyer || !product) return;
    const MP = (window as any).MercadoPago;
    const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY;
    if (!MP || !publicKey) return;

    const mp = new MP(publicKey, { locale: 'pt-BR' });
    const fields = mp.fields();
    fieldsRef.current = fields;

    const cardNumber = fields.create('cardNumber', {
      placeholder: 'Número do cartão',
      style: { label: { paddingBottom: '6px' }, input: { fontSize: '14px' } }
    });
    const expirationDate = fields.create('expirationDate', {
      placeholder: 'MM/AA',
      style: { label: { paddingBottom: '6px' }, input: { fontSize: '14px' } }
    });
    const securityCode = fields.create('securityCode', {
      placeholder: 'CVV',
      style: { label: { paddingBottom: '6px' }, input: { fontSize: '14px' } }
    });

    cardNumber.on('binChange', async (data: any) => {
      try {
        if (data?.bin && data.bin.length >= 6) {
          const methods = await mp.getPaymentMethods({ bin: data.bin });
          if (methods?.results?.[0]?.id) setPaymentMethodId(methods.results[0].id);
        }
      } catch {}
    });

    cardNumber.mount(numberEl.current!);
    expirationDate.mount(expEl.current!);
    securityCode.mount(cvvEl.current!);

    return () => {
      try {
        cardNumber?.unmount();
        expirationDate?.unmount();
        securityCode?.unmount();
      } catch {}
    };
  }, [buyer, product]);

  const handlePay = async () => {
    try {
      setError(null);
      setLoading(true);
      const MP = (window as any).MercadoPago;
      if (!MP || !fieldsRef.current) throw new Error('SDK não disponível');

      const nameParts = buyer!.name.trim().split(' ');
      const identification = { type: docType, number: docNumber.replace(/\D/g, '') };

      const tokenResp = await fieldsRef.current.createCardToken({
        cardholderName: cardholderName.trim(),
        identification
      });

      const token = tokenResp?.id;
      if (!token) throw new Error('Falha ao tokenizar o cartão');

      const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
      const url = backendUrl ? `${backendUrl}/process_payment` : '/api/process_payment';

      const body = {
        transaction_amount: Number(finalPrice),
        description: finalTitle,
        payment_method_id: paymentMethodId, // calculado via BIN
        token,
        installments: Number(installments) || 1,
        payer: {
          email: buyer!.email,
          first_name: nameParts[0] || '',
          last_name: nameParts.slice(1).join(' ') || '',
          identification
        }
      };

      const resp = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!resp.ok) throw new Error(await resp.text());
      const data = await resp.json();
      if (data.status === 'approved' || data.status === 'authorized' || data.status === 'in_process') {
        navigate('/checkout-success');
      } else {
        setError('Pagamento enviado. Aguarde confirmação.');
      }
    } catch (e: any) {
      setError(e?.message || 'Erro ao processar pagamento');
    } finally {
      setLoading(false);
    }
  };

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
          <div className="text-2xl font-bold">Pagamento (Cartão)</div>
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded">{error}</div>
          )}
          <div className="space-y-3">
            <div>
              <Label>Nome no cartão</Label>
              <Input value={cardholderName} onChange={(e) => setCardholderName(e.target.value)} placeholder="Como está no cartão" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Documento</Label>
                <div className="flex gap-2">
                  <select className="border rounded px-2 py-2 text-sm" value={docType} onChange={(e) => setDocType(e.target.value)}>
                    <option value="CPF">CPF</option>
                    <option value="CNPJ">CNPJ</option>
                  </select>
                  <Input value={docNumber} onChange={(e) => setDocNumber(e.target.value)} placeholder="Somente números" />
                </div>
              </div>
              <div>
                <Label>Parcelas</Label>
                <select className="border rounded px-2 py-2 w-full text-sm" value={installments} onChange={(e) => setInstallments(Number(e.target.value))}>
                  <option value={1}>1x</option>
                  <option value={2}>2x</option>
                  <option value={3}>3x</option>
                  <option value={4}>4x</option>
                  <option value={5}>5x</option>
                  <option value={6}>6x</option>
                  <option value={12}>12x</option>
                </select>
              </div>
            </div>
            <div>
              <Label>Número do cartão</Label>
              <div ref={numberEl} className="border rounded px-3 py-2" id="mpf-card-number"></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Validade (MM/AA)</Label>
                <div ref={expEl} className="border rounded px-3 py-2" id="mpf-exp"></div>
              </div>
              <div>
                <Label>CVV</Label>
                <div ref={cvvEl} className="border rounded px-3 py-2" id="mpf-cvv"></div>
              </div>
            </div>
            <Button onClick={handlePay} disabled={loading}>
              {loading ? 'Processando...' : 'Pagar agora'}
            </Button>
            <Button variant="outline" onClick={() => navigate(-1)}>Voltar</Button>
          </div>
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
