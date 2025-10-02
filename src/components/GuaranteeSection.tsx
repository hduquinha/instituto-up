import React from 'react';
import { Shield, Clock, Star, CheckCircle } from 'lucide-react';

const GuaranteeSection = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 flex justify-center items-center opacity-20 pointer-events-none">
        <div className="w-[800px] h-[800px] bg-turquoise/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container max-w-7xl mx-auto px-4">
        {/* Main guarantee card */}
        <div className="bg-gradient-to-r from-turquoise/10 to-blue-500/10 rounded-3xl border border-turquoise/30 p-6 md:p-12 mb-16 transition-all duration-500 ease-in-out hover:scale-[1.02]">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-turquoise/20 p-8 rounded-full transition-all duration-500 ease-in-out hover:bg-turquoise/30">
                <Shield className="w-16 h-16 text-turquoise" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              🛡️ GARANTIA INCONDICIONAL <span className="text-turquoise">NO DIA</span>
            </h2>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-10 leading-relaxed max-w-5xl mx-auto">
              Apenas no dia, no final do treinamento, se o treinamento não for excelente,
              <span className="text-white font-bold"> devolvemos 100% do seu dinheiro</span> gasto no treinamento.
            </p>
            
            <div className="bg-black/40 rounded-2xl p-8 border border-turquoise/20 max-w-4xl mx-auto">
              <p className="text-turquoise font-bold text-xl lg:text-2xl mb-3">
                ✅ Garantia válida no local, no mesmo dia
              </p>
              <p className="text-gray-400 text-lg lg:text-xl">
                Estamos tão confiantes na qualidade do nosso treinamento que oferecemos reembolso total no próprio dia se não for excelente.
              </p>
            </div>
          </div>
        </div>

        {/* Urgency section */}
        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-3xl border border-red-500/30 p-6 md:p-12 mb-16 transition-all duration-500 ease-in-out hover:scale-[1.02]">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-red-500/20 p-8 rounded-full animate-pulse">
                <Clock className="w-16 h-16 text-red-400" />
              </div>
            </div>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              ⏰ ÚLTIMAS HORAS: <span className="text-red-400">Oferta Especial</span>
            </h3>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto">
              Esta oferta com desconto de até 76% é limitada e pode sair do ar a qualquer momento.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-black/50 rounded-2xl p-8 border border-red-500/20 transition-all duration-500 ease-in-out hover:scale-105">
                <h4 className="text-red-400 font-bold text-2xl mb-4">🔥 STANDARD</h4>
                <p className="text-white">
                  <span className="line-through text-gray-500 text-xl">R$ 197</span> 
                  <span className="text-4xl font-bold ml-4">R$ 47</span>
                </p>
                <p className="text-base text-gray-400 mt-3">Últimas vagas disponíveis</p>
              </div>
              
              <div className="bg-black/50 rounded-2xl p-8 border border-orange-500/20 transition-all duration-500 ease-in-out hover:scale-105">
                <h4 className="text-orange-400 font-bold text-2xl mb-4">⭐ UP VIP</h4>
                <p className="text-white">
                  <span className="line-through text-gray-500 text-xl">R$ 497</span> 
                  <span className="text-4xl font-bold ml-4">R$ 197</span>
                </p>
                <p className="text-base text-gray-400 mt-3">APENAS 20 vagas restantes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="text-center transition-all duration-500 ease-in-out hover:scale-110">
            <div className="bg-turquoise/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-12 h-12 text-turquoise" />
            </div>
            <h4 className="text-3xl lg:text-4xl font-bold text-white mb-3">10.000+</h4>
            <p className="text-gray-400 text-lg">Vidas transformadas</p>
          </div>
          
          <div className="text-center transition-all duration-500 ease-in-out hover:scale-110">
            <div className="bg-turquoise/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-turquoise" />
            </div>
            <h4 className="text-3xl lg:text-4xl font-bold text-white mb-3">97%</h4>
            <p className="text-gray-400 text-lg">Taxa de satisfação</p>
          </div>
          
          <div className="text-center transition-all duration-500 ease-in-out hover:scale-110">
            <div className="bg-turquoise/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-12 h-12 text-turquoise" />
            </div>
            <h4 className="text-3xl lg:text-4xl font-bold text-white mb-3">100%</h4>
            <p className="text-gray-400 text-lg">Garantia de satisfação</p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight">
            Não deixe para amanhã a transformação que pode começar hoje
          </h3>
          <p className="text-xl lg:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto">
            Cada dia que você adia é um dia a menos para construir a vida dos seus sonhos.
          </p>
          
          <a href="#pricing" className="inline-block">
            <button 
              onClick={scrollToPricing}
              className="bg-gradient-to-r from-turquoise to-blue-500 text-black font-bold text-xl lg:text-2xl px-12 py-8 rounded-2xl transform hover:scale-105 transition-all duration-500 ease-in-out shadow-lg hover:shadow-2xl"
            >
              🚀 GARANTIR MINHA TRANSFORMAÇÃO AGORA
            </button>
          </a>
          
          <p className="text-base text-gray-500 mt-6">
            ⭐ Oferta por tempo limitado • 🔒 Compra 100% segura • 🛡️ Garantia no dia
          </p>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
