import { MapPin, Phone, Clock } from "lucide-react";

const LocationSection = () => {
  return (
    <section className="relative bg-gray-900 py-20 px-4 sm:px-6 overflow-hidden">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wider">
            Local do <span className="text-turquoise">Evento</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-400">
            Um ambiente premium e inspirador para sua transformação completa.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Informações do Hotel */}
          <div className="space-y-6" data-aos="fade-right">
            <div className="bg-black/50 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <MapPin className="h-6 w-6 text-turquoise" />
                Lito Palace Hotel
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-turquoise mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold">Endereço</p>
                    <p className="text-gray-400">Lito Palace Hotel</p>
                    <p className="text-gray-400">Registro - São Paulo, SP</p>
                    <p className="text-gray-400">Vale do Ribeira</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-turquoise mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold">Contato do Hotel</p>
                    <p className="text-gray-400">(13) 3821-1000</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-turquoise mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold">Data e Horário do Evento</p>
                    <p className="text-gray-400">25 de Outubro de 2025</p>
                    <p className="text-gray-400">Das 7h às 21h (14 horas intensivas)</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Comodidades do Hotel */}
            <div className="bg-black/50 rounded-2xl p-6 border border-gray-800">
              <h4 className="text-xl font-bold text-white mb-4">Comodidades Incluídas</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-turquoise rounded-full"></span>
                  Coffee breaks premium
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-turquoise rounded-full"></span>
                  Coffee breaks premium
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-turquoise rounded-full"></span>
                  Wi-Fi de alta velocidade
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-turquoise rounded-full"></span>
                  Ar-condicionado
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-turquoise rounded-full"></span>
                  Equipamentos audiovisuais
                </li>
              </ul>
            </div>
          </div>
          
          {/* Mapa Embed */}
          <div className="relative" data-aos="fade-left">
            <div className="bg-black/50 rounded-2xl p-6 border border-gray-800">
              <h4 className="text-xl font-bold text-white mb-4">Localização no Mapa</h4>
              <div className="relative rounded-lg overflow-hidden aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3645.8992!2d-47.8438!3d-24.4869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94db1c4a2c23456!2sRegistro%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1635789012345!5m2!1spt-BR!2sbr"
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
                  href="https://maps.google.com/?q=Lito+Palace+Hotel+Registro+SP"
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