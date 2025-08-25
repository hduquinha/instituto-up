import { CheckCircle } from "lucide-react";

const LearningSection = () => {
  const learningPoints = [
    {
      title: "Gestão das Emoções",
      description: "Aprenda a reconhecer e gerenciar suas emoções de forma saudável."
    },
    {
      title: "Comunicação Eficaz",
      description: "Desenvolva habilidades de comunicação assertiva para melhorar seus relacionamentos."
    },
    {
      title: "Redução da Ansiedade",
      description: "Domine técnicas para se sentir mais calmo, confiante e produtivo."
    }
  ];

  return (
    <section className="bg-dark-bg py-20 px-6">
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-text-light">
          O Mapa da sua{" "}
          <span className="text-turquoise">Transformação</span>
        </h2>
        
        <div className="space-y-8">
          {learningPoints.map((point, index) => (
            <div key={index} className="bg-dark-section rounded-lg p-8 flex items-start gap-6 hover:bg-opacity-80 transition-colors">
              <div className="flex-shrink-0">
                <div className="bg-turquoise text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-text-light">
                  {point.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {point.description}
                </p>
              </div>
              <CheckCircle className="w-6 h-6 text-turquoise flex-shrink-0 mt-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningSection;