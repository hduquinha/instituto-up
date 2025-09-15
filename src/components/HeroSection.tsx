import { Button } from "@/components/ui/button";
import { ChevronDown, CalendarDays } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  const scrollToVideo = () => {
    const section = document.getElementById("video");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const workshopLink = ((import.meta as any).env?.VITE_WORKSHOP_LINK as string | undefined) || "https://forms.gle/SQZqtPHMAzpgtkVy7";
  const handleCta = () => {
    try { (window as any).fbq && (window as any).fbq('track', 'Lead'); } catch {}
    if (workshopLink && workshopLink !== "#") {
      window.open(workshopLink, "_blank");
    } else {
      scrollToVideo();
    }
  };

  return (
    <section
      className="relative min-h-[100svh] flex items-end md:items-center justify-end md:justify-center px-4 sm:px-6 pb-24 pt-10 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />

      <div className="relative z-10 container mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-white/15">
            Workshop gratuito • Ao vivo
          </div>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Gerenciamento Emocional aplicado em <span className="text-turquoise">Emoções, Relacionamentos e Finanças</span>
          </h1>

          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full bg-turquoise/10 px-3 py-1 text-xs font-semibold text-turquoise ring-1 ring-turquoise/30">Emoções</span>
            <span className="rounded-full bg-turquoise/10 px-3 py-1 text-xs font-semibold text-turquoise ring-1 ring-turquoise/30">Relacionamentos</span>
          </div>

          <p className="mt-4 text-white/90 sm:text-lg">
            Nesta quarta, 19:29–21:29. Desenvolva gerenciamento emocional para gerenciar suas reações,
            fortalecer relacionamentos com comunicação de liderança e tomar decisões com mais
            clareza e consistência.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-turquoise/10 px-4 py-2 ring-1 ring-turquoise/30">
            <CalendarDays className="h-5 w-5 text-turquoise" />
            <span className="text-sm font-semibold text-white">Quarta • 19:29–21:29 • Online e gratuito</span>
          </div>

          <ul className="mx-auto mt-6 grid max-w-2xl gap-2 text-left text-white/90 sm:grid-cols-2">
            <li className="rounded-md bg-white/5 p-3 ring-1 ring-white/10">Exercício guiado para gerir estados emocionais</li>
            <li className="rounded-md bg-white/5 p-3 ring-1 ring-white/10">Dinâmica de alto impacto</li>
            <li className="rounded-md bg-white/5 p-3 ring-1 ring-white/10">Comunicação de liderança sem conflitos</li>
            <li className="rounded-md bg-white/5 p-3 ring-1 ring-white/10">Decisões com foco e estabilidade</li>
          </ul>

      <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button
              variant="cta"
              size="lg"
        className="h-12 w-full sm:w-auto rounded-lg px-6 text-base font-semibold"
              onClick={handleCta}
            >
              Garantir minha vaga gratuita
            </Button>
            <Button
              variant="secondary"
              size="lg"
        className="h-12 w-full sm:w-auto rounded-lg px-6 text-base font-semibold"
              onClick={() => {
                const el = document.getElementById('video');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ver 1 min do conteúdo
            </Button>
          </div>

          <div className="mx-auto mt-4 max-w-xl rounded-lg border border-white/10 bg-black/40 p-3 text-xs sm:text-sm text-gray-300">
            Para aproveitar ao máximo: encontre um lugar calmo, tenha <strong>papel e caneta</strong> e use
            <strong> fone de ouvido</strong>.
          </div>
        </div>
      </div>

      {/* Indicador de scroll centralizado */}
      <button
        onClick={scrollToVideo}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-gray-300/90 hover:text-white transition text-center"
        aria-label="Descer para vídeo"
      >
        <span className="text-xs sm:text-sm font-semibold mb-1">
          Descubra o caminho para a mudança
        </span>
        <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 animate-bounce text-turquoise" />
      </button>
    </section>
  );
};

export default HeroSection;
