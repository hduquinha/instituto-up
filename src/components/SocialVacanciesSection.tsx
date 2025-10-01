import { Heart, Users, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

const SocialVacanciesSection = () => {
  const handleSocialVacanciesClick = () => {
    // Aqui você pode redirecionar para o formulário das vagas sociais
    window.open("https://forms.gle/exemplo-vagas-sociais", "_blank");
  };

  return (
    <section className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-turquoise/20 py-16 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 container max-w-4xl mx-auto text-center">
        <div className="mb-8" data-aos="fade-up">
          <div className="flex justify-center mb-4">
            <div className="bg-turquoise/10 rounded-full p-4 border border-turquoise/30">
              <Heart className="h-8 w-8 text-turquoise" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Programa de <span className="text-turquoise">Vagas Sociais</span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            Acreditamos que a transformação deve ser acessível a todos. 
            Se você tem vontade de participar mas está passando por dificuldades financeiras, 
            temos vagas sociais disponíveis.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8" data-aos="fade-up" data-aos-delay="100">
          <div className="bg-black/40 rounded-xl p-6 border border-gray-700">
            <Users className="h-12 w-12 text-turquoise mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Para Quem é</h3>
            <p className="text-gray-400 text-sm">
              Pessoas com renda familiar de até 3 salários mínimos que demonstrem real interesse na transformação pessoal.
            </p>
          </div>
          
          <div className="bg-black/40 rounded-xl p-6 border border-gray-700">
            <Gift className="h-12 w-12 text-turquoise mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">O que Oferecemos</h3>
            <p className="text-gray-400 text-sm">
              Acesso completo ao treinamento presencial, incluindo materiais, alimentação e certificado.
            </p>
          </div>
          
          <div className="bg-black/40 rounded-xl p-6 border border-gray-700">
            <Heart className="h-12 w-12 text-turquoise mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Como Funciona</h3>
            <p className="text-gray-400 text-sm">
              Preencha o formulário com suas informações. Analisaremos todos os pedidos com carinho e critério.
            </p>
          </div>
        </div>
        
        <div className="bg-black/60 rounded-2xl p-8 border border-turquoise/30" data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-2xl font-bold text-white mb-4">
            Não deixe a situação financeira impedir sua transformação
          </h3>
          <p className="text-gray-300 mb-6">
            Temos um número limitado de vagas sociais disponíveis. 
            Se você acredita que este treinamento pode mudar sua vida, candidate-se!
          </p>
          
          <Button
            onClick={handleSocialVacanciesClick}
            className="bg-turquoise hover:bg-turquoise/90 text-black font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <Heart className="h-5 w-5 mr-2" />
            Candidatar-se às Vagas Sociais
          </Button>
          
          <p className="text-sm text-gray-500 mt-4">
            * Vagas limitadas • Análise criteriosa • Resposta em até 48h
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialVacanciesSection;