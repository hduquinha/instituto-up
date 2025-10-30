import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  const handleBuyClick = (plan: any) => {
    const basePath = `/landing-emocional.html`;
    const targetUrl = `${basePath}?plan=${encodeURIComponent(plan.name || "" )}`;
    window.location.href = targetUrl;
  };
  const plans = [
    {
      name: "Presencial",
      price: "2997",
      originalPrice: "4997",
      installments: "10x R$ 299,70",
      description: "Treinamento presencial intensivo em comunicação e liderança em São Paulo-SP.",
      features: [
        "Treinamento presencial intensivo - 2 dias",
        "Data: 17 e 18 de Janeiro de 2026",
        "Local: São Paulo-SP", 
        "Material físico premium entregue no local",
        "Crachá personalizado de participante",
        "Certificado de participação presencial",
        "Firewalking - Experiência transformadora",
        "Suporte durante o evento"
      ],
      cta: "Garantir Vaga Presencial",
      isRecommended: true,
      discount: "1º LOTE",
      urgency: "78% DAS VAGAS JÁ PREENCHIDAS!"
    },
  ];

  return (
    <section
      id="pricing"
      className="relative bg-black py-16 sm:py-20 px-4 sm:px-6 overflow-hidden"
    >
      <div className="absolute inset-0 flex justify-center items-center opacity-30 pointer-events-none">
        <div className="w-[900px] h-[900px] bg-turquoise/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 container max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wider">
            Treinamento Presencial <span className="text-turquoise">Exclusivo</span>
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-gray-400">
            Uma experiência única em São Paulo. Vagas limitadas para garantir qualidade e exclusividade.
          </p>
        </div>

        {/* Card único centralizado */}
        <div className="flex justify-center">
          <div className="max-w-lg w-full">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-[#111] rounded-2xl border flex flex-col transition-all duration-500 ease-in-out h-full w-full max-w-lg mx-auto transform hover:scale-105 ${
                  plan.isRecommended
                    ? "border-turquoise shadow-2xl shadow-turquoise/20 lg:scale-105"
                    : "border-gray-800"
                }`}
              >
                {plan.isRecommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-turquoise text-black font-bold text-sm px-4 py-2 rounded-full uppercase tracking-wider z-10">
                    🔥 Mais Popular
                  </div>
                )}

                <div className={`flex-grow p-8 ${plan.isRecommended ? "pt-12" : ""}`}>
                  <h3 className={`text-2xl lg:text-3xl font-bold text-center mb-6 ${plan.isRecommended ? "text-turquoise" : "text-white"}`}>
                    {plan.name}
                  </h3>

                  <div className="text-center my-8">
                    {/* Barra de vagas */}
                    <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                      <div className="font-bold text-red-400 text-sm mb-2">⚠️ ATENÇÃO: VAGAS LIMITADAS</div>
                      <div className="bg-gray-800 h-6 rounded-full overflow-hidden mb-2">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 h-full flex items-center justify-center text-white font-bold text-xs" style={{width: '78%'}}>
                          78% PREENCHIDO
                        </div>
                      </div>
                      <div className="text-gray-400 text-xs font-semibold">Apenas 22% das vagas disponíveis</div>
                    </div>

                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-xl text-gray-500 line-through">R$ {plan.originalPrice}</span>
                    </div>
                    <div className="flex items-baseline justify-center gap-2 mb-3">
                      <span className="text-5xl lg:text-6xl font-extrabold text-white">R$ {plan.price}</span>
                      <span className="text-gray-400 text-lg">à vista</span>
                    </div>
                    {plan.installments && (
                      <div className="text-turquoise text-3xl lg:text-4xl font-bold mb-3">
                        {plan.installments}
                      </div>
                    )}
                    <div className="flex justify-center gap-3 mb-2">
                      <span className="bg-turquoise text-black text-sm font-bold px-3 py-1 rounded-full">
                        {plan.discount}
                      </span>
                      <span className="text-red-400 text-sm font-bold animate-pulse">{plan.urgency}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-center text-base lg:text-lg min-h-[4rem] mb-8 leading-relaxed">
                    {plan.description}
                  </p>

                  <hr className="border-gray-700 my-8" />
                  <ul className="space-y-5 text-gray-300">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-4">
                        <Check
                          className={`w-6 h-6 mt-1 flex-shrink-0 ${
                            plan.isRecommended ? "text-turquoise" : "text-gray-500"
                          }`}
                        />
                        <span className="text-base lg:text-lg leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto p-8 pt-0">
                  <Button
                    onClick={() => handleBuyClick(plan)}
                    variant={plan.isRecommended ? "cta" : "secondary"}
                    className="w-full text-lg lg:text-xl py-6 whitespace-normal break-words leading-tight text-center transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                  >
                    {plan.isRecommended && <Star className="w-6 h-6 mr-3" />}
                    {plan.cta}
                  </Button>
                  
                  <p className="text-center text-sm text-gray-500 mt-4">
                    � Preenchimento rápido • 🔒 Seus dados ficam somente com nossa equipe
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
