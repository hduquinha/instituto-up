const VideoSection = () => {
  return (
    <section className="bg-background py-20 px-6">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
          Assista e descubra como nosso método vai{" "}
          <span className="text-turquoise">impulsionar sua jornada</span>
        </h2>
        
        <div className="relative bg-dark-section rounded-lg overflow-hidden shadow-2xl max-w-3xl mx-auto">
          <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-dark-bg to-dark-section">
            <div className="text-center">
              <div className="w-20 h-20 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-turquoise-light transition-colors">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="text-text-light text-lg">Clique para assistir o vídeo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;