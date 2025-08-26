// src/components/WhatsAppButton.jsx

import React from 'react';

// O ícone do WhatsApp em formato SVG, para não precisar de bibliotecas externas.
const WhatsAppIcon = () => (
  <svg
    height="32px"
    width="32px"
    viewBox="0 0 128 128"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m113.2 96.3c-2.4-1.2-14-6.9-16.2-7.7-2.2-0.8-3.8-1.2-5.4 1.2s-6.1 7.7-7.5 9.2c-1.4 1.5-2.8 1.7-5.2 0.5-2.4-1.2-10.2-3.8-19.4-12-7.2-6.4-12-14.4-13.4-16.8-1.4-2.4-0.1-3.7 1.1-5s2.2-2.5 3.3-3.8c1.1-1.2 1.4-2 2-3.3 0.6-1.2 0.3-2.4-0.3-3.6s-5.4-12.9-7.4-17.7c-2-4.8-4-4.1-5.4-4.2-1.3-0.1-2.8-0.1-4.4-0.1s-4.3 0.6-6.5 3c-2.2 2.4-8.6 8.4-8.6 20.4s8.8 23.7 10 25.4c1.2 1.7 17.3 26.4 42.8 37.8 6.1 2.7 11 4.3 14.8 5.5 8.1 2.6 15.5 2.2 21.2-1.4 6.4-3.9 10.3-9.5 11.8-14.4 1.5-4.9 1.5-9.1 1-9.9-0.5-0.8-1.9-1.4-4.3-2.6z"
      fill="#ffffff"
    />
    <path
      d="m64 0c-35.3 0-64 28.7-64 64s28.7 64 64 64 64-28.7 64-64-28.7-64-64-64zm0 122c-32 0-58-26-58-58s26-58 58-58 58 26 58 58-26 58-58 58z"
      fill="#ffffff"
    />
  </svg>
);


const WhatsAppButton = () => {
  // ⚠️ MUDE AQUI: Coloque seu número de telefone com o código do país e DDD.
  // Exemplo para São Paulo: 5511999999999
  const phoneNumber = "5513999999999"; 

  // Mensagem padrão opcional que o usuário enviará.
  const message = "Olá! Tenho interesse no treinamento e gostaria de mais informações.";
  
  // Codifica a mensagem para ser usada na URL.
  const encodedMessage = encodeURIComponent(message);

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-[#128C7E]"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
};

export default WhatsAppButton;