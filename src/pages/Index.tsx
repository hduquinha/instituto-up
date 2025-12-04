import React from 'react';
import HeroSection from "@/components/HeroSection";
import AboutTrainingSection from "@/components/AboutTrainingSection";
import VideoSection from "@/components/VideoSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrainersSection from "@/components/TrainersSection";
import TrainingContentSection from "@/components/TrainingContentSection";
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
        <AboutTrainingSection />
        <VideoSection />
        <TestimonialsSection />
  <TrainersSection />
  <TrainingContentSection />
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