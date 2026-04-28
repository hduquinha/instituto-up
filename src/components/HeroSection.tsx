import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronDown, Gift, Users } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  const scrollToPricing = () => {
    const section = document.getElementById("pricing");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex min-h-[100svh] items-end justify-end overflow-hidden bg-cover bg-center bg-no-repeat px-4 pb-24 pt-10 sm:px-6 md:items-center md:justify-center"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />

      <div className="relative z-10 container mx-auto w-full max-w-6xl">
        <div className="grid items-end gap-10 md:grid-cols-2 md:gap-12">
          <div className="w-full max-w-xl px-1 text-left">
            <h1 className="mb-3 break-words text-3xl font-extrabold leading-tight tracking-tight text-white sm:mb-4 sm:text-4xl md:text-5xl">
              Viva o <span className="text-turquoise">UP Day Plus</span>
            </h1>

            <h2 className="mb-4 text-sm font-semibold text-gray-200 sm:mb-5 sm:text-base md:text-xl">
              15 e 16 de Agosto - São Paulo-SP
            </h2>

            <p className="mb-6 break-words text-sm leading-relaxed text-gray-300 sm:mb-8 sm:text-base md:text-lg">
              Uma imersão presencial intensa de 2 dias para elevar sua comunicação,
              gestão das emoções e construir relacionamentos mais saudáveis. Com
              dinâmicas de alto impacto e exercícios vivenciais, você vai
              experimentar uma jornada de autoconhecimento e crescimento pessoal.
            </p>

            <div className="mb-6 rounded-2xl border border-amber-300/30 bg-gradient-to-r from-amber-300/20 via-orange-400/10 to-transparent p-4 shadow-2xl shadow-amber-500/10 backdrop-blur-sm sm:p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-amber-300 p-2 text-black shadow-lg shadow-amber-300/30">
                  <Gift className="h-5 w-5" />
                </div>
                <div>
                  <p className="mb-1 text-[0.7rem] font-black uppercase tracking-[0.28em] text-amber-200">
                    Campanha 1º lote
                  </p>
                  <p className="text-base font-bold leading-tight text-white sm:text-lg md:text-xl">
                    Comprou 1 ingresso e ganha o direito de levar 1 acompanhante
                    gratuitamente.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-amber-50/90 sm:text-base">
                    Uma oferta pensada para quem quer viver o UP Day com alguém
                    importante e tornar a experiência ainda mais forte.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  <Users className="h-3.5 w-3.5 text-amber-200" />
                  Ideal para casais, amigos e parceiros
                </span>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-amber-100">
                  Válido para as vagas do 1º lote
                </span>
              </div>
            </div>

            <div className="flex flex-col items-stretch gap-3 sm:gap-4">
              <div className="flex items-center gap-2 rounded-lg border border-turquoise/30 bg-turquoise/10 p-3">
                <CalendarDays className="h-5 w-5 flex-shrink-0 text-turquoise" />
                <p className="text-sm font-semibold leading-snug text-white sm:text-base">
                  15 e 16 de Agosto - Rua Abílio Soares, 245 - Bairro Paraíso -
                  São Paulo-SP
                </p>
              </div>

              <Button
                variant="cta"
                size="lg"
                className="h-auto w-full break-words px-4 py-4 text-center text-base leading-tight whitespace-normal sm:px-6 sm:py-5 sm:text-lg"
                onClick={scrollToPricing}
              >
                GARANTIR MEU 1º LOTE
              </Button>
            </div>
          </div>

          <div className="hidden md:block" />
        </div>
      </div>

      <button
        onClick={scrollToPricing}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-center text-gray-300/90 transition hover:text-white"
        aria-label="Descer para preços"
      >
        <span className="mb-1 text-xs font-semibold sm:text-sm">
          Descubra o caminho para a mudança
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce text-turquoise sm:h-6 sm:w-6" />
      </button>
    </section>
  );
};

export default HeroSection;
