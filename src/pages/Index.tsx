import React from 'react';
import WorkshopHero from "@/components/WorkshopHero";
import ForWhoSection from "@/components/ForWhoSection";
import TrainersSection from "@/components/TrainersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    // Usamos um Fragment (<>...</>) para agrupar os dois elementos
    <>
      <div className="min-h-screen">
        <WorkshopHero />
        <ForWhoSection />
        <TrainersSection />
        <TestimonialsSection />
      </div>
      
      {/* O Botão agora está FORA da div principal */}
      <WhatsAppButton />
    </>
  );
};

export default Index;