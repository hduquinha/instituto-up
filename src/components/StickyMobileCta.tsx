import { useEffect, useState } from "react";
import { scrollToInscricao } from "@/components/HeroSection";

const StickyMobileCta = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("inscricao");
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-turquoise/30 bg-black/95 p-3 backdrop-blur-sm lg:hidden">
      <button
        type="button"
        onClick={scrollToInscricao}
        className="w-full rounded-xl bg-turquoise px-4 py-4 text-base font-bold uppercase tracking-wide text-black shadow-lg shadow-turquoise/30 transition-colors hover:bg-turquoise-light"
      >
        Quero me inscrever
      </button>
    </div>
  );
};

export default StickyMobileCta;
