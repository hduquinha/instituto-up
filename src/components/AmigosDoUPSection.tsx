import React from 'react';
import rodrigoImg from '@/assets/rodrigo-damaceno.jpg';
import vanessaImg from '@/assets/vanessa-vaz.jpg';

const AmigosDoUPSection: React.FC = () => {
  // Build ~100 drifting bubbles distributed across lanes to create spacing
  const lanes = 12; // vertical tracks
  const perLane = 7; // ~84 total (mais espaço)
  const motions = ['lr', 'rl', 'd1', 'd2'] as const;
  let idx = 0;
  const items = Array.from({ length: lanes }).flatMap((_, lane) => {
    const rowBase = ((lane + 1) / (lanes + 1)) * 100; // evenly spaced rows
    return Array.from({ length: perLane }).map(() => {
      const i = idx++;
      const img = i % 2 === 0 ? rodrigoImg : vanessaImg;
      const motion = motions[i % motions.length];
  const size = 52 + Math.round(Math.random() * 28); // 52px a 80px (bolas maiores)
      const duration = 35 + Math.random() * 40; // 35s a 75s (mais lento)
      const delay = -Math.random() * duration; // fase aleatória
      const jitter = (Math.random() - 0.5) * 6; // ±3% para evitar linhas perfeitas
      const row = Math.min(96, Math.max(4, rowBase + jitter));
      const z = size; // bolhas maiores sobrepõem
      return { i, img, motion, size, duration, delay, row, z };
    });
  });

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container-responsive">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Amigos do <span className="text-turquoise">UP</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Quem já está junto nessa jornada</p>
        </div>

        <div className="relative mx-auto min-h-[60vh] sm:min-h-[70vh] max-w-5xl overflow-hidden rounded-3xl border border-turquoise/30 bg-white/10 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          {/* aquarium glass effects */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/20" />
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 via-transparent to-white/10" />
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[120%] h-44 rounded-full bg-white/15 blur-3xl" />

          {items.map(({ i, img, motion, size, duration, delay, row, z }) => (
            <div
              key={i}
              className={`drift ${motion}`}
              style={{
                top: `${row}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                zIndex: z,
              }}
            >
              <img
                src={img}
                alt={i % 2 === 0 ? 'Rodrigo Damaceno' : 'Vanessa Vaz'}
                style={{ ['--size' as any]: `${size}px` }}
                className="bubble-img"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmigosDoUPSection;
