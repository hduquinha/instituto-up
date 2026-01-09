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
              Viva o <span className="text-turquoise">UP Day Plus</span>
            </h1>

            <h2 className="text-sm sm:text-base md:text-xl font-semibold mb-4 sm:mb-5 text-gray-200">
              17 e 18 de Janeiro - Rua Abílio Soares, 245 – Bairro Paraíso - São Paulo-SP
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed break-words">
              Uma imersão presencial intensa de 2 dias para elevar sua comunicação, gestão das emoções e construir relacionamentos mais saudáveis. Com dinâmicas de alto impacto e exercícios vivenciais, você vai experimentar uma jornada de autoconhecimento e crescimento pessoal. Nossa equipe irá guiá-la em uma jornada de descoberta e desenvolvimento de habilidades práticas e aplicáveis.
            </p>

            <div className="flex flex-col items-stretch gap-3 sm:gap-4">
              <div className="flex items-center gap-2 bg-turquoise/10 border border-turquoise/30 rounded-lg p-3">
                <CalendarDays className="h-5 w-5 text-turquoise flex-shrink-0" />
                <p className="text-white font-semibold text-sm sm:text-base leading-snug">
                  17 e 18 de Janeiro - Rua Abílio Soares, 245 – Bairro Paraíso - São Paulo-SP
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

      {/* Indicador de scroll centralizado */}
      <button
        onClick={scrollToPricing}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-gray-300/90 hover:text-white transition text-center"
        aria-label="Descer para preços"
      >
        <span className="text-xs sm:text-sm font-semibold mb-1">
          Descubra o caminho para a mudança
        </span>
        <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 animate-bounce text-turquoise" />
      </button>
    </section>
  );
};

export default HeroSection;
