import React from 'react';
import { CheckCircle2, ArrowRight } from "lucide-react";

const AboutTrainingSection = () => {
  const objectives = [
    "Desenvolver habilidades de liderança emocional e inspirar sua equipe",
    "Comunicar-se de forma eficaz e construir relações fortes",
    "Gerenciar estresse e ansiedade e encontrar mais equilíbrio em sua vida",
    "Descobrir seu potencial e alcançar seus objetivos"
  ];

  const gains = [
    "Autoconfiança e autoestima para liderar com autoridade",
    "Habilidades sociais e de relacionamento para construir redes de apoio",
    "Resiliência e capacidade de lidar com desafios para superar obstáculos",
    "Um certificado de conclusão para validar suas habilidades"
  ];

  const scrollToPricing = () => {
    const pricingSection = document.querySelector('#pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gray-900 py-20 px-4 sm:px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Desbloqueie Seu Potencial com o <span className="text-turquoise">UP DAY PLUS!</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Você está pronto para transformar sua vida e carreira? O treinamento UP DAY PLUS é uma experiência única e poderosa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-8" data-aos="fade-right">
            <div className="bg-black/30 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6">
                O treinamento vai ajudá-lo a:
              </h3>
              <ul className="space-y-4">
                {objectives.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-turquoise flex-shrink-0 mt-1" />
                    <span className="text-gray-300 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Com dinâmicas de alto impacto e exercícios vivenciais, você vai experimentar uma jornada de autoconhecimento e crescimento pessoal. Nossa equipe irá guiá-la em uma jornada de descoberta e desenvolvimento de habilidades práticas e aplicáveis.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-2xl border border-turquoise/20" data-aos="fade-left">
            <h3 className="text-2xl font-bold text-white mb-6">
              O que você vai ganhar?
            </h3>
            <ul className="space-y-6">
              {gains.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="bg-turquoise/10 p-2 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-turquoise" />
                  </div>
                  <span className="text-gray-300 text-lg">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-10 pt-8 border-t border-gray-700">
              <p className="text-white font-semibold mb-6 text-center">
                Não perca a chance de potencializar sua vida!
              </p>
              <button 
                onClick={scrollToPricing}
                className="w-full bg-turquoise hover:bg-turquoise-light text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Inscreva-se Agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTrainingSection;
