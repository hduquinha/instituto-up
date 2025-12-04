import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const CheckoutSuccess: React.FC = () => {
  useEffect(() => {
    // Scroll para o topo da página
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto text-center">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            Pagamento Aprovado!
          </CardTitle>
          <CardDescription className="text-green-600">
            Sua compra foi processada com sucesso
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              🎉 <strong>Parabéns!</strong> Você foi adicionado ao nosso Grupo VIP.
            </p>
            <p className="text-sm text-green-700 mt-2">
              Em breve você receberá um email com todas as informações 
              sobre como acessar o conteúdo.
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p>✅ Pagamento confirmado</p>
            <p>✅ Email de confirmação enviado</p>
            <p>✅ Acesso ao conteúdo liberado</p>
          </div>

          <div className="pt-4">
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full"
            >
              Voltar ao Início
            </Button>
          </div>

          <p className="text-xs text-gray-500">
            Se você tiver alguma dúvida, entre em contato conosco.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutSuccess;
