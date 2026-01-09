import { MapPin, Clock } from "lucide-react";

const LocationSection = () => {
  return (
    <section className="relative bg-gray-900 py-20 px-4 sm:px-6 overflow-hidden">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wider">
            Local do <span className="text-turquoise">Evento</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-400">
            Um ambiente inspirador para sua transformação completa.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Informações do Hotel */}
          <div className="space-y-6" data-aos="fade-right">
            <div className="bg-black/50 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <MapPin className="h-6 w-6 text-turquoise" />
                São Paulo - SP
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-turquoise mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold">Endereço</p>
                    <p className="text-gray-400">Rua Abílio Soares, 245 – Bairro Paraíso</p>
                    <p className="text-gray-400">São Paulo - SP</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-turquoise mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold">Data e Horário do Evento</p>
                    <p className="text-gray-400">17 e 18 de Janeiro de 2026</p>
                    <p className="text-gray-400">Sábado: 6:59h às 20:59h</p>
                    <p className="text-gray-400">Domingo: 8:59h às 18:59h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mapa Embed */}
          <div className="relative" data-aos="fade-left">
            <div className="bg-black/50 rounded-2xl p-6 border border-gray-800">
              <h4 className="text-xl font-bold text-white mb-4">Localização no Mapa</h4>
              <div className="relative rounded-lg overflow-hidden aspect-video">
                <iframe
                  src="https://www.google.com/maps?q=Rua%20Ab%C3%ADlio%20Soares%2C%20245%20-%20Para%C3%ADso%2C%20S%C3%A3o%20Paulo%20-%20SP&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <a
                  href="https://maps.google.com/?q=Rua+Ab%C3%ADlio+Soares,+245+-+Para%C3%ADso,+S%C3%A3o+Paulo+-+SP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-turquoise hover:bg-turquoise/90 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  <MapPin className="h-5 w-5" />
                  Abrir no Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;