import React from 'react';
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrainersSection from "@/components/TrainersSection";
import TrainingContentSection from "@/components/TrainingContentSection";
import FireWalkVideoSection from "@/components/FireWalkVideoSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    // Usamos um Fragment (<>...</>) para agrupar os dois elementos
    <>
      <div className="min-h-screen">
        <HeroSection />
        <VideoSection />
        <TestimonialsSection />
        <TrainersSection />
        <TrainingContentSection />
        <FireWalkVideoSection />
        <PricingSection />
        <FAQSection />
        <FinalCtaSection />
      </div>
      
      {/* O Botão agora está FORA da div principal */}
      <WhatsAppButton />
    </>
  );
};

export default Index;