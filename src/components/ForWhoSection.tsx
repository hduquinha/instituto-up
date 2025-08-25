import { Brain, MessageCircle, TrendingUp } from "lucide-react";

const ForWhoSection = () => {
  const benefits = [
    {
      icon: Brain,
      title: "Mais Autocontrole e Gestão Emocional",
      description: "Aprenda técnicas para gerenciar suas emoções de forma eficaz"
    },
    {
      icon: MessageCircle,
      title: "Melhorar a Comunicação e os Relacionamentos",
      description: "Desenvolva habilidades para se conectar melhor com as pessoas"
    },
    {
      icon: TrendingUp,
      title: "Reduzir a Ansiedade e Aumentar a Produtividade",
      description: "Conquiste mais foco e resultados no seu dia a dia"
    }
  ];

  return (
    <section className="bg-dark-section py-20 px-6">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-text-light">
          Este Treinamento é Para{" "}
          <span className="text-turquoise">Você Que Deseja:</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="bg-turquoise w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-turquoise-light transition-colors">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-text-light">
                {benefit.title}
              </h3>
              <p className="text-text-muted leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForWhoSection;