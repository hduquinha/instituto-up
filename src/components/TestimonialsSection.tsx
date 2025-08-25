import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ana Carolina Silva",
      text: "O treinamento mudou completamente minha forma de lidar com o estresse no trabalho. Agora consigo manter a calma e ser mais produtiva em situações desafiadoras.",
      image: "/placeholder.svg"
    },
    {
      name: "Marcus Oliveira",
      text: "A metodologia do Rodrigo e da Vanessa é incrível. Em apenas 2 dias aprendi técnicas que uso todos os dias para melhorar meus relacionamentos pessoais e profissionais.",
      image: "/placeholder.svg"
    },
    {
      name: "Carla Mendes",
      text: "Sofria muito com ansiedade e isso afetava minha performance. Hoje tenho ferramentas práticas para gerenciar minhas emoções e conquistar meus objetivos com mais confiança.",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section className="bg-background py-20 px-6">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
          Veja o que{" "}
          <span className="text-turquoise">nossos alunos dizem</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card p-8 rounded-lg shadow-lg border border-border">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-turquoise text-turquoise" />
                ))}
              </div>
              
              <p className="text-card-foreground mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-muted-foreground">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-card-foreground">
                    {testimonial.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;