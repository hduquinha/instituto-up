import { Button } from "@/components/ui/button";
import { CalendarDays, Gift, MapPin, Sparkles } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import InscriptionForm from "@/components/InscriptionForm";

export const scrollToInscricao = () => {
  const section = document.getElementById("inscricao");
  if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
};

const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat px-4 py-10 sm:px-6 md:py-16"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60" />

      <div className="relative z-10 container mx-auto w-full max-w-6xl">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr,minmax(0,480px)] lg:gap-12">
          <div className="w-full max-w-xl text-left lg:pt-6">
            <h1 className="mb-3 break-words text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Viva o <span className="text-turquoise">UP Day Plus</span>
            </h1>

            <h2 className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold text-gray-200 sm:text-base md:text-lg">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-turquoise" />
                15 e 16 de Agosto
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-turquoise" />
                São Paulo-SP
              </span>
            </h2>

            <p className="mb-6 text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg">
              Imersão presencial de 2 dias para elevar sua comunicação, dominar suas emoções e
              destravar sua liderança.
            </p>

            <ul className="mb-6 space-y-3">
              <li className="flex items-center gap-3 text-sm font-semibold text-white sm:text-base">
                <span className="rounded-full bg-turquoise/20 p-1.5">
                  <Sparkles className="h-4 w-4 text-turquoise" />
                </span>
                2 dias intensivos com dinâmicas de alto impacto
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold text-white sm:text-base">
                <span className="rounded-full bg-turquoise/20 p-1.5">
                  <Sparkles className="h-4 w-4 text-turquoise" />
                </span>
                Comunicação, gestão emocional e liderança na prática
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold text-white sm:text-base">
                <span className="rounded-full bg-turquoise/20 p-1.5">
                  <Sparkles className="h-4 w-4 text-turquoise" />
                </span>
                Garantia de satisfação no dia do evento
              </li>
            </ul>

            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-300/30 bg-gradient-to-r from-amber-300/20 to-transparent p-4">
              <div className="rounded-full bg-amber-300 p-2 text-black">
                <Gift className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-200">
                  Campanha 1º lote
                </p>
                <p className="text-sm font-bold leading-snug text-white sm:text-base">
                  Comprou 1 ingresso, leva 1 acompanhante gratuitamente.
                </p>
              </div>
            </div>

            <Button
              variant="cta"
              size="lg"
              onClick={scrollToInscricao}
              className="h-auto w-full whitespace-normal px-4 py-4 text-base leading-tight text-black sm:text-lg lg:hidden"
            >
              QUERO ME INSCREVER
            </Button>
          </div>

          <InscriptionForm />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
