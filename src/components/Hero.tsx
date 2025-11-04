import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-jewelry.jpg";

export const Hero = () => {
  const scrollToCatalog = () => {
    const catalog = document.getElementById('catalog');
    catalog?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Elegância em
          <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Cada Detalhe
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Joias luxuosas para homens e mulheres que valorizam sofisticação
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="text-lg px-8 shadow-luxury"
            onClick={scrollToCatalog}
          >
            Explorar Coleção
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            Sobre Nós
          </Button>
        </div>
      </div>

      <button
        onClick={scrollToCatalog}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce text-white"
        aria-label="Scroll to catalog"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};
