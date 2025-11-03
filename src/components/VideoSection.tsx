const VideoSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-black via-slate-950 to-orange-900/20 py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-orange-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-turquoise/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
          <div className="text-left space-y-6" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-turquoise">
              Experimente antes da imersão
            </span>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Uma prévia do que você vai viver no <span className="text-turquoise">Firewalking</span>
            </h2>

            <p className="text-lg text-gray-300">
              Assista e entenda como preparamos você emocionalmente para desafiar o impossível. O Firewalking é o ápice do treinamento de Comunicação e Liderança — e este vídeo mostra exatamente como você chegará pronto para atravessar as brasas com segurança e confiança.
            </p>

            <ul className="space-y-5 text-gray-300">
              <li className="flex gap-4">
                <span className="text-3xl" role="img" aria-label="Ícone fogo">🔥</span>
                <div>
                  <h3 className="text-xl font-semibold text-white">Mentalidade inabalável</h3>
                  <p className="text-sm sm:text-base text-gray-400">
                    Descubra as técnicas que usamos para reprogramar crenças limitantes e colocar você em estado de ação imediata.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-3xl" role="img" aria-label="Ícone bússola">🧭</span>
                <div>
                  <h3 className="text-xl font-semibold text-white">Liderança na prática</h3>
                  <p className="text-sm sm:text-base text-gray-400">
                    Veja como cada dinâmica da imersão foi pensada para elevar sua comunicação e sua capacidade de liderar pessoas sob pressão.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-3xl" role="img" aria-label="Ícone escudo">🛡️</span>
                <div>
                  <h3 className="text-xl font-semibold text-white">Firewalking com segurança</h3>
                  <p className="text-sm sm:text-base text-gray-400">
                    Entenda passo a passo como guiamos você até o momento da travessia — todas as pessoas concluem o Firewalking com sucesso.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex justify-center" data-aos="fade-up" data-aos-delay="150">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[420px]">
              <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-[40px] bg-gradient-to-br from-orange-500/40 to-turquoise/30 blur-3xl opacity-60" />
              <div className="relative rounded-[36px] border border-white/15 bg-black/80 p-4 shadow-[0_25px_80px_rgba(255,140,0,0.35)]">
                <div
                  className="relative w-full overflow-hidden rounded-[28px] border border-white/10"
                  style={{ aspectRatio: "9 / 16" }}
                >
                  <iframe
                    className="h-full w-full"
                    src="https://www.instagram.com/reel/DQUz2r-CbdJ/embed"
                    title="Prévia do treinamento Comunicação e Liderança - Firewalking"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;