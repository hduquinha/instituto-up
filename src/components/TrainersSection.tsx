import rodrigoImage from "@/assets/rodrigo-damaceno.jpg";
import vanessaImage from "@/assets/vanessa-vaz.jpg";
import { Star } from "lucide-react"; // Ícones para destacar

// Defina a cor turquesa em um só lugar para facilitar a manutenção
const turquoiseColor = "#40E0D0"; // Cor turquesa vibrante

const TrainersSection = () => {
  return (
    <section className="relative bg-black py-20 px-4 sm:px-6 overflow-hidden">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wider">
            OS ESPECIALISTAS DA SUA <span style={{ color: turquoiseColor }}>TRANSFORMAÇÃO</span>
          </h2>
        </div>

        {/* --- Card Principal: Rodrigo Damaceno --- */}
        <div 
          className="relative bg-[#111] rounded-xl border border-gray-800 shadow-2xl shadow-black/50 p-6 md:p-0"
          data-aos="fade-up"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Imagem do Rodrigo (com efeito de sobreposição) */}
            <div className="relative md:-mb-10 md:-mt-10 md:ml-4 flex justify-center">
              <img
                src={rodrigoImage}
                alt="Rodrigo Damaceno"
                className="w-full max-w-sm h-auto object-cover rounded-xl shadow-2xl shadow-black/50 aspect-[4/5] z-10"
              />
            </div>
            
            {/* Descrição e Qualificações do Rodrigo */}
            <div className="text-center md:text-left py-8 px-4">
              <h3 
                className="text-4xl font-bold uppercase tracking-wide" 
                style={{ color: turquoiseColor }}
              >
                Rodrigo Damaceno
              </h3>
              <p className="text-white font-semibold text-xl mt-1 mb-6">
                Treinador Comportamental Principal
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                Fundador do Instituto UP e especialista em destravar o potencial humano, Rodrigo será seu guia direto nesta imersão, compartilhando as ferramentas que já impactaram milhares de vidas.
              </p>
              
              <div className="border-t border-gray-700 pt-6">
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center gap-3">
                    <Star style={{ color: turquoiseColor }} className="h-6 w-6 flex-shrink-0" />
                    <span><strong className="text-white">+10.000 Vidas Impactadas</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Star style={{ color: turquoiseColor }} className="h-6 w-6 flex-shrink-0" />
                    <span>Mentor de Alta Performance para <strong className="text-white">Líderes e Executivos</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Star style={{ color: turquoiseColor }} className="h-6 w-6 flex-shrink-0" />
                    <span>Especialista em <strong className="text-white">Inteligência Emocional e PNL</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* --- Card de Suporte: Vanessa Vaz --- */}
        <div className="mt-20 text-center" data-aos="fade-up">
          <h4 className="text-xl font-bold text-white mb-8 uppercase tracking-wider">
            Com o Suporte de uma Equipe de <span style={{ color: turquoiseColor }}>Elite</span>
          </h4>
          
          <div className="max-w-3xl mx-auto bg-[#111] rounded-xl border border-gray-800 shadow-xl shadow-black/30 p-6 flex flex-col sm:flex-row items-center gap-6">
            <img
              src={vanessaImage}
              alt="Vanessa Vaz"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-700"
            />
            <div className="text-center sm:text-left">
              <h5 className="text-2xl font-bold text-white">Vanessa Vaz</h5>
              <p style={{ color: turquoiseColor }} className="font-semibold mb-3">Coordenadora & Suporte ao Aluno</p>
              <p className="text-gray-400 text-sm">
                Como Co-fundadora do Instituto UP e especialista em TCC, Vanessa garante que sua experiência seja impecável, gerenciando a organização para que sua única preocupação seja a sua evolução.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;