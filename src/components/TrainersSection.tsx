import rodrigoImage from "@/assets/rodrigo-damaceno.jpg";
import vanessaImage from "@/assets/vanessa-vaz.jpg";

const TrainersSection = () => {
  const trainers = [
    {
      name: "Rodrigo Damaçeno Giz",
      title: "Treinador Comportamental",
      description: "Especialista em Mudança Comportamental e alta performance para líderes. Fundador do Instituto UP, impacta milhares de pessoas com foco em Desenvolvimento Pessoal, Liderança e Inteligência Emocional.",
      image: rodrigoImage
    },
    {
      name: "Vanessa Vaz",
      title: "Coordenadora UP Treinamentos",
      description: "Especialista em Terapia Cognitiva Comportamental e Análise Comportamental. Ajuda você a gerenciar a ansiedade, desenvolver habilidades emocionais e melhorar sua qualidade de vida.",
      image: vanessaImage
    }
  ];

  return (
    <section className="bg-background py-20 px-6">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
          Dois Especialistas Dedicados à{" "}
          <span className="text-turquoise">sua Evolução</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {trainers.map((trainer, index) => (
            <div key={index} className="text-center">
              <div className="mb-6">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-48 h-48 rounded-full object-cover mx-auto shadow-xl"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-foreground">
                {trainer.name}
              </h3>
              <p className="text-turquoise font-semibold text-lg mb-4">
                {trainer.title}
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                {trainer.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;