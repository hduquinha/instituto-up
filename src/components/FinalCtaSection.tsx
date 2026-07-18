import { ShieldCheck } from "lucide-react";
import { scrollToInscricao } from "@/components/HeroSection";

const FinalCtaSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-16 sm:px-6 sm:py-20">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-30">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-turquoise/10 blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl">
          Sua <span className="text-turquoise">transformação</span> te espera
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 md:text-xl">
          15 e 16 de Agosto em São Paulo-SP. Garanta sua vaga no 1º lote e leve um acompanhante
          gratuitamente.
        </p>

        <button
          onClick={scrollToInscricao}
          className="mb-6 rounded-2xl bg-gradient-to-r from-turquoise to-blue-500 px-10 py-5 text-lg font-bold text-black shadow-lg transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl md:px-14 md:py-6 md:text-2xl"
        >
          QUERO ME INSCREVER
        </button>

        <div className="flex items-center justify-center gap-3 text-base text-gray-400">
          <ShieldCheck className="h-5 w-5 text-green-400" />
          <span>Garantia de satisfação no dia do evento</span>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-sm text-gray-500 sm:text-base">
            © 2026 Instituto UP. Todos os direitos reservados. |
            <span className="text-turquoise"> Transformando vidas desde 2014</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
