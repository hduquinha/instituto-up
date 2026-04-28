import { Gift, Heart, ShieldCheck, Users } from "lucide-react";

const FinalCtaSection = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-20 sm:px-6">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-30">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-turquoise/10 blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl text-center">
        <div className="mb-16">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-turquoise/20 p-8 transition-all duration-500 ease-in-out hover:bg-turquoise/30">
              <Heart className="h-16 w-16 text-turquoise" />
            </div>
          </div>

          <div className="mx-auto mb-8 max-w-4xl rounded-3xl border border-amber-300/20 bg-gradient-to-r from-amber-300/15 via-orange-400/10 to-transparent p-5 text-left shadow-2xl shadow-amber-500/10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 text-xs font-black uppercase tracking-[0.28em] text-amber-200">
                  <Gift className="h-4 w-4" />
                  Oferta de divulgação
                </div>
                <p className="text-xl font-bold leading-tight text-white md:text-2xl">
                  No 1º lote, 1 ingresso comprado garante o direito de levar 1
                  acompanhante gratuitamente.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-amber-50">
                <Users className="h-4 w-4 text-amber-200" />
                Uma campanha forte para vender em dupla
              </div>
            </div>
          </div>

          <h2 className="mb-8 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-7xl">
            Sua <span className="text-turquoise">Transformação Presencial</span>{" "}
            Te Espera
          </h2>

          <p className="mx-auto max-w-5xl text-xl leading-relaxed text-gray-300 md:text-2xl lg:text-3xl">
            Uma experiência única em São Paulo-SP (Rua Abílio Soares, 245 -
            Bairro Paraíso). 15 e 16 de Agosto - 2 dias intensivos que vão
            transformar sua vida.
          </p>
        </div>

        <div className="mb-16 rounded-3xl border border-turquoise/20 bg-gradient-to-r from-black/60 to-gray-900/60 p-8 transition-all duration-500 ease-in-out hover:scale-[1.02] md:p-16">
          <h3 className="mb-12 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            O que você vai ganhar não tem preço:
          </h3>

          <div className="mx-auto max-w-4xl rounded-2xl bg-black/30 p-8 transition-all duration-500 ease-in-out hover:scale-105 md:p-12">
            <h4 className="mb-8 text-2xl font-bold text-turquoise lg:text-3xl">
              Experiência Completa
            </h4>
            <ul className="grid gap-x-8 gap-y-6 text-left text-lg text-gray-300 md:grid-cols-2 lg:text-xl">
              <li className="flex items-center gap-3">
                <span className="text-2xl text-turquoise">•</span>
                Local: Rua Abílio Soares, 245 - Bairro Paraíso - São Paulo-SP
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl text-turquoise">•</span>
                Data: 15 e 16 de Agosto de 2026
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl text-turquoise">•</span>
                2 dias de imersão intensiva
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl text-turquoise">•</span>
                Material físico
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl text-turquoise">•</span>
                Certificado presencial
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <p className="mx-auto mb-12 max-w-4xl text-xl text-gray-300 lg:text-2xl">
            15 e 16 de Agosto em São Paulo-SP (Rua Abílio Soares, 245 - Bairro
            Paraíso). Uma experiência transformadora intensiva de 2 dias.
          </p>

          <button
            onClick={scrollToPricing}
            className="mb-8 rounded-2xl bg-gradient-to-r from-turquoise to-blue-500 px-16 py-8 text-xl font-bold text-black shadow-lg transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl md:text-2xl lg:text-3xl"
          >
            QUERO APROVEITAR O 1º LOTE
          </button>

          <div className="flex items-center justify-center gap-4 text-lg text-gray-400">
            <ShieldCheck className="h-6 w-6 text-green-400" />
            <span>Garantia no dia + Local</span>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <p className="text-base text-gray-500 lg:text-lg">
            © 2025 Instituto UP. Todos os direitos reservados. |
            <span className="text-turquoise"> Transformando vidas desde 2014</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
