import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CheckoutForm from "./CheckoutForm";

const PricingSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleBuyClick = (plan: any) => {
    // Criar descrição rica baseada no plano
    let richDescription = '';
    let additionalInfo = '';
    
    if (plan.name === 'Standard') {
      richDescription = '🎯 STANDARD - Sua Transformação Começa Aqui!\n\n✅ 2 dias de treinamento ao vivo\n✅ Material de apoio em PDF premium\n✅ Acesso à comunidade exclusiva\n✅ Certificado de participação\n✅ Suporte via comunidade\n\n💡 Ideal para quem quer dar o primeiro passo rumo ao sucesso!\n\n🔥 OFERTA LIMITADA: De R$197 por apenas R$47 (76% OFF)';
      additionalInfo = 'Treinamento: 2 dias ao vivo | Material: PDF premium | Comunidade: Acesso vitalício | Certificado: Incluído | Desconto: 76% OFF';
    } else if (plan.name === 'UP VIP') {
      richDescription = '🚀 UP VIP - A Experiência Completa! (MAIS ESCOLHIDO)\n\n✅ TUDO do plano Standard, MAIS:\n✅ Gravações por 1 ano completo\n✅ Sessão Bônus Q&A em grupo\n✅ Módulo extra: Produtividade Acelerada\n✅ Grupo VIP exclusivo no WhatsApp\n✅ Suporte direto com os mentores\n✅ Material bônus exclusivo\n✅ Certificado VIP diferenciado\n\n🔥 MÁXIMO APROVEITAMENTO garantido!\n\n💎 OFERTA VIP: De R$497 por apenas R$197 (60% OFF)\n⚡ APENAS 20 VAGAS DISPONÍVEIS!';
      additionalInfo = 'Gravações: 1 ano | Bônus: Sessão Q&A | Extra: Produtividade Acelerada | VIP: Comunidade exclusiva | WhatsApp: Grupo VIP | Suporte: Direto com mentores';
    }

    const productData = {
      id: plan.name.toLowerCase().replace(/\s+/g, '-'),
      title: `Instituto UP - ${plan.name}`,
      description: richDescription,
      additionalInfo: additionalInfo,
      price: parseFloat(plan.price)
    };
    
    setSelectedProduct(productData);
    setShowForm(true);
  };
  const plans = [
    {
      name: "Presencial",
      price: "1997",
      originalPrice: "3997",
      description: "Treinamento presencial intensivo em comunicação e liderança no Lito Palace Hotel, Registro-SP.",
      features: [
        "Treinamento presencial intensivo (14h)",
        "Data: 25 de Outubro de 2025",
        "Local: Lito Palace Hotel - Registro-SP", 
        "Café da manhã e coffee breaks inclusos",
        "Material físico premium entregue no local",
        "Crachá personalizado de participante",
        "Certificado de participação presencial",
        "Fire Walk - Experiência transformadora",
        "Acesso às gravações por 6 meses"
      ],
      cta: "Garantir Vaga Presencial",
      isRecommended: true,
      discount: "50% OFF",
      urgency: "VAGAS LIMITADAS!"
    },
  ];

  return (
    <section
      id="pricing"
      className="relative bg-black py-16 sm:py-20 px-4 sm:px-6 overflow-hidden"
    >
      <div className="absolute inset-0 flex justify-center items-center opacity-30 pointer-events-none">
        <div className="w-[900px] h-[900px] bg-turquoise/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 container max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wider">
            Treinamento Presencial <span className="text-turquoise">Exclusivo</span>
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-gray-400">
            Uma experiência única no Lito Palace Hotel. Vagas limitadas para garantir qualidade e exclusividade.
          </p>
        </div>

        {/* Card único centralizado */}
        <div className="flex justify-center">
          <div className="max-w-lg w-full">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-[#111] rounded-2xl border flex flex-col transition-all duration-500 ease-in-out h-full w-full max-w-lg mx-auto transform hover:scale-105 ${
                  plan.isRecommended
                    ? "border-turquoise shadow-2xl shadow-turquoise/20 lg:scale-105"
                    : "border-gray-800"
                }`}
              >
                {plan.isRecommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-turquoise text-black font-bold text-sm px-4 py-2 rounded-full uppercase tracking-wider z-10">
                    🔥 Mais Popular
                  </div>
                )}

                <div className={`flex-grow p-8 ${plan.isRecommended ? "pt-12" : ""}`}>
                  <h3 className={`text-2xl lg:text-3xl font-bold text-center mb-6 ${plan.isRecommended ? "text-turquoise" : "text-white"}`}>
                    {plan.name}
                  </h3>

                  <div className="text-center my-8">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <span className="text-xl text-gray-500 line-through">R$ {plan.originalPrice}</span>
                      <span className="text-5xl lg:text-6xl font-extrabold text-white">R$ {plan.price}</span>
                    </div>
                    <div className="flex justify-center gap-3 mb-2">
                      <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                        {plan.discount}
                      </span>
                      <span className="text-red-400 text-sm font-bold animate-pulse">{plan.urgency}</span>
                    </div>
                    <span className="text-gray-400 text-lg"> / à vista</span>
                  </div>

                  <p className="text-gray-400 text-center text-base lg:text-lg min-h-[4rem] mb-8 leading-relaxed">
                    {plan.description}
                  </p>

                  <hr className="border-gray-700 my-8" />
                  <ul className="space-y-5 text-gray-300">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-4">
                        <Check
                          className={`w-6 h-6 mt-1 flex-shrink-0 ${
                            plan.isRecommended ? "text-turquoise" : "text-gray-500"
                          }`}
                        />
                        <span className="text-base lg:text-lg leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto p-8 pt-0">
                  <Button
                    onClick={() => handleBuyClick(plan)}
                    variant={plan.isRecommended ? "cta" : "secondary"}
                    className="w-full text-lg lg:text-xl py-6 whitespace-normal break-words leading-tight text-center transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                  >
                    {plan.isRecommended && <Star className="w-6 h-6 mr-3" />}
                    {plan.cta}
                  </Button>
                  
                  <p className="text-center text-sm text-gray-500 mt-4">
                    💳 Parcelamento disponível • 🔒 Compra 100% segura
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal do Checkout */}
      {showForm && selectedProduct && (
        <CheckoutForm
          productData={selectedProduct}
          onClose={() => {
            setShowForm(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </section>
  );
};

export default PricingSection;
