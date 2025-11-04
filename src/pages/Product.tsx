import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest } from "@/config/shopify";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { Loader2, ShoppingCart } from "lucide-react";
import { useState } from "react";

const PRODUCT_QUERY = `
  query GetProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

const Product = () => {
  const { handle } = useParams<{ handle: string }>();
  const addItem = useCartStore(state => state.addItem);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['product', handle],
    queryFn: async () => {
      const response = await storefrontApiRequest(PRODUCT_QUERY, { handle });
      return response.data.productByHandle;
    },
    enabled: !!handle,
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold">Produto não encontrado</h1>
        </div>
      </>
    );
  }

  const selectedVariant = data.variants.edges[selectedVariantIndex]?.node;

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addItem({
      product: { node: data },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions,
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              {data.images.edges[0]?.node.url ? (
                <img
                  src={data.images.edges[0].node.url}
                  alt={data.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Sem imagem
                </div>
              )}
            </div>
            {data.images.edges.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {data.images.edges.slice(1, 5).map((image, idx) => (
                  <div key={idx} className="aspect-square bg-muted rounded overflow-hidden">
                    <img
                      src={image.node.url}
                      alt={`${data.title} ${idx + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
              <p className="text-3xl font-bold text-primary">
                {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
              </p>
            </div>

            {data.description && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Descrição</h2>
                <p className="text-muted-foreground">{data.description}</p>
              </div>
            )}

            {data.options.length > 0 && data.options[0].values.length > 1 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">{data.options[0].name}</h2>
                <div className="flex flex-wrap gap-2">
                  {data.variants.edges.map((variant, idx) => (
                    <Button
                      key={variant.node.id}
                      variant={selectedVariantIndex === idx ? "default" : "outline"}
                      onClick={() => setSelectedVariantIndex(idx)}
                    >
                      {variant.node.selectedOptions[0]?.value || variant.node.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <Button 
              size="lg" 
              className="w-full"
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {selectedVariant?.availableForSale ? 'Adicionar ao Carrinho' : 'Indisponível'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
