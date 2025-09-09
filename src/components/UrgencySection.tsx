import React, { useState, useEffect } from 'react';
import { Clock, Zap, Shield, Star } from 'lucide-react';
import CheckoutForm from './CheckoutForm';

const UrgencySection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer when it reaches zero
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStandardPurchase = () => {
    const standardProduct = {
      id: 'standard',
      title: 'Instituto UP - Standard',
      description: '🎯 STANDARD - Sua Transformação Começa Aqui!\n\n✅ 2 dias de treinamento ao vivo\n✅ Material de apoio em PDF premium\n✅ Acesso à comunidade exclusiva\n✅ Certificado de participação\n✅ Suporte via comunidade\n\n💡 Ideal para quem quer dar o primeiro passo rumo ao sucesso!\n\n🔥 OFERTA LIMITADA: De R$197 por apenas R$47 (76% OFF)',
      additionalInfo: 'Treinamento: 2 dias ao vivo | Material: PDF premium | Comunidade: Acesso vitalício | Certificado: Incluído | Desconto: 76% OFF',
      price: 47
    };
    
    setSelectedProduct(standardProduct);
    setShowForm(true);
  };

  const handleVIPPurchase = () => {
    const vipProduct = {
      id: 'up-vip',
      title: 'Instituto UP - UP VIP',
      description: '🚀 UP VIP - A Experiência Completa! (MAIS ESCOLHIDO)\n\n✅ TUDO do plano Standard, MAIS:\n✅ Gravações por 1 ano completo\n✅ Sessão Bônus Q&A em grupo\n✅ Módulo extra: Produtividade Acelerada\n✅ Grupo VIP exclusivo no WhatsApp\n✅ Suporte direto com os mentores\n✅ Material bônus exclusivo\n✅ Certificado VIP diferenciado\n\n🔥 MÁXIMO APROVEITAMENTO garantido!\n\n💎 OFERTA VIP: De R$497 por apenas R$197 (60% OFF)\n⚡ APENAS 20 VAGAS DISPONÍVEIS!',
      additionalInfo: 'Gravações: 1 ano | Bônus: Sessão Q&A | Extra: Produtividade Acelerada | VIP: Comunidade exclusiva | WhatsApp: Grupo VIP | Suporte: Direto com mentores',
      price: 197
    };
    
    setSelectedProduct(vipProduct);
    setShowForm(true);
  };

  return (
    <section className="relative bg-gradient-to-br from-red-900/20 via-black to-orange-900/20 py-20 px-4 sm:px-6 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container max-w-7xl mx-auto px-4">
        {/* Timer section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-red-500/20 border border-red-500/30 rounded-full px-8 py-4 mb-10 transition-all duration-500 ease-in-out hover:bg-red-500/30">
            <Clock className="w-6 h-6 text-red-400 mr-3 animate-pulse" />
            <span className="text-red-400 font-bold text-lg">OFERTA EXPIRA EM:</span>
          </div>
          
          <div className="flex justify-center gap-6 mb-12">
            <div className="bg-black/60 rounded-2xl p-6 min-w-[100px] border border-red-500/20 transition-all duration-500 ease-in-out hover:scale-110">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-400">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider mt-2">Horas</div>
            </div>
            <div className="bg-black/60 rounded-2xl p-6 min-w-[100px] border border-red-500/20 transition-all duration-500 ease-in-out hover:scale-110">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-400">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider mt-2">Min</div>
            </div>
            <div className="bg-black/60 rounded-2xl p-6 min-w-[100px] border border-red-500/20 transition-all duration-500 ease-in-out hover:scale-110">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-400">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider mt-2">Seg</div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            🔥 ÚLTIMA CHANCE: <span className="text-red-400">76% OFF</span>
          </h2>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-6xl mx-auto leading-relaxed">
            Depois que o timer zerar, os preços voltam ao normal e você pode ter que esperar meses para uma nova oportunidade como esta.
          </p>
        </div>

        {/* Main offer */}
        <div className="bg-gradient-to-r from-black/80 to-gray-900/80 rounded-3xl border border-red-500/30 p-8 md:p-16 mb-20 transition-all duration-500 ease-in-out hover:scale-[1.02]">
          <div className="text-center">
            <div className="bg-red-500/20 inline-flex items-center rounded-full px-8 py-4 mb-10">
              <Zap className="w-6 h-6 text-red-400 mr-3" />
              <span className="text-red-400 font-bold text-lg">OFERTA RELÂMPAGO</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 leading-tight">
              Sua transformação não pode esperar mais
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 max-w-6xl mx-auto">
              {/* Standard offer */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-8 border border-gray-600 transition-all duration-500 ease-in-out hover:scale-105">
                <div className="bg-blue-500/20 rounded-2xl p-6 mb-6">
                  <h4 className="text-3xl font-bold text-white">STANDARD</h4>
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <span className="text-xl text-gray-400 line-through">R$ 197</span>
                    <span className="text-5xl font-bold text-white">R$ 47</span>
                  </div>
                  <div className="bg-red-500 text-white text-base font-bold px-4 py-2 rounded-full mt-4 inline-block">
                    76% OFF
                  </div>
                </div>
                <ul className="text-left space-y-4 mb-8">
                  <li className="flex items-center text-gray-300 text-lg">
                    <span className="text-green-400 mr-3 text-xl">✓</span>
                    2 dias de treinamento ao vivo
                  </li>
                  <li className="flex items-center text-gray-300 text-lg">
                    <span className="text-green-400 mr-3 text-xl">✓</span>
                    Material premium em PDF
                  </li>
                  <li className="flex items-center text-gray-300 text-lg">
                    <span className="text-green-400 mr-3 text-xl">✓</span>
                    Comunidade exclusiva
                  </li>
                  <li className="flex items-center text-gray-300 text-lg">
                    <span className="text-green-400 mr-3 text-xl">✓</span>
                    Certificado de participação
                  </li>
                </ul>
                <button 
                  onClick={handleStandardPurchase}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-6 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-500 ease-in-out transform hover:scale-105 text-xl"
                >
                  GARANTIR STANDARD
                </button>
              </div>

              {/* VIP offer */}
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl p-8 border-2 border-orange-500/40 relative transition-all duration-500 ease-in-out hover:scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-base font-bold">
                    🔥 MAIS ESCOLHIDO
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-2xl p-6 mb-6 mt-6">
                  <h4 className="text-3xl font-bold text-white">UP VIP</h4>
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <span className="text-xl text-gray-400 line-through">R$ 497</span>
                    <span className="text-5xl font-bold text-white">R$ 197</span>
                  </div>
                  <div className="bg-red-500 text-white text-base font-bold px-4 py-2 rounded-full mt-4 inline-block">
                    60% OFF
                  </div>
                </div>
                <ul className="text-left space-y-4 mb-8">
                  <li className="flex items-center text-orange-300 font-bold text-lg">
                    <span className="text-orange-400 mr-3 text-xl">✓</span>
                    TUDO do Standard +
                  </li>
                  <li className="flex items-center text-gray-300 text-lg">
                    <span className="text-green-400 mr-3 text-xl">✓</span>
                    Gravações por 1 ano
                  </li>
                  <li className="flex items-center text-gray-300 text-lg">
                    <span className="text-green-400 mr-3 text-xl">✓</span>
                    Sessão Q&A bônus
                  </li>
                  <li className="flex items-center text-gray-300 text-lg">
                    <span className="text-green-400 mr-3 text-xl">✓</span>
                    Módulo Produtividade Acelerada
                  </li>
                  <li className="flex items-center text-gray-300 text-lg">
                    <span className="text-green-400 mr-3 text-xl">✓</span>
                    Grupo VIP WhatsApp
                  </li>
                  <li className="flex items-center text-gray-300 text-lg">
                    <span className="text-green-400 mr-3 text-xl">✓</span>
                    Suporte direto mentores
                  </li>
                </ul>
                <button 
                  onClick={handleVIPPurchase}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-6 rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-500 ease-in-out transform hover:scale-105 text-xl"
                >
                  GARANTIR VIP AGORA
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="flex items-center justify-center text-gray-300 text-lg">
                <Shield className="w-6 h-6 text-green-400 mr-3" />
                <span>7 dias de garantia</span>
              </div>
              <div className="flex items-center justify-center text-gray-300 text-lg">
                <Star className="w-6 h-6 text-yellow-400 mr-3" />
                <span>97% de satisfação</span>
              </div>
              <div className="flex items-center justify-center text-gray-300 text-lg">
                <Zap className="w-6 h-6 text-blue-400 mr-3" />
                <span>Acesso imediato</span>
              </div>
            </div>
          </div>
        </div>

        {/* Final warning */}
        <div className="bg-red-900/30 border border-red-500/40 rounded-2xl p-8 text-center">
          <h4 className="text-xl md:text-2xl font-bold text-white mb-4">
            ⚠️ ATENÇÃO: Esta oferta pode sair do ar a qualquer momento
          </h4>
          <p className="text-gray-300 mb-6">
            Não queremos que você perca essa oportunidade única de transformar sua vida com o maior desconto que já oferecemos.
          </p>
          <p className="text-red-400 font-bold">
            👆 Role para cima e escolha seu plano antes que seja tarde demais!
          </p>
        </div>
      </div>

      {/* Modal do Checkout */}
      {showForm && selectedProduct && (
        <CheckoutForm
          productData={selectedProduct}
          onClose={() => {
            setShowForm(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </section>
  );
};

export default UrgencySection;
