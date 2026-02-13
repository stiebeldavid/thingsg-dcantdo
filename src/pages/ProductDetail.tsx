import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, ShoppingCart, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

interface ProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
  options: Array<{
    name: string;
    values: string[];
  }>;
}

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [selectedVariant, setSelectedVariant] = useState<ProductNode['variants']['edges'][0]['node'] | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  const bookFallbackImage = "/lovable-uploads/book-cover.png";

  const { data: product = null, isLoading: loading } = useQuery({
    queryKey: ['product', handle],
    queryFn: () => fetchProductByHandle(handle!),
    enabled: !!handle,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (!product) return;
    if (product.variants.edges.length > 0 && !selectedVariant) {
      setSelectedVariant(product.variants.edges[0].node);
    }
    if (product.images.edges.length > 0 && !selectedImage) {
      setSelectedImage(product.images.edges[0].node.url);
    } else if (product.handle === "things-g-d-cant-do" && !selectedImage) {
      setSelectedImage(bookFallbackImage);
    }
  }, [product]);

  const isBook = product?.handle === "things-g-d-cant-do";
  const amazonUrl = "https://www.amazon.com/dp/1300448296?tag=TGCD";

  const handleAddToCart = () => {
    if (isBook) {
      window.open(amazonUrl, '_blank');
      return;
    }

    if (!product || !selectedVariant) return;

    const cartItem: CartItem = {
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success(`${product.title} added to cart`, {
      position: "top-center",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
        <Link to="/store" className="text-primary underline hover:no-underline">
          Back to Store
        </Link>
      </div>
    );
  }

  const productImage = selectedImage || bookFallbackImage;

  return (
    <>
      <SEOHead 
        title={`${product.title} | Things G-d Can't Do Store`}
        description={product.description || `Shop ${product.title} from the official Things G-d Can't Do store.`}
        image={productImage}
        url={`https://thingsgodcantdo.com/store/product/${product.handle}`}
      />
      
      <div className="min-h-screen bg-background pt-20">
        <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          {/* Back link */}
          <Link 
            to="/store" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Store
          </Link>
          <article className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-card rounded-xl overflow-hidden border border-border">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
              
              {product.images.edges.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.edges.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img.node.url)}
                      className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === img.node.url 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <header>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{product.title}</h1>
                <p className="text-2xl md:text-3xl font-semibold text-foreground">
                  ${parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount).toFixed(2)}
                </p>
              </header>

              {product.description && (
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Variant Selection */}
              {!isBook && product.variants.edges.length > 1 && (
                <div className="space-y-4">
                  {product.options.filter(opt => opt.name !== 'Title').map((option) => (
                    <div key={option.name}>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {option.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                          const variant = product.variants.edges.find(v =>
                            v.node.selectedOptions.some(
                              opt => opt.name === option.name && opt.value === value
                            )
                          )?.node;
                          
                          const isSelected = selectedVariant?.selectedOptions.some(
                            opt => opt.name === option.name && opt.value === value
                          );

                          return (
                            <button
                              key={value}
                              onClick={() => variant && setSelectedVariant(variant)}
                              className={`px-4 py-2 rounded-lg border transition-all ${
                                isSelected
                                  ? 'border-primary bg-primary text-primary-foreground'
                                  : 'border-border hover:border-primary/50 text-foreground'
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity - Hide for book */}
              {!isBook && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold text-foreground">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Add to Cart / Buy on Amazon */}
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6"
                disabled={!isBook && !selectedVariant?.availableForSale}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isBook ? 'Buy on Amazon' : (selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock')}
              </Button>
            </div>
          </article>
        </main>

        {/* Mobile padding */}
        <div className="h-28 md:hidden" />
      </div>
    </>
  );
};

export default ProductDetail;
