import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { CartDrawer } from "@/components/CartDrawer";

const AMAZON_BOOK_URL = "https://www.amazon.com/dp/B0DRDQ2TMW";

const Shop = () => {
  return (
    <>
      <SEOHead 
        title="Shop | Things G-d Can't Do"
        description="Shop official merchandise from Things G-d Can't Do. Get the book or grab the mug."
        image="/lovable-uploads/book-cover.png"
        url="https://thingsgodcantdo.com/shop"
      />
      
      <div className="min-h-[100dvh] bg-background flex flex-col">
        {/* Minimal header with cart */}
        <header className="absolute top-4 right-4 z-10">
          <CartDrawer />
        </header>

        {/* Centered content - no scroll needed */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          {/* Simple title */}
          <Link 
            to="/" 
            className="text-muted-foreground/60 hover:text-foreground text-sm mb-8 transition-colors"
          >
            ← back to nothing
          </Link>

          {/* Two fun options */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            {/* Book option */}
            <a
              href={AMAZON_BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-64 h-32 sm:w-72 sm:h-36 rounded-2xl border-2 border-foreground/10 hover:border-foreground/30 bg-card hover:bg-muted/50 transition-all duration-300 flex flex-col items-center justify-center gap-2"
            >
              <span className="text-2xl sm:text-3xl font-bold text-foreground group-hover:scale-105 transition-transform">
                Buy the Book
              </span>
              <span className="text-sm text-muted-foreground">
                → Amazon
              </span>
            </a>

            {/* Divider */}
            <span className="text-muted-foreground/40 text-lg font-light">
              or
            </span>

            {/* Mug option */}
            <Link
              to="/store/product/things-g-d-cant-do-mug"
              className="group relative w-64 h-32 sm:w-72 sm:h-36 rounded-2xl border-2 border-foreground/10 hover:border-foreground/30 bg-card hover:bg-muted/50 transition-all duration-300 flex flex-col items-center justify-center gap-2"
            >
              <span className="text-2xl sm:text-3xl font-bold text-foreground group-hover:scale-105 transition-transform">
                Get the Mug
              </span>
              <span className="text-sm text-muted-foreground">
                → Shop
              </span>
            </Link>
          </div>

          {/* Subtle tagline */}
          <p className="mt-12 text-muted-foreground/50 text-sm text-center max-w-xs">
            That's it. That's all we've got.
          </p>
        </main>
      </div>
    </>
  );
};

export default Shop;
