import { Button } from "@/components/ui/button";
import { ShieldCheck, Heart } from "lucide-react";

const FinalCtaSection = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-turquoise/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container max-w-6xl mx-auto text-center">
        <div className="mb-16">
          <div className="flex justify-center mb-8">
            <div className="bg-turquoise/20 p-8 rounded-full transition-all duration-500 ease-in-out hover:bg-turquoise/30">
              <Heart className="w-16 h-16 text-turquoise" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Sua <span className="text-turquoise">Transformação Presencial</span> Te Espera
          </h2>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
            Uma experiência única no Lito Palace Hotel. 
            Apenas 50 vagas para garantir exclusividade e resultados excepcionais.
          </p>
        </div>

        <div className="bg-gradient-to-r from-black/60 to-gray-900/60 rounded-3xl border border-turquoise/20 p-8 md:p-16 mb-16 transition-all duration-500 ease-in-out hover:scale-[1.02]">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 leading-tight">
            O que você vai ganhar não tem preço:
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left max-w-5xl mx-auto">
            <div className="bg-black/30 rounded-2xl p-8 transition-all duration-500 ease-in-out hover:scale-105">
              <h4 className="text-turquoise font-bold text-2xl lg:text-3xl mb-6">🏨 Experiência VIP</h4>
              <ul className="space-y-4 text-gray-300 text-lg lg:text-xl">
                <li>• Local premium no Lito Palace Hotel</li>
                <li>• Networking exclusivo presencial</li>
                <li>• Coffee breaks e almoços gourmet</li>
                <li>• Kit de boas-vindas exclusivo</li>
              </ul>
            </div>
            
            <div className="bg-black/30 rounded-2xl p-8 transition-all duration-500 ease-in-out hover:scale-105">
              <h4 className="text-turquoise font-bold text-2xl lg:text-3xl mb-6">🚀 Transformação Completa</h4>
              <ul className="space-y-4 text-gray-300 text-lg lg:text-xl">
                <li>• 2 dias de imersão intensiva</li>
                <li>• Contato direto com os mentores</li>
                <li>• Material físico + digital premium</li>
                <li>• Certificado presencial exclusivo</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            São apenas 50 vagas no Lito Palace Hotel. Não perca a oportunidade de se transformar em um ambiente exclusivo.
          </p>
          
          <button
            onClick={scrollToPricing}
            className="bg-gradient-to-r from-turquoise to-blue-500 text-black font-bold text-xl md:text-2xl lg:text-3xl px-16 py-8 rounded-2xl transform hover:scale-105 transition-all duration-500 ease-in-out shadow-lg hover:shadow-2xl mb-8"
          >
            � GARANTIR VAGA PRESENCIAL AGORA
          </button>
          
          <div className="flex justify-center items-center gap-4 text-gray-400 text-lg">
            <ShieldCheck className="w-6 h-6 text-green-400" />
            <span>7 dias de garantia incondicional + Local Premium</span>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <p className="text-gray-500 text-base lg:text-lg">
            © 2024 Instituto UP. Todos os direitos reservados. | 
            <span className="text-turquoise"> Transformando vidas desde 2020</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
