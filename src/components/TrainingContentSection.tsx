import { Brain, Users, Target, Lightbulb } from "lucide-react";

const TrainingContentSection = () => {
  const pillars = [
    {
      icon: Brain,
      title: "Autoconhecimento Emocional",
      subtitle: "Mapeie suas emoções e comportamentos automáticos",
      highlights: [
        "Identificação de padrões que sabotam seus resultados",
        "Mapeamento das emoções primárias e seus gatilhos",
        "Descoberta da origem de crenças limitantes pessoais"
      ]
    },
    {
      icon: Lightbulb,
      title: "Reprogramação Mental",
      subtitle: "Transforme crenças limitantes em crenças de sucesso",
      highlights: [
        "Técnicas de ressignificação de memórias traumáticas",
        "Eliminação de diálogos internos negativos e autossabotagem",
        "Instalação de programações mentais de alta performance"
      ]
    },
    {
      icon: Target,
      title: "Domínio Emocional",
      subtitle: "Controle total sobre seus estados emocionais",
      highlights: [
        "Técnicas avançadas de controle de impulsos e ansiedade",
        "Transformação de reações automáticas em respostas conscientes",
        "Uso estratégico das emoções para tomada de decisão"
      ]
    },
    {
      icon: Users,
      title: "Liderança e Comunicação",
      subtitle: "Desenvolva presença magnética e influência natural",
      highlights: [
        "Comunicação assertiva e técnicas de persuasão ética",
        "Construção de rapport instantâneo e conexões genuínas",
        "Liderança natural e gestão eficaz de conflitos"
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
            Metodologia completa para transformar sua comunicação, liderança e inteligência emocional em 2 dias intensivos
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
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
                  <p className="text-turquoise text-sm font-semibold">
                    {pillar.subtitle}
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3">
                {pillar.highlights.map((highlight, highlightIndex) => (
                  <li key={highlightIndex} className="flex items-start gap-3 text-gray-300">
                    <span className="w-2 h-2 bg-turquoise rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-turquoise/10 to-blue-500/10 rounded-2xl p-8 border border-turquoise/20 text-center" data-aos="fade-up">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            🎯 Metodologia Comprovada + Experiência Única
          </h3>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-6">
            Uma jornada completa que vai <strong className="text-turquoise">reprogramar sua mente</strong> e 
            <strong className="text-turquoise"> elevar sua confiança</strong> a níveis que você nunca imaginou.
          </p>
          
          <div className="flex justify-center mt-8">
            <div className="bg-black/30 rounded-xl p-6 max-w-md w-full">
              <h4 className="text-turquoise font-bold text-lg mb-2">Parte Teórica + Prática</h4>
              <p className="text-gray-400 text-sm">Metodologia estruturada com exercícios práticos e aplicação imediata</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingContentSection;