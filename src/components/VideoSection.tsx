const VideoSection = () => {
  return (
    <section id="video" className="bg-background py-20 px-4 sm:px-6">
      <div className="container max-w-6xl mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
          data-aos="fade-up"
        >
          Gerenciamento Emocional começa entendendo seus <span className="text-turquoise">padrões automáticos</span>
        </h2>

        <p
          className="max-w-3xl mx-auto text-lg text-text-muted mb-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Antes de transformar desempenho, você precisa reconhecer como reage a pressão, conflito e gatilhos noturnos que atrapalham o sono.
          Assista aos curtas e perceba onde você está hoje — e para onde pode ir aplicando gerenciamento emocional.
        </p>

        <div className="grid gap-6 md:grid-cols-2" data-aos="fade-up" data-aos-delay="150">
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl border border-turquoise/20 shadow-2xl shadow-black/40">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/jN-BLERtwHw"
              title="Short 1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl border border-turquoise/20 shadow-2xl shadow-black/40">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/tBvypDV_oRM"
              title="Short 2"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;