import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import heroBackground from '@/assets/hero-background.jpg';

type Buyer = { name: string; email: string; phone: string };
type Product = { id?: string; title: string; description?: string; price: number; image?: string };

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state as any) || {};
  // Recupera do estado de navegação OU do sessionStorage
  let initialBuyer: Buyer | undefined = state.buyer;
  let initialProduct: Product | undefined = state.product;
  let initialIncludeRecording: boolean = !!state.includeRecording;
  if (!initialBuyer || !initialProduct) {
    try {
      const raw = typeof window !== 'undefined' ? sessionStorage.getItem('checkout:session') : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        initialBuyer = parsed?.buyer;
        initialProduct = parsed?.product;
        initialIncludeRecording = !!parsed?.includeRecording;
      }
    } catch {}
  }
  const [buyer, setBuyer] = useState<Buyer | undefined>(initialBuyer);
  const [product, setProduct] = useState<Product | undefined>(initialProduct);
  const [includeRecording, setIncludeRecording] = useState<boolean>(initialIncludeRecording);

  const finalTitle = product ? (includeRecording ? `${product.title} + Aula Gravada` : product.title) : '';
  const finalPrice = product ? product.price + (includeRecording ? 100 : 0) : 0;

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cardholderName, setCardholderName] = useState(buyer?.name || '');
  const [docType, setDocType] = useState('CPF');
  const [docNumber, setDocNumber] = useState('');
  const [installments, setInstallments] = useState(1);
  const [paymentMethodId, setPaymentMethodId] = useState<string>('');
  const [installmentOptions, setInstallmentOptions] = useState<Array<{ value: number; label: string }>>([{ value: 1, label: '1x sem juros' }]);
  const [activeTab, setActiveTab] = useState<'card'|'pix'|'boleto'>('card');

  // Mercado Pago Fields
  const numberEl = useRef<HTMLDivElement | null>(null);
  const expEl = useRef<HTMLDivElement | null>(null);
  const cvvEl = useRef<HTMLDivElement | null>(null);
  const fieldsRef = useRef<any>(null);

  useEffect(() => {
    if (!buyer || !product) return;
    const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY;
    if (!publicKey) {
      setError('Chave pública não configurada (VITE_MP_PUBLIC_KEY).');
      return;
    }

    // Garante que estamos no client
    if (typeof window === 'undefined') return;
    const MP = (window as any).MercadoPago;
    if (!MP) {
      setError('SDK do Mercado Pago não foi carregado.');
      return;
    }

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

          // Parcelas dinâmicas com base no BIN e valor
          try {
            const inst = await mp.getInstallments({ amount: Number(finalPrice), bin: data.bin });
            const payerCosts = inst?.[0]?.payer_costs || [];
            const opts = payerCosts.slice(0, 12).map((pc: any) => ({
              value: pc.installments,
              label: `${pc.installments}x de R$ ${pc.installment_amount?.toFixed?.(2)}${pc.installments_rate === 0 ? ' sem juros' : ''} (Total R$ ${pc.total_amount?.toFixed?.(2)})`
            }))
            setInstallmentOptions(opts.length ? opts : [{ value: 1, label: '1x sem juros' }]);
            if (opts.length) setInstallments(opts[0].value);
          } catch {}
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

  const handlePayCard = async () => {
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

  const handlePayPix = async () => {
    try {
      setError(null);
      setLoading(true);
      const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
      const url = backendUrl ? `${backendUrl}/process_payment` : '/api/process_payment';
      const nameParts = buyer!.name.trim().split(' ');
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transaction_amount: Number(finalPrice),
          description: finalTitle,
          payment_method_id: 'pix',
          payer: {
            email: buyer!.email,
            first_name: nameParts[0] || '',
            last_name: nameParts.slice(1).join(' ') || ''
          }
        })
      });
      if (!resp.ok) throw new Error(await resp.text());
      const data = await resp.json();
      const t = data?.point_of_interaction?.transaction_data;
      if (t?.qr_code_base64 || t?.qr_code_link) {
        // Abre em nova aba; opcionalmente poderíamos exibir inline numa modal.
        if (t.qr_code_link) window.open(t.qr_code_link, '_blank');
      }
    } catch (e: any) {
      setError(e?.message || 'Erro no PIX');
    } finally {
      setLoading(false);
    }
  };

  const handlePayBoleto = async () => {
    try {
      setError(null);
      setLoading(true);
      const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
      const url = backendUrl ? `${backendUrl}/process_payment` : '/api/process_payment';
      const nameParts = buyer!.name.trim().split(' ');
      const identification = { type: 'CPF', number: docNumber.replace(/\D/g, '') };
      if (!identification.number) throw new Error('Informe o CPF');
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transaction_amount: Number(finalPrice),
          description: finalTitle,
          payment_method_id: 'bolbradesco',
          payer: {
            email: buyer!.email,
            first_name: nameParts[0] || '',
            last_name: nameParts.slice(1).join(' ') || '',
            identification
          }
        })
      });
      if (!resp.ok) throw new Error(await resp.text());
      const data = await resp.json();
      const ticket = data?.point_of_interaction?.transaction_data?.ticket_url || data?.transaction_details?.external_resource_url;
      if (ticket) window.open(ticket, '_blank');
    } catch (e: any) {
      setError(e?.message || 'Erro no boleto');
    } finally {
      setLoading(false);
    }
  };

  // Fallback inline: coleta dados básicos e produto quando não há sessão
  const [fbName, setFbName] = useState('');
  const [fbEmail, setFbEmail] = useState('');
  const [fbPhone, setFbPhone] = useState('');
  const [fbPlan, setFbPlan] = useState<'standard' | 'vip'>('standard');

  const formatPhone = (phone: string) => phone.replace(/\D/g, '').replace(/^55/, '');
  const startInlineCheckout = () => {
    const cleanName = fbName.trim();
    const cleanEmail = fbEmail.trim().toLowerCase();
    const cleanPhone = formatPhone(fbPhone);
    if (!cleanName || !cleanEmail.includes('@') || cleanPhone.length < 10) {
      setError('Preencha nome, email válido e telefone.');
      return;
    }
    const chosen: Product = fbPlan === 'vip'
      ? { id: 'up-vip', title: 'Instituto UP - UP VIP', price: 197, description: 'Plano VIP' }
      : { id: 'standard', title: 'Instituto UP - Standard', price: 47, description: 'Plano Standard' };
    const buyerData: Buyer = { name: cleanName, email: cleanEmail, phone: cleanPhone };
    setBuyer(buyerData);
    setProduct(chosen);
    setIncludeRecording(false);
    try {
      sessionStorage.setItem('checkout:session', JSON.stringify({ buyer: buyerData, product: chosen, includeRecording: false, ts: Date.now() }));
    } catch {}
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {!buyer || !product ? (
        <div className="max-w-3xl mx-auto p-6">
          <Card className="w-full">
            <CardContent className="p-6 space-y-4">
              <div className="text-xl font-semibold">Iniciar Checkout</div>
              {error && <div className="text-sm text-red-700 bg-red-50 border border-red-200 p-3 rounded">{error}</div>}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Nome completo</Label>
                  <Input value={fbName} onChange={e=>setFbName(e.target.value)} placeholder="Seu nome" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={fbEmail} onChange={e=>setFbEmail(e.target.value)} placeholder="seu@email.com" />
                </div>
                <div>
                  <Label>WhatsApp</Label>
                  <Input value={fbPhone} onChange={e=>setFbPhone(e.target.value)} placeholder="(11) 99999-9999" />
                </div>
                <div>
                  <Label>Plano</Label>
                  <select className="border rounded px-3 py-2 w-full" value={fbPlan} onChange={e=>setFbPlan(e.target.value as any)}>
                    <option value="standard">Standard (R$ 47)</option>
                    <option value="vip">UP VIP (R$ 197)</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={startInlineCheckout} className="flex-1" variant="cta">Continuar</Button>
                <Button variant="outline" className="flex-1" onClick={()=>navigate('/')}>Voltar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}
      {/* Header com fundo da landing */}
      <div
        className="w-full mb-6 rounded-xl overflow-hidden border border-white/10"
        style={{ backgroundImage: `url(${heroBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="bg-black/60">
          <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Finalize sua compra com <span className="text-turquoise">segurança</span>
            </h1>
            <p className="text-gray-200 mt-1">Dados protegidos • SSL • Mercado Pago</p>
          </div>
        </div>
      </div>

      {buyer && product ? (
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="text-3xl font-extrabold tracking-tight">Formas de pagamento</div>
          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 p-3 rounded">{error}</div>
          )}
          <Tabs value={activeTab} onValueChange={(v:any)=>setActiveTab(v)} className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="card">Cartão</TabsTrigger>
              <TabsTrigger value="pix">PIX</TabsTrigger>
              <TabsTrigger value="boleto">Boleto</TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="space-y-3 pt-3">
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
                  {installmentOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="relative">
              <Label>Número do cartão</Label>
              <div ref={numberEl} className="border rounded px-3 py-2" id="mpf-card-number"></div>
              <div className="absolute right-2 top-8 text-xs text-turquoise">Seguro • SSL</div>
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
            <div className="flex gap-3 pt-2">
              <Button onClick={handlePayCard} disabled={loading} className="flex-1" variant="cta">
                {loading ? 'Processando...' : 'Pagar agora'}
              </Button>
              <Button variant="outline" onClick={() => navigate(-1)} className="flex-1">Voltar</Button>
            </div>
            </TabsContent>

            <TabsContent value="pix" className="space-y-3 pt-3">
              <p className="text-sm text-gray-700">Geraremos um QR Code PIX em seguida.</p>
              <div className="flex gap-3 pt-2">
                <Button onClick={handlePayPix} disabled={loading} className="flex-1" variant="cta">
                  {loading ? 'Gerando...' : 'Pagar com PIX'}
                </Button>
                <Button variant="outline" onClick={() => navigate(-1)} className="flex-1">Voltar</Button>
              </div>
            </TabsContent>

            <TabsContent value="boleto" className="space-y-3 pt-3">
              <div>
                <Label>CPF</Label>
                <Input value={docNumber} onChange={(e)=>setDocNumber(e.target.value)} placeholder="Somente números" />
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={handlePayBoleto} disabled={loading} className="flex-1" variant="cta">
                  {loading ? 'Gerando...' : 'Gerar boleto'}
                </Button>
                <Button variant="outline" onClick={() => navigate(-1)} className="flex-1">Voltar</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
  <div className="space-y-4">
          <Card className="shadow-sm border-turquoise/30">
            <CardContent className="p-4">
              <div className="aspect-video bg-white border rounded flex items-center justify-center overflow-hidden border-turquoise/30">
                <img src={product.image || '/up.png'} alt={product.title} className="object-cover w-full h-full" />
              </div>
              <div className="mt-4">
                <div className="text-xl font-semibold">{finalTitle}</div>
                <div className="text-gray-600 text-sm mt-1">{product.description || 'Compra 100% segura pelo Mercado Pago'}</div>
                <div className="mt-3 text-2xl font-bold text-turquoise">R$ {finalPrice.toFixed(2)}</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-4 text-sm text-gray-700 space-y-1">
              <div>Nome: {buyer.name}</div>
              <div>Email: {buyer.email}</div>
              <div>WhatsApp: {buyer.phone}</div>
            </CardContent>
          </Card>
        </div>
  </div>
  ) : null}
    </div>
  );
};

export default Checkout;
