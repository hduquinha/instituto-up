import { Button } from "@/components/ui/button";
import { Clock, Users, Award } from "lucide-react";

const FinalCtaSection = () => {
  return (
    <section className="bg-dark-bg text-text-light py-20 px-6">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Está pronto para começar a sua{" "}
          <span className="text-turquoise">virada de chave?</span>
        </h2>
        
        <p className="text-xl text-text-muted mb-12 max-w-2xl mx-auto">
          Vagas limitadas. Garante seu lugar no treinamento que vai{" "}
          <span className="text-turquoise">redefinir seus resultados</span>.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex flex-col items-center">
            <Clock className="w-8 h-8 text-turquoise mb-2" />
            <p className="text-text-muted">2 Dias Intensivos</p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-8 h-8 text-turquoise mb-2" />
            <p className="text-text-muted">Vagas Limitadas</p>
          </div>
          <div className="flex flex-col items-center">
            <Award className="w-8 h-8 text-turquoise mb-2" />
            <p className="text-text-muted">Certificado Incluso</p>
          </div>
        </div>
        
        <Button 
          variant="cta" 
          size="lg" 
          className="text-xl px-12 py-8 h-auto"
        >
          QUERO TRANSFORMAR MINHA VIDA AGORA
        </Button>
        
        <p className="text-sm text-text-muted mt-6">
          ⚡ Últimas vagas disponíveis - Não perca esta oportunidade única!
        </p>
      </div>
    </section>
  );
};

export default FinalCtaSection;