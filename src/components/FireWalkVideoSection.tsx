const FireWalkVideoSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-orange-900/20 via-red-900/20 to-black py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="relative z-10 container max-w-5xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-3 bg-orange-500/20 rounded-full px-8 py-4 mb-6">
            <span className="text-3xl">🔥</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-orange-400 uppercase tracking-wider">
              FIRE WALK EM AÇÃO
            </h2>
            <span className="text-3xl">🔥</span>
          </div>
          
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Veja como é a experiência transformadora que vai quebrar suas crenças limitantes e ativar seu potencial máximo. 
            Uma caminhada sobre brasas que vai reprogramar sua mente para o sucesso.
          </p>
        </div>
        
        <div 
          className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/20 border-2 border-orange-500/30 mb-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/fire-walk-video-id"
            title="Fire Walk - Experiência Transformadora"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        
        <div 
          className="grid md:grid-cols-3 gap-8"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="bg-black/50 rounded-xl p-6 border border-orange-500/30 text-center">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-bold text-orange-400 mb-3">Quebra de Crenças</h3>
            <p className="text-white text-base">
              O momento exato em que você percebe que seus limites são apenas construções mentais. 
              Uma experiência que reprograma sua mente instantaneamente.
            </p>
          </div>
          
          <div className="bg-black/50 rounded-xl p-6 border border-orange-500/30 text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-orange-400 mb-3">Estado de Excelência</h3>
            <p className="text-white text-base">
              Acesse um estado emocional de máxima confiança e determinação. 
              Sinta na pele o que é ter controle total sobre suas emoções.
            </p>
          </div>
          
          <div className="bg-black/50 rounded-xl p-6 border border-orange-500/30 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-orange-400 mb-3">Transformação Instantânea</h3>
            <p className="text-white text-base">
              Uma mudança tão profunda que você sairá dali sabendo que pode conquistar 
              qualquer objetivo que se propuser na vida.
            </p>
          </div>
        </div>
        
        <div 
          className="mt-12 bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-2xl p-8 border border-orange-500/30 text-center"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            🔥 TODO MUNDO CONSEGUE PASSAR NO FIRE WALK
          </h3>
          <p className="text-white max-w-3xl mx-auto text-base">
            Esta experiência é 100% segura e TODOS os participantes conseguem completar o Fire Walk com sucesso. 
            Nossa metodologia prepara você mental e emocionalmente para quebrar seus limites e ter esta experiência transformadora única.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FireWalkVideoSection;