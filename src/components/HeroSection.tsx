import { Button } from "@/components/ui/button";
import { ChevronDown, CalendarDays } from "lucide-react"; // Removi CheckCircle2 se não estiver sendo usado diretamente na Hero
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 pb-32 md:pb-20 bg-cover bg-center bg-no-repeat overflow-hidden" // Aumentei o padding-bottom para o botão flutuante
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* Overlay em Gradiente otimizado para mobile (de baixo para cima) */}
      {/* Mudei o gradiente para garantir visibilidade do texto no mobile */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-dark-bg/80 to-transparent"></div>
      
      {/* Conteúdo */}
      <div className="relative z-10 container max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
        {/* Coluna da esquerda - Ocupa todo o espaço no mobile */}
        <div className="text-center"> {/* Garantir centralização */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight text-white"
            data-aos="fade-up"
          >
            Sua <span className="text-turquoise">Virada de Chave</span> Começa em 2 Dias
          </h1>
          
          <h2 
            className="text-lg md:text-2xl font-semibold mb-6 text-gray-200"
            data-aos="fade-up" data-aos-delay="100"
          >
            Domine suas Emoções, Eleve sua Performance.
          </h2>
          
          <p 
            className="text-base md:text-xl text-gray-300 mb-8 leading-relaxed max-w-prose mx-auto" // mx-auto para centralizar parágrafo
            data-aos="fade-up" data-aos-delay="200"
          >
            Uma imersão online e <strong>ao vivo</strong> com Rodrigo Damaceno, desenhada para <strong>reprogramar</strong> sua resposta ao estresse e à ansiedade.
          </p>
          
          {/* Bloco de Ação (Data e Botão) */}
          <div 
            className="flex flex-col items-center gap-4" // Removi md:items-start para manter centralizado
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div 
              className="inline-flex items-center gap-3 bg-turquoise/10 border border-turquoise/30 rounded-lg p-4 w-full max-w-sm justify-center" // max-w-sm para limitar a largura
            >
              <CalendarDays className="h-5 w-5 text-turquoise" />
              <p className="text-turquoise-light font-semibold text-base md:text-lg">
                6 horas por dia, das 9h às 12h
              </p>
            </div>
            
            <div className="w-full max-w-sm"> {/* max-w-sm para limitar a largura do botão */}
              <Button 
                variant="cta" 
                size="lg" 
                className="text-lg px-8 py-6 h-auto w-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-turquoise/30"
              >
                QUERO GARANTIR MINHA VAGA AGORA
              </Button>
            </div>
          </div>
        </div>
        
        {/* Coluna da direita - ESCONDIDA NO MOBILE para focar na conversão (mantido) */}
        {/* Se você quiser que ela apareça, basta remover 'hidden md:block' e adicionar 'max-w-md mx-auto md:max-w-none md:mx-0' */}
        <div 
          className="hidden" // Mudei para 'hidden' para garantir que nunca aparece. Se quiser que apareça no desktop, mude para 'hidden md:block'
        >
          {/* Conteúdo da coluna da direita, que não aparecerá no mobile */}
        </div>
      </div>

      {/* Chamado para rolar a página */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gray-400 cursor-pointer">
        <span className="text-sm font-semibold">Descubra o caminho para a mudança</span>
        <ChevronDown className="h-6 w-6 animate-bounce text-turquoise" />
      </div>
    </section>
  );
};

export default HeroSection;