import { Button } from "@/components/ui/button";
import { ChevronDown, CalendarDays } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  const scrollToPricing = () => {
    const section = document.getElementById("pricing");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>

      <div className="relative z-10 container max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texto com padding e centralização no mobile */}
          <div className="text-center md:text-left max-w-lg mx-auto md:mx-0 px-2">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 leading-snug text-white">
              Sua <span className="text-turquoise">Virada de Chave</span> Começa
              em 2 Dias
            </h1>

            <h2 className="text-base sm:text-lg md:text-2xl font-semibold mb-6 text-gray-200">
              Domine suas Emoções, Eleve sua Performance.
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
              Uma imersão online e <strong>ao vivo</strong> com Rodrigo Damaceno,
              desenhada para <strong>reprogramar</strong> sua resposta ao estresse
              e à ansiedade.
            </p>

            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2 bg-turquoise/10 border border-turquoise/30 rounded-lg p-3 w-full md:w-auto">
                <CalendarDays className="h-5 w-5 text-turquoise" />
                <p className="text-white font-semibold text-sm sm:text-base">
                  6 horas por dia, das 9h às 12h
                </p>
              </div>

              <Button
                variant="cta"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto w-full md:w-auto"
                onClick={scrollToPricing}
              >
                QUERO GARANTIR MINHA VAGA AGORA
              </Button>
            </div>
          </div>

          {/* Coluna direita some no mobile */}
          <div className="hidden md:block">{/* espaço para imagem/vídeo */}</div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer animate-bounce">
        <ChevronDown
          className="w-8 h-8 text-white opacity-75"
          onClick={scrollToPricing}
        />
      </div>
    </section>
  );
};

export default HeroSection;
