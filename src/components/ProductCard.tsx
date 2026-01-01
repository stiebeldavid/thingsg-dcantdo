import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const firstVariant = node.variants.edges[0]?.node;
  const firstImage = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  
  const isBook = node.handle === "things-g-d-cant-do";
  const amazonUrl = "https://www.amazon.com/dp/1300448296?tag=TGCD";
  
  // Fallback image for the book product
  const bookFallbackImage = "/lovable-uploads/book-cover.png";
  const displayImage = isBook && !firstImage ? bookFallbackImage : firstImage?.url;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isBook) {
      window.open(amazonUrl, '_blank');
      return;
    }
    
    if (!firstVariant) return;

    const cartItem: CartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success(`${node.title} added to cart`, {
      position: "top-center",
    });
  };

  return (
    <Link to={`/store/product/${node.handle}`} className="group block">
      <article className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="aspect-square bg-muted overflow-hidden">
          {displayImage ? (
            <img
              src={displayImage}
              alt={firstImage?.altText || node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>
        
        <div className="p-4 md:p-5">
          <h3 className="font-semibold text-lg mb-1 truncate text-foreground">{node.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{node.description || 'No description'}</p>
          
          <div className="flex items-center justify-between gap-3">
            <span className="text-xl font-bold text-foreground">
              ${parseFloat(price.amount).toFixed(2)}
            </span>
            
            <Button 
              onClick={handleAddToCart}
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              disabled={!isBook && !firstVariant?.availableForSale}
            >
              <ShoppingCart className="h-4 w-4 mr-1.5" />
              {isBook ? "Buy on Amazon" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
};
