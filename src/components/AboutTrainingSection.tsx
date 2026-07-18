import { Brain, HeartHandshake, Megaphone, TrendingUp } from "lucide-react";
import { scrollToInscricao } from "@/components/HeroSection";

const AboutTrainingSection = () => {
  const audience = [
    {
      icon: Megaphone,
      title: "Quer se comunicar melhor",
      text: "Fale com clareza e segurança em qualquer situação, pessoal ou profissional.",
    },
    {
      icon: TrendingUp,
      title: "Deseja desenvolver liderança",
      text: "Construa presença e influência natural para liderar pessoas e projetos.",
    },
    {
      icon: Brain,
      title: "Precisa dominar as emoções",
      text: "Gerencie estresse e ansiedade e encontre mais equilíbrio no dia a dia.",
    },
    {
      icon: HeartHandshake,
      title: "Busca autoconfiança",
      text: "Descubra seu potencial e construa relacionamentos mais saudáveis.",
    },
  ];

  return (
    <section className="bg-gray-900 px-4 py-16 sm:px-6 sm:py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-white md:text-5xl">
            O que é o <span className="text-turquoise">UP Day Plus?</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-300">
            Uma experiência presencial única do Instituto UP: 2 dias de dinâmicas de alto impacto e
            exercícios vivenciais para transformar sua comunicação, suas emoções e sua liderança.
          </p>
        </div>

        <h3 className="mb-8 text-center text-xl font-bold uppercase tracking-wider text-white sm:text-2xl">
          Para quem é o <span className="text-turquoise">treinamento</span>
        </h3>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audience.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-800 bg-black/40 p-6 transition-colors hover:border-turquoise/40"
            >
              <div className="mb-4 inline-flex rounded-full bg-turquoise/20 p-3">
                <item.icon className="h-6 w-6 text-turquoise" />
              </div>
              <h4 className="mb-2 text-lg font-bold leading-tight text-white">{item.title}</h4>
              <p className="text-sm leading-relaxed text-gray-400">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={scrollToInscricao}
            className="rounded-xl bg-turquoise px-8 py-4 font-bold uppercase tracking-wide text-black transition-all hover:scale-105 hover:bg-turquoise-light"
          >
            Quero me inscrever
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutTrainingSection;
