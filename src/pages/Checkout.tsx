import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const targetForm = '/landing-emocional.html';

const Checkout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = targetForm;
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-6">
      <div className="max-w-lg space-y-4">
        <h1 className="text-2xl font-semibold">Redirecionando para o formulário</h1>
        <p className="text-sm text-gray-300">
          Estamos encaminhando você para concluir a inscrição no novo formulário do Instituto UP.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => (window.location.href = targetForm)} className="flex-1">
            Abrir formulário agora
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => navigate('/')}>
            Voltar para a página inicial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
