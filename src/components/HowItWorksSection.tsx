import { CalendarCheck, ClipboardPen, PhoneCall } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: ClipboardPen,
      title: "1. Faça sua inscrição",
      text: "Preencha o formulário no topo da página em poucos minutos.",
    },
    {
      icon: PhoneCall,
      title: "2. Nossa equipe entra em contato",
      text: "Você recebe o direcionamento do pagamento e a confirmação da vaga.",
    },
    {
      icon: CalendarCheck,
      title: "3. Viva a experiência",
      text: "15 e 16 de Agosto em São Paulo-SP: 2 dias de imersão que transformam.",
    },
  ];

  return (
    <section className="bg-black px-4 py-16 sm:px-6 sm:py-20">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-3xl font-extrabold text-white md:text-5xl">
          Como <span className="text-turquoise">funciona</span>
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 text-center"
            >
              <div className="mb-4 inline-flex rounded-full bg-turquoise/20 p-4">
                <step.icon className="h-7 w-7 text-turquoise" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
