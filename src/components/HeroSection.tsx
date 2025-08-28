import { Button } from "@/components/ui/button";
import { ChevronDown, CheckCircle2, CalendarDays } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* Overlay em Gradiente (RESTAURADO PARA O ORIGINAL) */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/95 via-dark-bg/80 to-dark-bg/40"></div>
      
      {/* Conteúdo */}
      <div className="relative z-10 container max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Coluna da esquerda - Textos com alinhamento ajustado */}
          <div className="text-center md:text-left">
            <h1 
              className="text-4xl md:text-5xl xl:text-6xl font-extrabold mb-4 leading-tight text-white"
              data-aos="fade-up"
            >
              Sua <span className="text-turquoise">Virada de Chave</span> Começa em 2 Dias
            </h1>
            
            <h2 
              className="text-lg md:text-2xl font-semibold mb-6 text-gray-200"
              data-aos="fade-up" data-aos-delay="100"
            >
              Domine suas Emoções, Eleve sua Performance.
            </h2>
            
            <p 
              className="text-base md:text-xl text-gray-300 mb-8 leading-relaxed"
              data-aos="fade-up" data-aos-delay="200"
            >
              Uma imersão online e <strong>ao vivo</strong> com Rodrigo Damaceno, desenhada para <strong>reprogramar</strong> sua resposta ao estresse e à ansiedade.
            </p>
            
            <div className="flex flex-col items-center md:items-start gap-4">
              <div 
                className="inline-flex items-center gap-3 bg-turquoise/10 border border-turquoise/30 rounded-lg p-4 w-full justify-center md:w-auto"
                data-aos="fade-up" data-aos-delay="300"
              >
                <CalendarDays className="h-5 w-5 text-turquoise" />
                <p className="text-turquoise-light font-semibold text-base md:text-lg">
                  6 horas por dia, das 9h às 12h
                </p>
              </div>
              
              <div data-aos="fade-up" data-aos-delay="400" className="w-full">
                <Button 
                  variant="cta" 
                  size="lg" 
                  className="text-lg px-8 py-6 h-auto w-full md:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-turquoise/30"
                >
                  QUERO GARANTIR MINHA VAGA AGORA
                </Button>
              </div>
            </div>
          </div>
          
          {/* Coluna da direita */}
          <div 
            className="" 
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="bg-dark-section/80 backdrop-blur-lg rounded-lg p-6 border border-turquoise/30 shadow-2xl shadow-black/30">
              <h3 className="text-xl font-bold text-turquoise mb-4">
                Este treinamento é para você se...
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-turquoise mr-3 mt-1 flex-shrink-0" />
                  <span>Sente que a ansiedade e o estresse estão limitando seu verdadeiro potencial.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-turquoise mr-3 mt-1 flex-shrink-0" />
                  <span>Suas reações emocionais, e não você, estão no controle das suas decisões.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-turquoise mr-3 mt-1 flex-shrink-0" />
                  <span>A procrastinação e a falta de foco te impedem de alcançar os resultados que deseja.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Chamado para rolar a página */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gray-400 cursor-pointer">
        <span className="text-sm font-semibold">Descubra o caminho para a mudança</span>
        <ChevronDown className="h-6 w-6 animate-bounce text-turquoise" />
      </div>
    </section>
  );
};

export default HeroSection;