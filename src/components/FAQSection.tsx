import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "O que vou aprender sobre comunicação e liderança?",
      answer: "Você dominará 4 pilares fundamentais: Autoconhecimento emocional, Reprogramação de crenças limitantes, Gestão emocional avançada e Habilidades sociais com foco em liderança. Inclui técnicas de comunicação assertiva, escuta ativa, persuasão ética, gestão de conflitos e desenvolvimento de presença de liderança."
    },
    {
      question: "Qual a localização exata do evento?",
      answer: "O evento será realizado no Lito Palace Hotel, localizado em Registro-SP, no Vale do Ribeira. O hotel oferece estacionamento gratuito para participantes e excelente estrutura para nosso treinamento intensivo."
    },
    {
      question: "Funciona mesmo? Como posso ter certeza?",
      answer: "Oferecemos 7 dias de garantia incondicional após o evento. Se você não sentir que está no caminho certo para sua transformação, devolvemos 100% do seu dinheiro sem perguntas. Além disso, temos uma taxa de satisfação de 97% entre nossos alunos."
    },
    {
      question: "Quais são os horários do treinamento?",
      answer: "O evento acontece no dia 25 de outubro de 2025, das 7h às 21h (14 horas intensivas), com intervalos estratégicos para coffee breaks, almoço e networking. O programa é intensivo, mas foi desenvolvido para maximizar o aprendizado."
    },
    {
      question: "Como chegar ao Lito Palace Hotel em Registro-SP?",
      answer: "Registro fica no Vale do Ribeira, a cerca de 200km de São Paulo. Oferecemos informações detalhadas de como chegar de carro, ônibus ou outros meios de transporte após a confirmação da inscrição."
    },
    {
      question: "É seguro comprar online? Como funciona o pagamento?",
      answer: "Absolutamente seguro! Utilizamos a plataforma do Mercado Pago, líder em segurança de pagamentos no Brasil. Você pode pagar com cartão de crédito, débito, PIX ou boleto bancário. Oferecemos parcelamento em até 12x sem juros."
    },
    {
      question: "Preciso ter conhecimento prévio?",
      answer: "Não! Nosso método foi desenvolvido para pessoas que estão começando sua jornada de transformação. Começamos do básico e evoluímos gradualmente. O importante é ter vontade de mudar e crescer."
    },
    {
      question: "E se eu não puder participar presencialmente após a compra?",
      answer: "Entendemos que imprevistos acontecem. Em casos excepcionais, oferecemos reagendamento para a próxima turma (sujeito a disponibilidade) ou reembolso integral conforme nossa política de 7 dias de garantia."
    },
    {
      question: "Quantas pessoas participam do treinamento?",
      answer: "Limitamos intencionalmente a 50 participantes para garantir qualidade, atenção personalizada e networking efetivo. Isso permite que todos tenham contato direto com os mentores e uma experiência mais exclusiva."
    },
    {
      question: "Há limite de idade ou área profissional?",
      answer: "Não há limites! Nossos métodos funcionam para qualquer pessoa, independente da idade, profissão ou momento de vida. Temos participantes desde jovens universitários até executivos experientes, todos buscando sua transformação."
    },
    {
      question: "O que é o Fire Walk e é seguro?",
      answer: "O Fire Walk é uma caminhada sobre brasas ardentes, uma experiência transformadora que quebra crenças limitantes e consolida todo o aprendizado. É 100% seguro quando conduzido por profissionais experientes, e TODO MUNDO consegue passar no Fire Walk. Nossa metodologia prepara você completamente para ter esta experiência única de transformação."
    },
    {
      question: "O que acontece se eu precisar de acomodação no hotel?",
      answer: "O Lito Palace Hotel oferece descontos especiais para participantes do Instituto UP. Entre em contato conosco após a inscrição e ajudaremos com reservas e condições preferenciais para sua estadia."
    }
  ];

  return (
    <section className="bg-gray-900 py-20 px-4 sm:px-6">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="bg-turquoise/20 p-8 rounded-full transition-all duration-500 ease-in-out hover:bg-turquoise/30">
              <HelpCircle className="w-16 h-16 text-turquoise" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            🤔 Perguntas <span className="text-turquoise">Frequentes</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
            Tire todas as suas dúvidas antes de garantir sua transformação
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-black/50 rounded-3xl border border-gray-700 overflow-hidden transition-all duration-500 ease-in-out hover:border-turquoise/30 hover:scale-[1.02]"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-8 text-left flex items-center justify-between hover:bg-gray-800/30 transition-all duration-300"
              >
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-white pr-6 leading-relaxed">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-8 h-8 text-turquoise transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="w-8 h-8 text-gray-400 transition-transform duration-300" />
                  )}
                </div>
              </button>
              
              {openItems.includes(index) && (
                <div className="px-8 pb-8">
                  <div className="border-t border-gray-700 pt-6">
                    <p className="text-gray-300 leading-relaxed text-lg lg:text-xl">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA at the bottom */}
        <div className="text-center mt-20">
          <p className="text-xl lg:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto">
            Ainda tem dúvidas? Nossa garantia de 7 dias remove todo o risco para você!
          </p>
          
          <a href="#pricing" className="inline-block">
            <button 
              onClick={scrollToPricing}
              className="bg-gradient-to-r from-turquoise to-blue-500 text-black font-bold text-xl lg:text-2xl px-12 py-8 rounded-2xl transform hover:scale-105 transition-all duration-500 ease-in-out shadow-lg hover:shadow-2xl"
            >
              🏨 GARANTIR VAGA PRESENCIAL AGORA
            </button>
          </a>
          
          <p className="text-base text-gray-500 mt-6">
            🛡️ 7 dias de garantia • 🔒 Pagamento seguro • 🏨 Local premium • ⭐ 97% de satisfação
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
