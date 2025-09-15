import React, { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";

// Helper to find the next Wednesday at 19:29 local time
function getNextWorkshopDate(): Date {
  const now = new Date();
  const target = new Date(now);

  // 0=Sun ... 3=Wed
  const todayDow = now.getDay();
  const wed = 3;
  let addDays = (wed - todayDow + 7) % 7; // days until next Wednesday

  target.setDate(now.getDate() + addDays);
  target.setHours(19, 29, 0, 0); // 19:29

  // If today is Wednesday but it's already past 19:29, go to next week
  if (addDays === 0 && target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 7);
  }

  return target;
}

function formatDuration(ms: number) {
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  const sec = Math.floor(ms / 1000);
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return { d, h, m, s };
}

const WorkshopHero: React.FC = () => {
  const workshopLink = import.meta.env.VITE_WORKSHOP_LINK || "#";
  const startDate = useMemo(() => getNextWorkshopDate(), []);
  const endDate = useMemo(() => {
    const d = new Date(startDate);
    d.setHours(21, 29, 0, 0); // 21:29 end time
    return d;
  }, [startDate]);

  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeToStart = startDate.getTime() - now.getTime();
  const countdown = formatDuration(timeToStart);
  const isLiveWindow = now >= startDate && now <= endDate;

  // Format date label e.g., "Quarta • 19:29–21:29"
  const weekday = startDate.toLocaleDateString("pt-BR", { weekday: "long" });
  const dateStr = startDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 text-white">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#ffffff33,transparent_40%),radial-gradient(circle_at_80%_0%,#ffffff22,transparent_40%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide ring-1 ring-white/20">
              Workshop gratuito • Online e ao vivo
            </span>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              Domine o básico que gera resultado em Marketing Digital
            </h1>

            <p className="mt-4 text-white/90 sm:text-lg">
              Aulas ao vivo, zero enrolação. Em 2 horas você sai com um plano prático para aplicar no mesmo dia.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-indigo-100/90">
              <div className="rounded-md bg-indigo-700/40 px-3 py-2 ring-1 ring-white/10">
                <strong className="uppercase">Quando</strong>: {weekday.charAt(0).toUpperCase() + weekday.slice(1)} • {dateStr} • 19:29–21:29
              </div>
              <div className="rounded-md bg-indigo-700/40 px-3 py-2 ring-1 ring-white/10">
                Certificado de participação
              </div>
              <div className="rounded-md bg-indigo-700/40 px-3 py-2 ring-1 ring-white/10">
                Materiais para implementar
              </div>
            </div>

            <div className="mt-8 grid w-full max-w-md grid-cols-4 gap-2 rounded-xl bg-black/20 p-4 ring-1 ring-white/10">
              {isLiveWindow ? (
                <div className="col-span-4 text-center text-green-300">AO VIVO AGORA — entre já</div>
              ) : (
                <>
                  <TimeBox label="Dias" value={countdown.d} />
                  <TimeBox label="Horas" value={countdown.h} />
                  <TimeBox label="Min" value={countdown.m} />
                  <TimeBox label="Seg" value={countdown.s} />
                </>
              )}
            </div>

            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 rounded-lg bg-emerald-500 px-6 text-base font-semibold text-emerald-950 hover:bg-emerald-400"
                onClick={() => window.open(workshopLink, "_blank")}
              >
                Quero minha vaga gratuita
              </Button>
              <p className="text-sm text-white/70">Vagas limitadas • Envio do link no e-mail</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <ul className="space-y-3 text-white/90">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-emerald-400" />
                O método simples para atrair clientes sem gastar uma fortuna
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-emerald-400" />
                Erros que travam o seu crescimento — e como evitar já
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-emerald-400" />
                Plano de 7 dias para aplicar e validar
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-emerald-400" />
                Ao final: espaço para perguntas e respostas ao vivo
              </li>
            </ul>

            <div className="mt-6 rounded-lg bg-black/30 p-4 text-sm text-white/70 ring-1 ring-white/10">
              Após se inscrever, você recebe no e-mail o link da sala e um lembrete automático próximo ao horário.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TimeBox: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="flex flex-col items-center justify-center rounded-lg bg-black/30 p-3 ring-1 ring-white/10">
    <div className="text-2xl font-semibold tabular-nums">{value.toString().padStart(2, "0")}</div>
    <div className="text-xs uppercase tracking-wide text-white/70">{label}</div>
  </div>
);

export default WorkshopHero;
