import { Button } from "@/components/ui/button";
import { ShieldCheck, Check } from "lucide-react";

const ProgressBar = ({ percentage }) => (
  <div className="w-full bg-black/20 rounded-full h-2.5 border border-gray-700">
    <div className="bg-turquoise h-2.5 rounded-full" style={{ width: `${percentage}%` }} />
  </div>
);

const FinalCtaSection = () => {
  const percentageFilled = 67.25;

  return (
    <section className="relative bg-dark-section py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-turquoise/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container max-w-3xl mx-auto">
        <div className="bg-gradient-to-b from-[#1c1c1c] to-black rounded-2xl border border-gray-800 shadow-2xl shadow-black/50 overflow-hidden">
          <div className="p-6 sm:p-8 md:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider">
              OFERTA ÚNICA
            </h2>
            <p className="mt-2 text-base sm:text-lg text-turquoise">Sua Transformação Começa Aqui</p>
          </div>

          <div className="p-6 sm:p-8 md:p-12 border-t border-gray-800">
            <h3 className="font-semibold text-white text-center mb-6">
              Ao garantir sua vaga hoje, você recebe:
            </h3>

            <ul className="space-y-4 mb-8 max-w-md mx-auto">
              {[
                "Acesso Completo aos 2 Dias de Imersão",
                "Gravação das Aulas por 1 Ano",
                "Comunidade Exclusiva de Alunos",
                "Bônus: Masterclass 'Foco Inabalável'",
              ].map((item) => (
                <li key={item} className="flex items-start text-left gap-3">
                  <Check className="w-5 h-5 text-turquoise flex-shrink-0 mt-1" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            <div className="my-8 max-w-md mx-auto">
              <div className="flex justify-between items-center text-[11px] sm:text-xs font-medium text-gray-400 mb-2">
                <span>VAGAS PREENCHIDAS</span>
                <span>Restam poucas!</span>
              </div>
              <ProgressBar percentage={percentageFilled} />
            </div>

            <Button
              variant="cta"
              size="lg"
              className="w-full max-w-md mx-auto text-base sm:text-xl font-bold py-5 sm:py-7 h-auto whitespace-normal break-words leading-tight text-center shadow-[0_0_20px_#40E0D0] hover:shadow-[0_0_35px_#40E0D0]"
            >
              GARANTIR MINHA VAGA AGORA
            </Button>

            <div className="mt-8 flex justify-center items-center gap-3">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-gray-500">
                Garantia de 7 Dias. Risco Zero.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
