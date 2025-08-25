import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-6 py-20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* Overlay transparente */}
      <div className="absolute inset-0 bg-dark-bg/85"></div>
      
      {/* Conteúdo */}
      <div className="relative z-10 container max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Coluna da esquerda - Texto principal */}
          <div className="text-left">
            <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-text-light">
              Transforme sua Vida em{" "}
              <span className="text-turquoise">2 Dias</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-text-light">
              Domine suas Emoções, Eleve sua Performance.
            </h2>
            
            <p className="text-lg md:text-xl text-text-muted mb-8 leading-relaxed">
              Um treinamento online e imersivo com{" "}
              <span className="text-turquoise font-semibold">Rodrigo Damaçeno</span> e{" "}
              <span className="text-turquoise font-semibold">Vanessa Vaz</span>.
            </p>
            
            <div className="bg-turquoise/10 border border-turquoise/30 rounded-lg p-4 mb-8">
              <p className="text-turquoise-light font-semibold text-lg">
                📅 6 horas por dia, das 9h às 12h
              </p>
            </div>
            
            <Button 
              variant="cta" 
              size="lg" 
              className="text-lg px-8 py-6 h-auto w-full md:w-auto"
            >
              QUERO GARANTIR MINHA VAGA AGORA
            </Button>
          </div>
          
          {/* Coluna da direita - Info adicional */}
          <div className="space-y-6">
            <div className="bg-dark-section/80 backdrop-blur-sm rounded-lg p-6 border border-turquoise/20">
              <h3 className="text-xl font-bold text-turquoise mb-3">
                ✨ Transformação Garantida
              </h3>
              <p className="text-text-muted">
                Método comprovado para desenvolver inteligência emocional e alta performance em apenas 2 dias intensivos.
              </p>
            </div>
            
            <div className="bg-dark-section/80 backdrop-blur-sm rounded-lg p-6 border border-turquoise/20">
              <h3 className="text-xl font-bold text-turquoise mb-3">
                🎯 Resultados Imediatos
              </h3>
              <p className="text-text-muted">
                Técnicas práticas que você pode aplicar imediatamente em sua vida pessoal e profissional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;