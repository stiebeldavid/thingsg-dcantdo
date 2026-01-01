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
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="aspect-square bg-gray-100 overflow-hidden">
          {displayImage ? (
            <img
              src={displayImage}
              alt={firstImage?.altText || node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 truncate text-gray-900">{node.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{node.description || 'No description'}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              ${parseFloat(price.amount).toFixed(2)}
            </span>
            
            <Button 
              onClick={handleAddToCart}
              size="sm"
              className="bg-black text-white hover:bg-gray-800"
              disabled={!isBook && !firstVariant?.availableForSale}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {isBook ? "Buy on Amazon" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
