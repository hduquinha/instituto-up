import { Button } from "@/components/ui/button";
import { ShieldCheck, Zap, Users, Check } from "lucide-react";

// Componente para a Barra de Progresso (design refinado)
const ProgressBar = ({ percentage }: { percentage: number }) => (
  <div className="w-full bg-black/20 rounded-full h-2.5 border border-gray-700">
    <div
      className="bg-turquoise h-2.5 rounded-full"
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
);

const FinalCtaSection = () => {
  const percentageFilled = 67.25;

  return (
    <section className="relative bg-dark-section py-20 pb-32 px-4 sm:px-6 overflow-hidden"> {/* Aumentei o padding-bottom para o botão flutuante */}
      <div className="absolute inset-0 z-0 opacity-40">
        {/* Fundo de grid (se definido no CSS global) */}
        <div className="absolute top-0 left-0 w-full h-full bg-grid-black"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-turquoise/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 container max-w-3xl mx-auto" data-aos="zoom-in-up">
        
        {/* O Card de Inscrição */}
        <div className="bg-gradient-to-b from-[#1c1c1c] to-black rounded-2xl border border-gray-800 shadow-2xl shadow-black/50 overflow-hidden">
          
          {/* Header do Card */}
          <div className="p-8 text-center border-b border-gray-800">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider">
              OFERTA ÚNICA
            </h2>
            <p className="mt-2 text-lg text-turquoise">Sua Transformação Começa Aqui</p>
          </div>

          <div className="p-8">
            {/* Lista do que está Incluso */}
            <h3 className="font-semibold text-white text-center mb-6">Ao garantir sua vaga hoje, você recebe:</h3>
            <ul className="space-y-4 mb-8 text-left"> {/* text-left para a lista */}
              {[
                "Acesso Completo aos 2 Dias de Imersão",
                "Gravação das Aulas por 1 Ano",
                "Comunidade Exclusiva de Alunos",
                "Bônus: Masterclass 'Foco Inabalável'",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3"> {/* items-start para alinhar o check ao topo */}
                  <Check className="w-5 h-5 text-turquoise flex-shrink-0 mt-1" /> {/* mt-1 para melhor alinhamento visual */}
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            {/* Barra de Progresso */}
            <div className="my-8">
              <div className="flex justify-between items-center text-xs font-medium text-gray-400 mb-2">
                <span>VAGAS PREENCHIDAS</span>
                <span>Restam poucas!</span>
              </div>
              <ProgressBar percentage={percentageFilled} />
            </div>

            {/* Botão Principal */}
            <Button 
              variant="cta" 
              size="lg" 
              className="w-full text-xl font-bold py-8 h-auto 
                         transition-all duration-300
                         shadow-[0_0_20px_#40E0D0] hover:shadow-[0_0_35px_#40E0D0]"
            >
              GARANTIR MINHA VAGA AGORA
            </Button>

            {/* Garantia */}
            <div className="mt-8 flex justify-center items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-gray-500 flex-shrink-0" />
              <p className="text-sm text-gray-500">Garantia de 7 Dias. Risco Zero.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;