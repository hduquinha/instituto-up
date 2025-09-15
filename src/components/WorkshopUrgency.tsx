import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WorkshopUrgency: React.FC = () => {
  const workshopLink = import.meta.env.VITE_WORKSHOP_LINK || "https://forms.gle/SQZqtPHMAzpgtkVy7";
  const percent = 83; // requested value

  return (
    <section className="relative bg-gradient-to-br from-red-950 via-zinc-950 to-red-900/40 py-16 px-4">
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_20%_20%,#ef444433,transparent_40%),radial-gradient(circle_at_80%_0%,#f59e0b33,transparent_40%)]" />

      <div className="relative mx-auto max-w-4xl rounded-2xl border border-red-500/30 bg-black/40 p-6 backdrop-blur">
        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 ring-1 ring-red-500/40">
            <AlertTriangle className="h-5 w-5 text-red-300" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">Alta demanda — {percent}% das vagas preenchidas</h3>
            <p className="mt-1 text-sm text-white/80">
              As vagas são limitadas para manter a qualidade do workshop ao vivo. Garanta a sua agora e receba o link no e-mail.
            </p>
            <div className="mt-4">
              <div className="h-3 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15">
                <div
                  className="h-3 bg-gradient-to-r from-red-400 to-orange-400"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="mt-1 text-right text-xs text-white/70">{percent}% preenchido</div>
            </div>
            {/* Tópicos que serão abordados */}
            <div className="mt-5 grid gap-2 text-sm text-white/90 sm:grid-cols-2">
              <div className="rounded-md bg-white/5 p-3 ring-1 ring-white/10">Gerenciamento emocional aplicado ao dia a dia</div>
              <div className="rounded-md bg-white/5 p-3 ring-1 ring-white/10">Como lidar com emoções intensas (ansiedade, estresse)</div>
              <div className="rounded-md bg-white/5 p-3 ring-1 ring-white/10">Relacionamentos: comunicação de liderança sem conflitos</div>
              <div className="rounded-md bg-white/5 p-3 ring-1 ring-white/10">Decisões conscientes: clareza, foco e serenidade</div>
              <div className="rounded-md bg-white/5 p-3 ring-1 ring-white/10">Exercício guiado para estrutura de gerenciamento emocional</div>
              <div className="rounded-md bg-white/5 p-3 ring-1 ring-white/10">Dinâmica de alto impacto para consolidar</div>
            </div>

            {/* Preparação */}
            <div className="mt-4 rounded-md bg-amber-500/10 p-3 text-xs text-amber-200 ring-1 ring-amber-400/30">
              Prepare-se: encontre um lugar calmo, traga <strong>papel e caneta</strong> e use <strong>fone de ouvido</strong>.
            </div>

      <div className="mt-5">
              <Button
        className="h-11 w-full sm:w-auto rounded-lg bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                onClick={() => { try { (window as any).fbq && (window as any).fbq('track', 'Lead'); } catch {}; window.open(workshopLink, "_blank"); }}
              >
                Garantir minha vaga gratuita
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopUrgency;
