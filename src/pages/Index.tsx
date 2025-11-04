import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      <section id="catalog" className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nossa Coleção</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubra peças únicas de alta joalheria
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            <Button variant="default">Todas</Button>
            <Button variant="outline">Femininas</Button>
            <Button variant="outline">Masculinas</Button>
          </div>

          <ProductGrid />
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 Jeweluxe. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
