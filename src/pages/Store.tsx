import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { SEOHead } from "@/components/SEOHead";
import { Loader2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Store = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(20);
        // Sort: book first, puzzle last
        const sorted = [...data].sort((a, b) => {
          if (a.node.handle === "things-g-d-cant-do") return -1;
          if (b.node.handle === "things-g-d-cant-do") return 1;
          if (a.node.handle.includes("puzzle")) return 1;
          if (b.node.handle.includes("puzzle")) return -1;
          return 0;
        });
        setProducts(sorted);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      <SEOHead 
        title="Store | Things G-d Can't Do"
        description="Shop official merchandise from Things G-d Can't Do. Browse books, apparel, and more inspired by the bestselling book."
        image="/lovable-uploads/book-cover.png"
        url="https://thingsgodcantdo.com/store"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section - Matches site header style */}
        <section className="bg-primary text-primary-foreground">
          <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
                <h1 className="text-3xl md:text-5xl font-bold mb-3">Store</h1>
                <p className="text-primary-foreground/80 text-base md:text-lg max-w-xl">
                  Official merchandise from Things G-d Can't Do
                </p>
              </div>
              <div className="flex-shrink-0">
                <CartDrawer />
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-destructive/10 text-destructive rounded-lg p-6 inline-block">
                <p className="font-medium">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-3 text-sm underline hover:no-underline"
                >
                  Try again
                </button>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-muted rounded-2xl p-8 md:p-12 inline-block">
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <h2 className="text-2xl font-semibold text-foreground mb-2">No products yet</h2>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Products will appear here once they're added to the store.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          )}
        </main>

        {/* Mobile padding for fixed footer */}
        <div className="h-28 md:hidden" />
      </div>
    </>
  );
};

export default Store;
