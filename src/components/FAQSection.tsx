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
      question: "O que exatamente vou aprender no Instituto UP?",
      answer: "Você vai aprender metodologias práticas e comprovadas para transformar sua mentalidade, aumentar sua produtividade, melhorar seus relacionamentos e construir uma carreira de sucesso. São técnicas que já transformaram mais de 10.000 pessoas em todo o Brasil."
    },
    {
      question: "Funciona mesmo? Como posso ter certeza?",
      answer: "Oferecemos 7 dias de garantia incondicional. Se você não sentir que está no caminho certo para sua transformação, devolvemos 100% do seu dinheiro sem perguntas. Além disso, temos uma taxa de satisfação de 97% entre nossos alunos."
    },
    {
      question: "Qual a diferença entre o Standard e o UP VIP?",
      answer: "O Standard inclui o treinamento ao vivo, material em PDF e acesso à comunidade. O UP VIP inclui tudo isso MAIS: gravações por 1 ano, sessão bônus de Q&A, módulo extra de Produtividade, grupo VIP no WhatsApp e suporte direto com os mentores."
    },
    {
      question: "Por quanto tempo terei acesso ao conteúdo?",
      answer: "No plano Standard, você tem acesso vitalício à comunidade e material em PDF. No UP VIP, você tem acesso às gravações por 1 ano completo, além de todos os benefícios vitalícios."
    },
    {
      question: "É seguro comprar online? Como funciona o pagamento?",
      answer: "Absolutamente seguro! Utilizamos a plataforma do Mercado Pago, líder em segurança de pagamentos no Brasil. Você pode pagar com cartão de crédito, débito, PIX ou boleto bancário. Seus dados estão 100% protegidos."
    },
    {
      question: "Preciso ter conhecimento prévio?",
      answer: "Não! Nosso método foi desenvolvido para pessoas que estão começando sua jornada de transformação. Começamos do básico e evoluímos gradualmente. O importante é ter vontade de mudar e crescer."
    },
    {
      question: "E se eu não conseguir participar ao vivo?",
      answer: "No plano UP VIP, você terá acesso às gravações por 1 ano. No plano Standard, recomendamos fortemente a participação ao vivo para máximo aproveitamento, mas sempre damos suporte via comunidade."
    },
    {
      question: "Posso parcelar o pagamento?",
      answer: "Sim! Oferecemos parcelamento em até 12x no cartão de crédito através do Mercado Pago. As condições de parcelamento aparecem no momento do checkout."
    },
    {
      question: "Há limite de idade ou área profissional?",
      answer: "Não há limites! Nossos métodos funcionam para qualquer pessoa, independente da idade, profissão ou momento de vida. Temos alunos desde jovens universitários até executivos experientes."
    },
    {
      question: "Como funciona o suporte e a comunidade?",
      answer: "No Standard, você tem suporte via comunidade de alunos. No UP VIP, além da comunidade, você tem acesso ao grupo VIP no WhatsApp e suporte direto com nossos mentores qualificados."
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
              💪 COMEÇAR MINHA TRANSFORMAÇÃO
            </button>
          </a>
          
          <p className="text-base text-gray-500 mt-6">
            🛡️ 7 dias de garantia • 🔒 Pagamento seguro • ⭐ 97% de satisfação
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
