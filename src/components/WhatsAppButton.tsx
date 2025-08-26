import React from 'react';
import whatsappLogo from '@/assets/whatsapp-logo.png';

const WhatsAppButton = () => {
  const phoneNumber = "5511999999999"; // Altere para seu número
  const message = "Olá! Tenho interesse no treinamento e gostaria de mais informações.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 ease-in-out hover:scale-110"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <img 
        src={whatsappLogo} 
        alt="WhatsApp" 
        className="w-14 h-14 rounded-full"
      />
    </a>
  );
};

export default WhatsAppButton;