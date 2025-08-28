import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button"; // Importe seu componente de botão

const PricingSection = () => {
  const plans = [
    {
      name: "Acesso Essencial",
      price: "297",
      description: "Para quem quer dar o primeiro passo e ter acesso ao vivo à transformação.",
      features: [
        "Acesso aos 2 dias de treinamento ao vivo",
        "Material de apoio em PDF",
        "Acesso à comunidade de alunos",
      ],
      cta: "Começar Agora",
      isRecommended: false,
    },
    {
      name: "Plano UP",
      price: "497",
      description: "A experiência completa para absorver, rever e aplicar todo o conhecimento.",
      features: [
        "Tudo do plano Essencial, e mais:",
        "Acesso à gravação por 1 ano",
        "Sessão Bônus de Q&A em grupo",
        "Módulo extra: 'Produtividade Acelerada'",
      ],
      cta: "Garantir Minha Vaga",
      isRecommended: true,
    },
    {
      name: "Experiência Premium",
      price: "997",
      description: "Para quem busca maestria e acompanhamento individualizado.",
      features: [
        "Tudo do plano UP, e mais:",
        "Acesso VITALÍCIO às gravações",
        "1 Sessão de mentoria individual",
        "Acesso ao grupo Mastermind",
      ],
      cta: "Aplicar para Premium",
      isRecommended: false,
    },
  ];

  return (
    <section className="relative bg-black py-20 px-4 sm:px-6 overflow-hidden">
      {/* Efeito de iluminação sutil */}
      <div className="absolute inset-0 flex justify-center items-center opacity-30">
        <div className="w-[1000px] h-[1000px] bg-turquoise/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 container max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wider">
            Escolha seu Nível de <span className="text-turquoise">Comprometimento</span>
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-gray-400">
            Cada plano é um passo em direção à sua melhor versão. Encontre a experiência ideal para o seu momento.
          </p>
        </div>

        {/* Container dos cards com alinhamento no final para o efeito "escada" */}
        <div className="grid lg:grid-cols-3 gap-8 items-end">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-[#111] rounded-xl border p-8 flex flex-col transition-transform duration-300 ${
                plan.isRecommended
                  ? "border-turquoise shadow-2xl shadow-turquoise/20 lg:scale-110 lg:z-10" // Destaque maior
                  : "border-gray-800 lg:hover:scale-105"
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {plan.isRecommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-turquoise text-black font-bold text-sm px-4 py-2 rounded-full uppercase tracking-wider">
                  Mais Popular
                </div>
              )}

              <div className="flex-grow">
                <h3 className={`text-2xl font-bold text-center ${plan.isRecommended ? "text-turquoise" : "text-white"}`}>
                  {plan.name}
                </h3>
                
                <div className="text-center my-6">
                  <span className="text-5xl font-extrabold text-white">R$ {plan.price}</span>
                  <span className="text-gray-400"> / à vista</span>
                </div>

                <p className="text-gray-400 text-center text-sm h-12 mb-6">{plan.description}</p>
                
                <hr className="border-gray-700 my-6" />

                <ul className="space-y-4 text-gray-300">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-1 flex-shrink-0 ${plan.isRecommended ? "text-turquoise" : "text-gray-500"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <Button
                  variant={plan.isRecommended ? "cta" : "secondary"}
                  className="w-full text-lg py-6"
                >
                  {plan.isRecommended && <Star className="w-5 h-5 mr-2" />}
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;