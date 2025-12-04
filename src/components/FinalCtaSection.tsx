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
            Uma experiência única em São Paulo-SP. 
            17 e 18 de Janeiro - 2 dias intensivos que vão transformar sua vida.
          </p>
        </div>

        <div className="bg-gradient-to-r from-black/60 to-gray-900/60 rounded-3xl border border-turquoise/20 p-8 md:p-16 mb-16 transition-all duration-500 ease-in-out hover:scale-[1.02]">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 leading-tight">
            O que você vai ganhar não tem preço:
          </h3>
          
          <div className="bg-black/30 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto transition-all duration-500 ease-in-out hover:scale-105">
            <h4 className="text-turquoise font-bold text-2xl lg:text-3xl mb-8">🚀 Experiência Completa</h4>
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-6 text-left text-gray-300 text-lg lg:text-xl">
              <li className="flex items-center gap-3">
                <span className="text-turquoise text-2xl">•</span>
                Local: São Paulo-SP
              </li>
              <li className="flex items-center gap-3">
                <span className="text-turquoise text-2xl">•</span>
                Data: 17 e 18 de Janeiro de 2026
              </li>
              <li className="flex items-center gap-3">
                <span className="text-turquoise text-2xl">•</span>
                2 dias de imersão intensiva
              </li>
              <li className="flex items-center gap-3">
                <span className="text-turquoise text-2xl">•</span>
                Material físico
              </li>
              <li className="flex items-center gap-3">
                <span className="text-turquoise text-2xl">•</span>
                Certificado presencial
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            17 e 18 de Janeiro em São Paulo-SP. Uma experiência transformadora intensiva de 2 dias.
          </p>
          
          <button
            onClick={scrollToPricing}
            className="bg-gradient-to-r from-turquoise to-blue-500 text-black font-bold text-xl md:text-2xl lg:text-3xl px-16 py-8 rounded-2xl transform hover:scale-105 transition-all duration-500 ease-in-out shadow-lg hover:shadow-2xl mb-8"
          >
            � GARANTIR VAGA PRESENCIAL AGORA
          </button>
          
          <div className="flex justify-center items-center gap-4 text-gray-400 text-lg">
            <ShieldCheck className="w-6 h-6 text-green-400" />
            <span>Garantia no dia + Local</span>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <p className="text-gray-500 text-base lg:text-lg">
            © 2025 Instituto UP. Todos os direitos reservados. | 
            <span className="text-turquoise"> Transformando vidas desde 2014</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
