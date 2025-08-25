import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-dark-bg text-text-light min-h-screen flex items-center justify-center px-6 py-20">
      <div className="container max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Transforme sua Vida em{" "}
          <span className="text-turquoise">2 Dias</span>:
          <br />
          Domine suas Emoções, Eleve sua Performance.
        </h1>
        
        <p className="text-xl md:text-2xl text-text-muted mb-8 max-w-3xl mx-auto leading-relaxed">
          Um treinamento online e imersivo com{" "}
          <span className="text-turquoise font-semibold">Rodrigo Damaçeno</span> e{" "}
          <span className="text-turquoise font-semibold">Vanessa Vaz</span>.
          <br />
          6 horas por dia, das 9h às 12h.
        </p>
        
        <Button 
          variant="cta" 
          size="lg" 
          className="text-lg px-8 py-6 h-auto"
        >
          QUERO GARANTIR MINHA VAGA AGORA
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;