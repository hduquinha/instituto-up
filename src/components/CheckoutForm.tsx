import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2 } from 'lucide-react';
import { Checkbox } from './ui/checkbox';

interface CheckoutFormProps {
  productData: {
    id?: string;
    title: string;
    description?: string;
    price: number;
  };
  onClose?: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  includeRecording: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ productData, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    includeRecording: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      includeRecording: checked
    }));
  };

  const calculateTotalPrice = () => {
    return productData.price + (formData.includeRecording ? 100 : 0);
  };

  const formatPhoneNumber = (phone: string) => {
    // Remove todos os caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Se começar com 55, remove (código do Brasil)
    if (cleanPhone.startsWith('55') && cleanPhone.length > 11) {
      return cleanPhone.substring(2);
    }
    
    return cleanPhone;
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Nome é obrigatório');
      return false;
    }
    
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Email válido é obrigatório');
      return false;
    }
    
    if (!formData.phone.trim()) {
      setError('Telefone é obrigatório');
      return false;
    }
    
    const cleanPhone = formatPhoneNumber(formData.phone);
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      setError('Telefone deve ter 10 ou 11 dígitos');
      return false;
    }
    
    return true;
  };

  const navigate = useNavigate();

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const totalPrice = calculateTotalPrice();
      const buyerData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formatPhoneNumber(formData.phone)
      };

      // opcional: enviar remarketing antes de navegar
      const remarketingWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_REMARKETING;
      if (remarketingWebhookUrl && remarketingWebhookUrl !== 'https://seu-n8n.webhook.url/remarketing') {
        fetch(remarketingWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...buyerData,
            product: formData.includeRecording ? `${productData.title} + Aula Gravada` : productData.title,
            price: totalPrice,
            includeRecording: formData.includeRecording,
            timestamp: new Date().toISOString(),
            source: 'checkout_step1'
          })
        }).catch(() => {});
      }

      // Persistimos a sessão para suportar refresh/abertura direta do /checkout
      try {
        const payload = {
          buyer: buyerData,
          product: productData,
          includeRecording: formData.includeRecording,
          price: totalPrice,
          ts: Date.now()
        };
        sessionStorage.setItem('checkout:session', JSON.stringify(payload));
      } catch {}

      navigate('/checkout', {
        state: {
          buyer: buyerData,
          product: productData,
          includeRecording: formData.includeRecording
        }
      });
    } catch (err: any) {
      setError(err?.message || 'Erro ao iniciar checkout');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Finalizar Compra
          </CardTitle>
          <CardDescription className="text-center">
            {productData.title}
            <div className="mt-2">
              <span className="text-lg font-semibold">Total: R$ {calculateTotalPrice().toFixed(2)}</span>
              {formData.includeRecording && (
                <div className="text-sm text-gray-600 mt-1">
                  Base: R$ {productData.price.toFixed(2)} + Aula Gravada: R$ 100,00
                </div>
              )}
            </div>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleContinue} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Seu nome completo"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="seu@email.com"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone/WhatsApp *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(11) 99999-9999"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-3 pt-2">
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="includeRecording"
                    checked={formData.includeRecording}
                    onCheckedChange={handleCheckboxChange}
                    disabled={isLoading}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label 
                      htmlFor="includeRecording" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Adicionar Aula Gravada (+R$ 100,00)
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Acesso vitalício à gravação da aula para rever quando quiser
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Continuando...
                  </>
                ) : (
                  `Continuar`
                )}
              </Button>
            </div>
          </form>

          <div className="mt-4 text-xs text-gray-500 text-center">
            <div className="mb-2">
              <strong>✅ Compra 100% Segura pelo Mercado Pago</strong>
            </div>
            <div className="text-xs">
              Você escolherá sua forma de pagamento preferida:
            </div>
            <div className="mt-1 font-medium text-gray-700">
              📱 <strong>PIX</strong> (instantâneo) | 💳 <strong>Cartão</strong> (até 12x) | 🏦 <strong>Débito</strong> | 🎫 <strong>Boleto</strong>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              🔒 Dados protegidos | 🛡️ SSL | 📞 Suporte 24h
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutForm;
