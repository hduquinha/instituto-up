// Importações da biblioteca Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Importação dos estilos da Swiper (essencial)
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TestimonialsSection = () => {
  // Array com depoimentos e descrições fiéis ao conteúdo dos vídeos
  const videoTestimonials = [
    { 
      name: "Jhonata Lopes", 
      youtubeVideoId: "mXSFwabhyNo",
      description: '"O treinamento foi um divisor de águas, me dando clareza e ferramentas para alcançar resultados que eu buscava há muito tempo."'
    },
    { 
      name: "Jociely Ribeiro", 
      youtubeVideoId: "Xmft6_Eg-20",
      description: '"Eu me redescobri. O curso me ajudou a derrubar uma muralha de medo e a encontrar a grandeza que existe dentro de mim."'
    },
    { 
      name: "Ana Nere", 
      youtubeVideoId: "_l80iApyibg",
      description: '"Foi uma jornada de crescimento imenso. Aprendi a ressignificar minha história e a ver a vida com muito mais gratidão e propósito."'
    },
    { 
      name: "Jorge Florêncio", 
      youtubeVideoId: "afrfoLPQFl0",
      description: '"Eu me sentia travado, sem sair do lugar. O curso foi a experiência transformadora que me fez quebrar barreiras internas e evoluir."'
    },
    { 
      name: "Letícia Chagas", 
      youtubeVideoId: "b1FLpd-LKnA",
      description: '"Mais do que um curso, foi um processo de autoconhecimento profundo que me reconectou com a minha verdadeira essência e força."'
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