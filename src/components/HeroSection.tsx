import { Button } from "@/components/ui/button";
import { ChevronDown, CalendarDays } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  const scrollToPricing = () => {
    const section = document.getElementById("pricing");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-[100svh] flex items-end md:items-center justify-end md:justify-center px-4 sm:px-6 pb-24 pt-10 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />

      <div className="relative z-10 container max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-end">
          {/* Texto (sempre alinhado à esquerda) */}
          <div className="text-left max-w-xl w-full px-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight tracking-tight text-white break-words">
              Sua <span className="text-turquoise">Virada de Chave</span> começa em 2 dias
            </h1>

            <h2 className="text-sm sm:text-base md:text-xl font-semibold mb-4 sm:mb-5 text-gray-200">
              Domine suas Emoções, eleve sua Performance.
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed break-words">
              Uma imersão online e <strong>ao vivo</strong> com Rodrigo Damaceno, desenhada para
              <strong> reprogramar</strong> sua resposta ao estresse e à ansiedade.
            </p>

            <div className="flex flex-col items-stretch gap-3 sm:gap-4">
              <div className="flex items-center gap-2 bg-turquoise/10 border border-turquoise/30 rounded-lg p-3">
                <CalendarDays className="h-5 w-5 text-turquoise flex-shrink-0" />
                <p className="text-white font-semibold text-sm sm:text-base">
                  6 horas por dia, das 9h às 12h
                </p>
              </div>

              <Button
                variant="cta"
                size="lg"
                className="w-full text-base sm:text-lg px-4 sm:px-6 py-4 sm:py-5 h-auto whitespace-normal break-words leading-tight text-center"
                onClick={scrollToPricing}
              >
                QUERO GARANTIR MINHA VAGA AGORA
              </Button>
            </div>
          </div>

          {/* Coluna direita escondida no mobile */}
          <div className="hidden md:block" />
        </div>
      </div>

      {/* Indicador de scroll (texto + ícone) */}
      <button
        onClick={scrollToPricing}
        className="absolute bottom-6 left-4 sm:left-6 z-10 flex items-center gap-2 text-gray-300/90 hover:text-white transition"
        aria-label="Descer para preços"
      >
        <span className="text-xs sm:text-sm font-semibold">Descubra o caminho para a mudança</span>
        <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 animate-bounce text-turquoise" />
      </button>
    </section>
  );
};

export default HeroSection;
