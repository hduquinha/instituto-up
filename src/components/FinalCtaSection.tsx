import { Button } from "@/components/ui/button";
import { ShieldCheck, Zap, Users, Gift, Check } from "lucide-react"; // Importado o ícone 'Check'

const ProgressBar = ({ percentage }: { percentage: number }) => (
  <div className="w-full bg-gray-800/50 rounded-full h-4 my-4 border border-gray-700"><div className="bg-gradient-to-r from-turquoise/70 to-turquoise h-4 rounded-full flex items-center justify-end transition-all duration-500" style={{ width: `${percentage}%` }}><div className="w-2 h-2 rounded-full bg-white mr-1 shadow-[0_0_5px_white]"></div></div></div>
);

const FinalCtaSection = () => {
  const percentageFilled = 67.25;

  return (
    <section className="relative bg-black py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 z-0"><div className="absolute top-1/4 left-1/4 w-96 h-96 bg-turquoise/10 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div><div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-turquoise/10 rounded-full filter blur-3xl opacity-30 animate-pulse-slow animation-delay-2000"></div></div>
      <div className="relative z-10 container max-w-4xl mx-auto text-center" data-aos="fade-up">
        <div className="bg-gradient-to-b from-dark-section to-[#111] rounded-2xl border border-gray-800 shadow-2xl shadow-black/50 overflow-hidden">
          <div className="p-8 md:p-12">
            <Zap className="w-10 h-10 text-turquoise mx-auto mb-4" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wider">Sua <span className="text-turquoise">Última Oportunidade</span></h2>
            <p className="max-w-xl mx-auto mt-4 text-lg text-gray-300">Junte-se ao grupo que decidiu transformar seus resultados. As vagas estão prestes a encerrar.</p>
            <div className="my-8 max-w-md mx-auto"><div className="flex justify-between items-center text-sm font-semibold"><span className="text-turquoise flex items-center"><Users className="w-4 h-4 mr-2" /> Vagas Preenchidas</span><span className="text-white">{percentageFilled}%</span></div><ProgressBar percentage={percentageFilled} /></div>
            
            <div className="bg-black/30 rounded-lg p-6 my-10 text-left border-t border-b border-turquoise/20">
              <h4 className="flex items-center text-xl font-bold text-turquoise mb-4"><Gift className="w-6 h-6 mr-3" />Você Leva de Bônus (Hoje):</h4>
              <ul className="space-y-3 text-gray-300">
                {/* CORREÇÃO: Substituído o '✓' por um componente de ícone para alinhamento correto */}
                <li className="flex items-start gap-3"><Check className="w-5 h-5 mt-1 text-turquoise flex-shrink-0" /><span className="font-semibold text-white">Masterclass "Foco Inabalável"</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 mt-1 text-turquoise flex-shrink-0" /><span className="font-semibold text-white">E-book "O Ciclo da Produtividade"</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 mt-1 text-turquoise flex-shrink-0" /><span className="font-semibold text-white">Acesso por 1 ano às gravações</span></li>
              </ul>
            </div>

            <Button variant="cta" size="lg" className="w-full max-w-md mx-auto text-xl px-12 py-8 h-auto transition-all duration-300 shadow-[0_0_25px_rgba(64,224,208,0.5)] hover:shadow-[0_0_45px_rgba(64,224,208,0.9)]">QUERO TRANSFORMAR MINHA VIDA AGORA</Button>
            <div className="mt-8 flex justify-center items-center gap-3"><ShieldCheck className="w-6 h-6 text-gray-500 flex-shrink-0" /><p className="text-sm text-gray-500">Garantia de 7 Dias. Risco Absolutamente Zero.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;