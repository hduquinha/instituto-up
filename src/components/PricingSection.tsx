import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { scrollToInscricao } from "@/components/HeroSection";

const PricingSection = () => {
  const features = [
    "2 dias de treinamento presencial intensivo",
    "15 e 16 de Agosto de 2026 • Rua Abílio Soares, 245 - Paraíso - São Paulo-SP",
    "Material físico + crachá personalizado",
    "Certificado de participação presencial",
    "Suporte durante todo o evento",
  ];

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-black px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
        <div className="h-[900px] w-[900px] rounded-full bg-turquoise/10 blur-[140px]" />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:mb-12">
          <h2 className="text-3xl font-extrabold uppercase tracking-wider text-white md:text-5xl">
            Investimento
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Vagas limitadas para garantir a qualidade da experiência.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative mx-auto flex w-full max-w-lg flex-col rounded-2xl border border-turquoise bg-[#111] shadow-2xl shadow-turquoise/20">
            <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-turquoise px-4 py-2 text-sm font-bold uppercase tracking-wider text-black">
              1º Lote
            </div>

            <div className="flex-grow p-8 pt-12">
              <div className="mb-6 text-center">
                <span className="text-lg text-gray-500 line-through">R$ 4.997</span>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-extrabold text-white lg:text-6xl">R$ 3.997</span>
                  <span className="text-lg text-gray-400">à vista</span>
                </div>
                <div className="mt-2 text-2xl font-bold text-turquoise sm:text-3xl">
                  ou 10x de R$ 399,70
                </div>
                <p className="mt-3 animate-pulse text-sm font-bold text-red-400">
                  Condição especial do 1º lote
                </p>
              </div>

              <ul className="space-y-4 text-gray-300">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-turquoise" />
                    <span className="text-sm leading-relaxed sm:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 pt-2">
              <Button
                onClick={scrollToInscricao}
                variant="cta"
                className="h-auto w-full whitespace-normal py-5 text-center text-lg leading-tight text-black"
              >
                <Star className="mr-2 h-5 w-5" />
                Garantir meu ingresso
              </Button>
              <p className="mt-4 text-center text-sm text-gray-500">
                Preenchimento rápido • Seus dados ficam somente com nossa equipe
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
