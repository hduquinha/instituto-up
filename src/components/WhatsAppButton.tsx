// src/components/WhatsAppButton.tsx

import React from 'react';
// Importando a SUA imagem da pasta assets
import whatsappLogo from '@/assets/wwplogo.png'; 

const WhatsAppButton = () => {
  const phoneNumber = "5513997832766"; // +55 (Brasil) 13 (DDD) 99783-2766
  const message = "quero saber sobre o encontro online";
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    // 'group' é uma classe Tailwind para que o tooltip apareça ao passar o mouse sobre este div
    <div className="fixed bottom-6 right-6 z-50 group">
      
      {/* Balão de texto (Tooltip) */}
      <div className="absolute right-0 bottom-full mb-2 w-max bg-black text-white text-sm px-4 py-2 rounded-md shadow-lg
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out
                    origin-bottom-right pointer-events-none"> {/* 'pointer-events-none' evita que o tooltip bloqueie cliques */}
        Fale Conosco!
        {/* Este div cria a pontinha do balão */}
        <div className="absolute right-4 -bottom-1 w-2 h-2 bg-black transform rotate-45"></div>
      </div>

      {/* Botão Principal (o link clicável) */}
      <a
        href={whatsappLink}
        target="_blank" // Abre em uma nova aba
        rel="noopener noreferrer" // Segurança para links externos
        className="relative bg-[#25D366] w-16 h-16 rounded-full flex items-center justify-center shadow-2xl
                   transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-[#128C7E]
                   animate-pulse-whatsapp" // <-- AQUI aplicamos a classe da animação de pulso
        aria-label="Fale conosco pelo WhatsApp" // Boa prática de acessibilidade
      >
        <img 
          src={whatsappLogo} 
          alt="WhatsApp" 
          className="w-full h-full object-contain rounded-full" // Garante que a imagem preencha o container do botão
        />
      </a>
    </div>
  );
};

export default WhatsAppButton;