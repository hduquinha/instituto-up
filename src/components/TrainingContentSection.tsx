import { Brain, Users, Target, Lightbulb } from "lucide-react";

const TrainingContentSection = () => {
  const pillars = [
    {
      icon: Brain,
      title: "Pilar 1: Autoconhecimento Emocional",
      subtitle: "Mapeie suas emoções e comportamentos",
      highlights: [
        "Identificação de padrões comportamentais automáticos",
        "Mapeamento das emoções primárias (medo, raiva, tristeza)",
        "Investigação da origem de crenças pessoais"
      ]
    },
    {
      icon: Lightbulb,
      title: "Pilar 2: Reprogramação Mental",
      subtitle: "Transforme crenças limitantes em fortalecedoras",
      highlights: [
        "Técnicas de ressignificação de memórias",
        "Substituição de diálogos internos negativos",
        "Implementação de programações mentais de sucesso"
      ]
    },
    {
      icon: Target,
      title: "Pilar 3: Domínio Emocional",
      subtitle: "Controle seus estados emocionais em tempo real",
      highlights: [
        "Técnicas de controle de impulsos e ansiedade",
        "Escolha consciente vs reação automática",
        "Uso das emoções para tomada de decisão"
      ]
    },
    {
      icon: Users,
      title: "Pilar 4: Liderança Comunicativa",
      subtitle: "Desenvolva presença e influência natural",
      highlights: [
        "Comunicação assertiva e não-violenta",
        "Construção de rapport e conexões genuínas",
        "Técnicas de liderança e gestão de conflitos"
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
            4 Pilares da <span className="text-turquoise">Transformação</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Metodologia estruturada para dominar comunicação, liderança e inteligência emocional em 1 dia intensivo
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
        
        {/* Seção Fire Walk */}
        <div className="bg-gradient-to-r from-orange-900/30 via-red-900/30 to-orange-900/30 rounded-2xl p-8 border border-orange-500/30 mb-12" data-aos="fade-up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-orange-500/20 rounded-full px-6 py-3 mb-4">
              <span className="text-2xl">🔥</span>
              <h3 className="text-2xl md:text-3xl font-bold text-orange-400">
                FIRE WALK
              </h3>
              <span className="text-2xl">🔥</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-4">
              A Experiência Transformadora Que Quebra Todos os Limites
            </h4>
            <p className="text-gray-300 max-w-3xl mx-auto">
              O momento mais poderoso do treinamento: uma caminhada sobre brasas ardentes que representa 
              sua capacidade de superar qualquer obstáculo. Uma experiência única que consolida todo 
              o aprendizado dos 4 pilares.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-black/40 rounded-xl p-6 text-center">
              <span className="text-3xl mb-3 block">🧠</span>
              <h5 className="text-orange-400 font-bold text-lg mb-2">Quebra de Crenças</h5>
              <p className="text-gray-400 text-sm">Supere limitações mentais que você acreditava serem impossíveis</p>
            </div>
            <div className="bg-black/40 rounded-xl p-6 text-center">
              <span className="text-3xl mb-3 block">⚡</span>
              <h5 className="text-orange-400 font-bold text-lg mb-2">Estado de Peak</h5>
              <p className="text-gray-400 text-sm">Acesse um estado emocional de máxima confiança e determinação</p>
            </div>
            <div className="bg-black/40 rounded-xl p-6 text-center">
              <span className="text-3xl mb-3 block">🚀</span>
              <h5 className="text-orange-400 font-bold text-lg mb-2">Transformação Total</h5>
              <p className="text-gray-400 text-sm">Saia com a certeza de que pode conquistar qualquer objetivo</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-turquoise/10 to-blue-500/10 rounded-2xl p-8 border border-turquoise/20 text-center" data-aos="fade-up">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            🎯 Metodologia Comprovada + Experiência Única
          </h3>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-6">
            Combine o aprendizado estruturado dos 4 pilares com a experiência transformadora do Fire Walk. 
            Uma jornada completa que vai <strong className="text-turquoise">reprogramar sua mente</strong> e 
            <strong className="text-turquoise"> elevar sua confiança</strong> a níveis que você nunca imaginou.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-black/30 rounded-xl p-6">
              <h4 className="text-turquoise font-bold text-lg mb-2">Parte Teórica + Prática</h4>
              <p className="text-gray-400 text-sm">4 pilares estruturados com exercícios práticos e aplicação imediata</p>
            </div>
            <div className="bg-black/30 rounded-xl p-6">
              <h4 className="text-orange-400 font-bold text-lg mb-2">Fire Walk Experiencial</h4>
              <p className="text-gray-400 text-sm">Caminhada sobre brasas para consolidar toda a transformação</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingContentSection;