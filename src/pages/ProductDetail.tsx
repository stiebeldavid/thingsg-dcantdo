import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, ShoppingCart, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

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
  const [product, setProduct] = useState<ProductNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductNode['variants']['edges'][0]['node'] | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      
      try {
        const data = await fetchProductByHandle(handle);
        if (data) {
          setProduct(data);
          if (data.variants.edges.length > 0) {
            setSelectedVariant(data.variants.edges[0].node);
          }
          if (data.images.edges.length > 0) {
            setSelectedImage(data.images.edges[0].node.url);
          }
        }
      } catch (err) {
        console.error('Failed to load product:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  const handleAddToCart = () => {
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/store" className="text-black underline">Back to Store</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/store" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            Back to Store
          </Link>
          <CartDrawer />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>
            
            {product.images.edges.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.edges.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img.node.url)}
                    className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                      selectedImage === img.node.url ? 'border-black' : 'border-transparent'
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
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <p className="text-2xl font-semibold text-gray-900">
                ${parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount).toFixed(2)}
              </p>
            </div>

            {product.description && (
              <p className="text-gray-600">{product.description}</p>
            )}

            {/* Variant Selection */}
            {product.variants.edges.length > 1 && (
              <div className="space-y-4">
                {product.options.filter(opt => opt.name !== 'Title').map((option) => (
                  <div key={option.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                            className={`px-4 py-2 rounded-lg border ${
                              isSelected
                                ? 'border-black bg-black text-white'
                                : 'border-gray-300 hover:border-gray-400'
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

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full bg-black text-white hover:bg-gray-800"
              disabled={!selectedVariant?.availableForSale}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile padding */}
      <div className="h-24 md:hidden" />
    </div>
  );
};

export default ProductDetail;
