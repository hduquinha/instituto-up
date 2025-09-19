import React from 'react';
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import ForWhoSection from "@/components/ForWhoSection";
import TrainersSection from "@/components/TrainersSection";
import LearningSection from "@/components/LearningSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AmigosDoUPSection from "@/components/AmigosDoUPSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import UrgencySection from "@/components/UrgencySection";
import FinalCtaSection from "@/components/FinalCtaSection";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    // Usamos um Fragment (<>...</>) para agrupar os dois elementos
    <>
      <div className="min-h-screen">
        <HeroSection />
        <VideoSection />
        <ForWhoSection />
        <TrainersSection />
        <LearningSection />
    <TestimonialsSection />
    <AmigosDoUPSection />
        <GuaranteeSection />
        <PricingSection />
        <FAQSection />
        <UrgencySection />
        <FinalCtaSection />
      </div>
      
      {/* O Botão agora está FORA da div principal */}
      <WhatsAppButton />
    </>
  );
};

export default Index;