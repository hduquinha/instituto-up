import { Button } from "@/components/ui/button";
import { Check, Gift, Star, Users } from "lucide-react";

const PricingSection = () => {
  const handleBuyClick = (plan: { name?: string }) => {
    const basePath = "/landing-emocional.html";
    const targetUrl = `${basePath}?plan=${encodeURIComponent(plan.name || "")}`;
    window.location.href = targetUrl;
  };

  const plans = [
    {
      name: "Presencial",
      price: "2997",
      originalPrice: "4997",
      installments: "10x R$ 299,70",
      description:
        "Treinamento presencial intensivo em comunicação e liderança em São Paulo-SP (Rua Abílio Soares, 245 - Bairro Paraíso).",
      features: [
        "Treinamento presencial intensivo - 2 dias",
        "Data: 15 e 16 de Agosto de 2026",
        "Local: Rua Abílio Soares, 245 - Bairro Paraíso - São Paulo-SP",
        "No 1º lote, 1 ingresso garante o direito de levar 1 acompanhante gratuitamente",
        "Material físico entregue no local",
        "Crachá personalizado de participante",
        "Certificado de participação presencial",
        "Suporte durante o evento",
      ],
      cta: "Garantir ingresso + acompanhante",
      isRecommended: true,
      discount: "1º LOTE",
      urgency: "83% DAS VAGAS JÁ PREENCHIDAS!",
      companionOffer: "Leve 1 acompanhante grátis",
    },
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
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-3xl font-extrabold uppercase tracking-wider text-white md:text-5xl">
            Treinamento Presencial
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-gray-400">
            Uma experiência única em São Paulo (Rua Abílio Soares, 245 - Bairro
            Paraíso). Vagas limitadas para garantir qualidade.
          </p>
          <div className="mx-auto mt-6 flex max-w-4xl items-center justify-center gap-3 rounded-2xl border border-amber-300/20 bg-gradient-to-r from-amber-300/10 via-orange-400/10 to-transparent px-5 py-4 text-left shadow-lg shadow-amber-500/5">
            <div className="rounded-full bg-amber-300/90 p-2 text-black">
              <Gift className="h-5 w-5" />
            </div>
            <p className="text-sm font-semibold leading-relaxed text-amber-50 sm:text-base">
              <span className="text-white">Oferta de lançamento:</span> no{" "}
              <span className="text-amber-200">1º lote</span>, ao adquirir seu
              ingresso você garante o direito de levar{" "}
              <span className="text-white">1 acompanhante gratuitamente</span>.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative mx-auto flex h-full w-full max-w-lg transform flex-col rounded-2xl border bg-[#111] transition-all duration-500 ease-in-out hover:scale-105 ${
                  plan.isRecommended
                    ? "border-turquoise shadow-2xl shadow-turquoise/20 lg:scale-105"
                    : "border-gray-800"
                }`}
              >
                {plan.isRecommended && (
                  <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-turquoise px-4 py-2 text-sm font-bold uppercase tracking-wider text-black">
                    Mais Popular
                  </div>
                )}

                <div className={`flex-grow p-8 ${plan.isRecommended ? "pt-12" : ""}`}>
                  <h3
                    className={`mb-6 text-center text-2xl font-bold lg:text-3xl ${
                      plan.isRecommended ? "text-turquoise" : "text-white"
                    }`}
                  >
                    {plan.name}
                  </h3>

                  <div className="my-8 text-center">
                    <div className="mb-6 rounded-2xl border border-amber-300/25 bg-gradient-to-r from-amber-300/15 via-orange-400/10 to-transparent p-4 text-left shadow-lg shadow-amber-500/10">
                      <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-amber-200">
                        <Gift className="h-4 w-4" />
                        Benefício especial do 1º lote
                      </div>
                      <p className="text-lg font-bold leading-tight text-white">
                        {plan.companionOffer}
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-sm text-amber-100/90">
                        <Users className="h-4 w-4 text-amber-200" />
                        Uma condição pensada para quem quer viver a imersão
                        acompanhado.
                      </p>
                    </div>

                    <div className="mb-6 rounded-xl border border-red-500/20 bg-gradient-to-br from-red-900/10 to-red-800/10 p-4">
                      <div className="mb-2 flex items-center justify-center gap-2 text-xs font-bold text-red-400">
                        <span className="text-sm">⚠️</span> ATENÇÃO: VAGAS LIMITADAS
                      </div>
                      <div className="mb-2 h-7 overflow-hidden rounded-full border border-gray-700/50 bg-gray-800/50">
                        <div
                          className="flex h-full items-center justify-center bg-gradient-to-r from-red-500 to-red-600 text-xs font-bold text-white shadow-lg"
                          style={{ width: "83%" }}
                        >
                          83% PREENCHIDO
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        Restam poucas vagas disponíveis
                      </div>
                    </div>

                    <div className="mb-2 flex items-center justify-center gap-3">
                      <span className="text-xl text-gray-500 line-through">
                        R$ {plan.originalPrice}
                      </span>
                    </div>
                    <div className="mb-3 flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-extrabold text-white lg:text-6xl">
                        R$ {plan.price}
                      </span>
                      <span className="text-lg text-gray-400">à vista</span>
                    </div>
                    {plan.installments && (
                      <div
                        className="mb-3 font-bold text-turquoise"
                        style={{ fontSize: "2.5rem", lineHeight: "1.2" }}
                      >
                        {plan.installments}
                      </div>
                    )}
                    <div className="mb-2 flex justify-center gap-3">
                      <span className="rounded-full bg-turquoise px-3 py-1 text-sm font-bold text-black">
                        {plan.discount}
                      </span>
                      <span className="animate-pulse text-sm font-bold text-red-400">
                        {plan.urgency}
                      </span>
                    </div>
                  </div>

                  <p className="mb-8 min-h-[4rem] text-center text-base leading-relaxed text-gray-400 lg:text-lg">
                    {plan.description}
                  </p>

                  <div className="mb-8 rounded-2xl border border-turquoise/20 bg-turquoise/10 p-5 text-left">
                    <p className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-turquoise">
                      Ideia de divulgação
                    </p>
                    <p className="text-base font-semibold leading-relaxed text-white">
                      "Compre seu ingresso do UP Day no 1º lote e leve um
                      acompanhante grátis para viver essa experiência com você."
                    </p>
                  </div>

                  <hr className="my-8 border-gray-700" />
                  <ul className="space-y-5 text-gray-300">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-4">
                        <Check
                          className={`mt-1 h-6 w-6 flex-shrink-0 ${
                            plan.isRecommended ? "text-turquoise" : "text-gray-500"
                          }`}
                        />
                        <span className="text-base leading-relaxed lg:text-lg">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto p-8 pt-0">
                  <Button
                    onClick={() => handleBuyClick(plan)}
                    variant={plan.isRecommended ? "cta" : "secondary"}
                    className="h-auto w-full break-words py-6 text-center text-lg leading-tight whitespace-normal transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl lg:text-xl"
                  >
                    {plan.isRecommended && <Star className="mr-3 h-6 w-6" />}
                    {plan.cta}
                  </Button>

                  <p className="mt-4 text-center text-sm text-gray-500">
                    1º lote ativo • Preenchimento rápido • Seus dados ficam somente
                    com nossa equipe
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
