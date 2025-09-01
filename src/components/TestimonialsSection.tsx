// Importações da biblioteca Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Importação dos estilos da Swiper (essencial)
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TestimonialsSection = () => {
  // Array com 8 depoimentos, agora incluindo uma descrição/quote
  const videoTestimonials = [
    { 
      name: "Ana Carolina Silva", 
      youtubeVideoId: "mXSFwabhyNo",
      description: '"O treinamento mudou minha forma de lidar com o estresse. Essencial!"'
    },
    { 
      name: "Marcus Oliveira", 
      youtubeVideoId: "_l80iApyibg",
      description: '"Aprendi técnicas que uso todos os dias para melhorar meus relacionamentos."'
    },
    { 
      name: "Carla Mendes", 
      youtubeVideoId: "3tmd-ClpJxA",
      description: '"Hoje tenho ferramentas práticas para gerenciar minhas emoções e ter mais confiança."'
    },
    { 
      name: "Rafael Borges", 
      youtubeVideoId: "8SbUC-UaAxE",
      description: '"Um divisor de águas para a minha produtividade e foco. Recomendo demais!"'
    },
    { 
      name: "Juliana Costa", 
      youtubeVideoId: "kJQP7kiw5Fk",
      description: '"Consegui superar bloqueios que me impediam de avançar na carreira."'
    },
    { 
      name: "Fernando Lima", 
      youtubeVideoId: "b-Tains_izY",
      description: '"A comunicação com minha equipe melhorou 100% depois do treinamento."'
    },
    { 
      name: "Patrícia Almeida", 
      youtubeVideoId: "RgKAFK5djSk",
      description: '"Finalmente entendi a raiz da minha ansiedade e aprendi a controlá-la."'
    },
    { 
      name: "Lucas Martins", 
      youtubeVideoId: "fJ9rUzIMcZQ",
      description: '"O impacto na minha vida pessoal e profissional foi simplesmente imensurável."'
    }
  ];

  return (
    <section className="relative bg-black py-20 px-4 sm:px-6 overflow-hidden">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wider">
            Transformações <span className="text-turquoise">Reais, em Vídeo</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-400">
            Nossos alunos não apenas falam sobre a mudança, eles a mostram. Deslize para ver mais histórias de sucesso.
          </p>
        </div>
        
        <div 
          className="relative"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { // sm
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: { // lg
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="pb-16"
          >
            {videoTestimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col h-full items-center">
                  
                  {/* Container com aspect ratio de vídeo VERTICAL (9:16) */}
                  <div className="w-full max-w-[300px] aspect-[9/16] rounded-lg overflow-hidden border border-gray-800">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${testimonial.youtubeVideoId}`}
                      title={`Depoimento de ${testimonial.name}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                  
                  {/* Nome e Descrição abaixo do vídeo */}
                  <div className="text-center mt-4 w-full max-w-[300px]">
                    <p className="font-bold text-white text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-turquoise italic text-sm mt-1">
                      {testimonial.description}
                    </p>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;