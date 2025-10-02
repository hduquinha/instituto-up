const VideoSection = () => {
  return (
    <section className="bg-background py-20 px-4 sm:px-6">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
          data-aos="fade-up"
        >
          <span className="text-turquoise">Acompanhamento Pós-Treinamento</span> para Resultados Duradouros
        </h2>
        
        <p 
          className="max-w-2xl mx-auto text-lg text-text-muted mb-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Sua transformação não termina no evento. Oferecemos acompanhamento completo para garantir que você mantenha e amplifique os resultados conquistados no Fire Walk e nos 4 pilares.
        </p>
        
        <div 
          className="relative aspect-video rounded-lg overflow-hidden shadow-2xl shadow-black/40 border border-turquoise/20"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/GeN0D-916Rg"
            title="Acompanhamento Pós-Treinamento"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        
        {/* Seção de Benefícios do Acompanhamento */}
        <div 
          className="mt-16 grid md:grid-cols-3 gap-8"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="bg-gray-900/50 rounded-xl p-6 border border-turquoise/20">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-3">Acesso às Gravações</h3>
            <p className="text-gray-400">
              6 meses de acesso completo às gravações do treinamento para revisar e consolidar o aprendizado sempre que precisar.
            </p>
          </div>
          
          <div className="bg-gray-900/50 rounded-xl p-6 border border-turquoise/20">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-white mb-3">Comunidade Exclusiva</h3>
            <p className="text-gray-400">
              Grupo privado com outros participantes para trocar experiências, dúvidas e manter a motivação em alta.
            </p>
          </div>
          
          <div className="bg-gray-900/50 rounded-xl p-6 border border-turquoise/20">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-3">Suporte Contínuo</h3>
            <p className="text-gray-400">
              Orientações e direcionamentos para aplicar as técnicas aprendidas no seu dia a dia e carreira profissional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;