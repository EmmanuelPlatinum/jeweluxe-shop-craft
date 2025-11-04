import { useQuery } from "@tanstack/react-query";
import { STOREFRONT_QUERY, storefrontApiRequest, ShopifyProduct } from "@/config/shopify";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

interface ProductGridProps {
  category?: string;
}

export const ProductGrid = ({ category }: ProductGridProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      const queryString = category ? `tag:${category}` : undefined;
      const response = await storefrontApiRequest(STOREFRONT_QUERY, {
        first: 12,
        query: queryString,
      });
      return response.data.products.edges as ShopifyProduct[];
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <p className="text-muted-foreground">Erro ao carregar produtos. Tente novamente.</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-muted-foreground mb-4">Nenhum produto encontrado</p>
        <p className="text-muted-foreground">
          Crie seu primeiro produto dizendo: "Criar um produto de [descrição] por [preço]"
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((product) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </div>
  );
};
