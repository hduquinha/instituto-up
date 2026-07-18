import HeroSection from "@/components/HeroSection";
import AboutTrainingSection from "@/components/AboutTrainingSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TrainingContentSection from "@/components/TrainingContentSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrainersSection from "@/components/TrainersSection";
import PricingSection from "@/components/PricingSection";
import LocationSection from "@/components/LocationSection";
import FAQSection from "@/components/FAQSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import StickyMobileCta from "@/components/StickyMobileCta";

const Index = () => {
  return (
    <>
      <div className="min-h-screen">
        {/* 1ª dobra: hero enxuto + formulário de inscrição */}
        <HeroSection />
        {/* Conteúdo complementar, do mais decisivo ao de apoio */}
        <AboutTrainingSection />
        <HowItWorksSection />
        <TrainingContentSection />
        <TestimonialsSection />
        <TrainersSection />
        <PricingSection />
        <LocationSection />
        <FAQSection />
        <FinalCtaSection />
      </div>

      <StickyMobileCta />
      <WhatsAppButton />
    </>
  );
};

export default Index;
