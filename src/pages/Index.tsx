import React from 'react';
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import ForWhoSection from "@/components/ForWhoSection";
import TrainersSection from "@/components/TrainersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import WorkshopUrgency from "@/components/WorkshopUrgency";

const Index = () => {
  return (
    // Usamos um Fragment (<>...</>) para agrupar os dois elementos
    <>
      <div className="min-h-screen">
        <HeroSection />
        <VideoSection />
        <ForWhoSection />
        <TrainersSection />
        <TestimonialsSection />
        <WorkshopUrgency />
      </div>
      
      {/* O Botão agora está FORA da div principal */}
      <WhatsAppButton />
    </>
  );
};

export default Index;