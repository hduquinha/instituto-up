import { Brain, Users, Target, Lightbulb } from "lucide-react";

const TrainingContentSection = () => {
  const pillars = [
    {
      icon: Brain,
      title: "Pilar 1: Autoconhecimento e Diagnóstico Emocional",
      description: "Identificação de padrões comportamentais automáticos e mapeamento das emoções primárias.",
      details: [
        "Mapeamento de emoções: medo, raiva e tristeza",
        "Reconhecimento de manifestações físicas das emoções",
        "Investigação da origem de crenças e valores pessoais",
        "Conexão com eventos marcantes e experiências formativas",
        "Compreensão da arquitetura da percepção de mundo atual"
      ]
    },
    {
      icon: Lightbulb,
      title: "Pilar 2: Reprogramação de Crenças Limitantes",
      description: "Técnicas para identificação e transformação de pensamentos autossabotadores.",
      details: [
        "Identificação consciente de crenças restritivas",
        "Processo de ressignificação de memórias e eventos",
        "Transformação de fontes de dor em aprendizado",
        "Substituição de diálogos internos negativos",
        "Implementação de programações mentais fortalecedoras"
      ]
    },
    {
      icon: Target,
      title: "Pilar 3: Gestão e Domínio Emocional",
      description: "Ferramentas práticas para gerenciamento de estados emocionais em tempo real.",
      details: [
        "Técnicas de controle de impulsos",
        "Modulação da ansiedade e manejo do estresse",
        "Análise e escolha de resposta consciente vs reação automática",
        "Uso das emoções como sinalizadores para tomada de decisão",
        "Desenvolvimento de inteligência emocional aplicada"
      ]
    },
    {
      icon: Users,
      title: "Pilar 4: Habilidades Sociais e Liderança Comunicativa",
      description: "Desenvolvimento de competências avançadas de comunicação, liderança e influência.",
      details: [
        "Escuta ativa e percepção do estado emocional de outros",
        "Comunicação assertiva e não-violenta",
        "Construção de conexões genuínas (rapport)",
        "Técnicas de liderança e influência positiva",
        "Mediação de conflitos e gestão de equipes",
        "Melhoria da dinâmica em relacionamentos pessoais e profissionais"
      ]
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-turquoise/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="relative z-10 container max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wider mb-6">
            O que você vai <span className="text-turquoise">Dominar</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            14 horas intensivas divididas em 4 pilares fundamentais para sua transformação em comunicação e liderança
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {pillars.map((pillar, index) => (
            <div 
              key={index}
              className="bg-black/50 rounded-2xl p-8 border border-gray-800 hover:border-turquoise/30 transition-all duration-500 hover:scale-[1.02]"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-turquoise/20 rounded-full p-3 flex-shrink-0">
                  <pillar.icon className="h-8 w-8 text-turquoise" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {pillar.description}
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3">
                {pillar.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start gap-3 text-gray-300">
                    <span className="w-2 h-2 bg-turquoise rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-turquoise/10 to-blue-500/10 rounded-2xl p-8 border border-turquoise/20 text-center" data-aos="fade-up">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            🎯 Foco Especial em Comunicação e Liderança
          </h3>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-6">
            Este treinamento foi especialmente desenvolvido para profissionais que desejam se destacar através de 
            <strong className="text-turquoise"> comunicação assertiva</strong> e 
            <strong className="text-turquoise"> liderança influente</strong>. Você sairá com ferramentas práticas 
            para se tornar um comunicador excepcional e um líder nato.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-black/30 rounded-xl p-6">
              <h4 className="text-turquoise font-bold text-lg mb-2">Comunicação Transformadora</h4>
              <p className="text-gray-400 text-sm">Domine técnicas avançadas de persuasão, escuta ativa e comunicação não-violenta</p>
            </div>
            <div className="bg-black/30 rounded-xl p-6">
              <h4 className="text-turquoise font-bold text-lg mb-2">Liderança Autêntica</h4>
              <p className="text-gray-400 text-sm">Desenvolva presença de liderança, gestão de conflitos e influência positiva</p>
            </div>
            <div className="bg-black/30 rounded-xl p-6">
              <h4 className="text-turquoise font-bold text-lg mb-2">Inteligência Emocional</h4>
              <p className="text-gray-400 text-sm">Aprenda a ler pessoas, gerenciar emoções e criar conexões genuínas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingContentSection;