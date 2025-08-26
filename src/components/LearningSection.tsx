import { CheckCircle, XCircle } from "lucide-react";

const BenefitsSection = () => {
  return (
    // Fundo alterado para um tom de "quase preto" para diferenciação sutil
    <section className="relative bg-gray-950 py-20 px-4 sm:px-6">
      <div className="absolute inset-0 flex justify-center items-center opacity-50">
        <div className="w-[1000px] h-[1000px] bg-turquoise/5 rounded-full blur-[175px]"></div>
      </div>

      <div className="relative z-10 container max-w-6xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wider">
            Sua <span className="text-turquoise">Decisão</span>, Seu <span className="text-turquoise">Futuro</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-400">
            Existem dois caminhos à sua frente. Veja claramente o que você ganha ao agir e o que arrisca ao ficar parado.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Coluna dos Malefícios (O Caminho da Inércia) */}
          <div 
            className="bg-[#111] rounded-xl border border-gray-800 p-8 flex flex-col h-full"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="flex items-center gap-4 mb-6">
              <XCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
              <h3 className="text-2xl font-bold text-white">O Custo de Não Agir</h3>
            </div>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1 font-bold">»</span>
                <span>Continuar refém da ansiedade e do estresse que sabotam seu potencial.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1 font-bold">»</span>
                <span>Deixar que reações emocionais automáticas ditem suas decisões importantes.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1 font-bold">»</span>
                <span>Permanecer no ciclo da procrastinação, adiando os resultados que você tanto deseja.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1 font-bold">»</span>
                <span>Ver seus relacionamentos se desgastarem por falhas na comunicação.</span>
              </li>
            </ul>
          </div>

          {/* Coluna dos Benefícios (O Caminho da Transformação) */}
          <div 
            className="bg-dark-section rounded-xl border border-turquoise/50 p-8 flex flex-col h-full shadow-2xl shadow-turquoise/10"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="flex items-center gap-4 mb-6">
              <CheckCircle className="w-8 h-8 text-turquoise flex-shrink-0" />
              <h3 className="text-2xl font-bold text-white">O Poder da Ação</h3>
            </div>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-turquoise mt-1 font-bold">✓</span>
                <span><strong className="text-white">Assumir o controle das suas emoções</strong>, transformando-as em sua maior força.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-turquoise mt-1 font-bold">✓</span>
                <span><strong className="text-white">Comunicar-se com clareza e assertividade</strong>, construindo relações mais fortes.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-turquoise mt-1 font-bold">✓</span>
                <span><strong className="text-white">Desenvolver foco e disciplina</strong> para executar seus planos e alcançar metas.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-turquoise mt-1 font-bold">✓</span>
                <span><strong className="text-white">Reduzir drasticamente a ansiedade</strong>, ganhando mais paz mental e confiança.</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;