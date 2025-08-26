import { CheckCircle } from "lucide-react";

const PricingSection = () => {
  // Dados dos planos, agora sem a propriedade "price"
  const plans = [
    {
      name: "Essencial",
      description: "O acesso fundamental para iniciar sua transformação.",
      features: [
        "Acesso aos 2 dias de treinamento ao vivo",
        "Material de apoio em PDF",
        "Acesso à comunidade exclusiva de alunos",
        "Certificado de participação",
      ],
      isRecommended: false,
    },
    {
      name: "UP",
      description: "A experiência completa para aprofundar e garantir seus resultados.",
      features: [
        "Tudo do plano Essencial, e mais:",
        "Acesso à gravação do treinamento por 1 ano",
        "Sessão Bônus de Q&A em grupo com Rodrigo Damaceno",
        "Módulo extra: 'Produtividade Acelerada'",
      ],
      isRecommended: true,
    },
    {
      name: "Premium",
      description: "O acompanhamento VIP para uma transformação acelerada.",
      features: [
        "Tudo do plano UP, e mais:",
        "Acesso VITALÍCIO às gravações",
        "1 Sessão de mentoria individual com Rodrigo Damaceno",
        "Acesso ao grupo Mastermind Premium",
      ],
      isRecommended: false,
    },
  ];

  return (
    <section className="relative bg-black py-20 px-4 sm:px-6">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wider">
            UMA EXPERIÊNCIA PARA{" "}
            <span className="text-turquoise">CADA OBJETIVO</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-400">
            Conheça os diferentes níveis de acesso e benefícios do treinamento. Cada plano foi desenhado para um estágio da sua jornada.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-[#111] rounded-xl border ${
                plan.isRecommended ? "border-turquoise shadow-2xl shadow-turquoise/20" : "border-gray-800"
              } p-8 flex flex-col`} // 'flex' e 'flex-col' garantem o alinhamento
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {plan.isRecommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-turquoise text-black font-bold text-sm px-4 py-1 rounded-full uppercase tracking-wider">
                  Mais Popular
                </div>
              )}

              {/* A div flex-grow faz essa parte se expandir, empurrando o conteúdo para baixo */}
              <div className="flex-grow"> 
                <h3 className={`text-3xl font-bold uppercase text-center ${plan.isRecommended ? "text-turquoise" : "text-white"}`}>
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-center text-sm mt-2 mb-8 h-10">{plan.description}</p>

                <ul className="space-y-4 text-gray-300">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 mt-1 flex-shrink-0 ${plan.isRecommended ? "text-turquoise" : "text-gray-500"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;