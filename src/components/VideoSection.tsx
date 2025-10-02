const VideoSection = () => {
  return (
    <section className="bg-background py-20 px-4 sm:px-6">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
          data-aos="fade-up"
        >
          Existe um <span className="text-turquoise">Padrão Invisível</span> Ditando Seus Resultados
        </h2>
        
        <p 
          className="max-w-2xl mx-auto text-lg text-text-muted mb-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Muitas vezes, não é a falta de esforço que nos impede de avançar, mas sim padrões emocionais que agem no piloto automático. Aperte o play e veja como identificar — e quebrar — o seu.
        </p>
        
        <div 
          className="relative aspect-video rounded-lg overflow-hidden shadow-2xl shadow-black/40 border border-turquoise/20"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/GeN0D-916Rg"
            title="Vídeo Explicativo sobre o Treinamento"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;