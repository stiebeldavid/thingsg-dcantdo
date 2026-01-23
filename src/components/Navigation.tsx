import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Book, HelpCircle, Mail, FileText, Home, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CartDrawer } from "@/components/CartDrawer";
const Navigation = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  
  const isStorePage = location.pathname === '/store' || location.pathname === '/shop' || location.pathname.startsWith('/store/');
  const handleHomeClick = () => {
    window.location.href = '/';
    setOpen(false);
  };
  const handleBookClick = () => {
    window.open('https://www.amazon.com/dp/1300448296?tag=TGCD', '_blank');
    setOpen(false);
  };
  const handleFAQClick = () => {
    window.location.href = '/faq';
    setOpen(false);
  };
  const handleEmailClick = () => {
    window.location.href = 'mailto:ThingsGodCantDo@gmail.com?subject=Question about Things G-d Can\'t Do';
    setOpen(false);
  };
  const handleNewsletterClick = () => {
    setNewsletterOpen(true);
    setOpen(false);
  };
  return <>
      <header className="fixed top-0 left-0 right-0 z-50 py-3 px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo/Home link */}
          <a href="/" className="hover:opacity-70 transition-opacity">
            <span className="text-black font-bold text-xl md:text-2xl block">Things G-d Can't Do</span>
            <span className="text-black/50 text-xs md:text-sm italic">Hint: He can do anything!</span>
          </a>

          {/* Desktop Navigation - minimal */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/store" className="text-black/70 hover:text-black transition-colors text-sm">
              Store
            </a>
            <a href="/faq" className="text-black/70 hover:text-black transition-colors text-sm">
              FAQ
            </a>
            <button onClick={handleNewsletterClick} className="text-black/70 hover:text-black transition-colors text-sm">
              Newsletter
            </button>
            <a 
              href="https://www.amazon.com/dp/1300448296?tag=TGCD" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-1.5 bg-black text-white text-sm font-medium rounded-full hover:bg-black/80 transition-colors"
            >
              Get the Book
            </a>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            {isStorePage && <CartDrawer />}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-black hover:bg-black/10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[200px] sm:w-[240px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <button onClick={handleHomeClick} className="flex items-center gap-2 px-3 py-2 text-lg font-medium transition-colors rounded-md hover:bg-accent text-left">
                    <Home className="h-5 w-5" />
                    Home
                  </button>
                  <a href="/store" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2 text-lg font-medium transition-colors rounded-md hover:bg-accent">
                    <ShoppingBag className="h-5 w-5" />
                    Store
                  </a>
                  <button onClick={handleFAQClick} className="flex items-center gap-2 px-3 py-2 text-lg font-medium transition-colors rounded-md hover:bg-accent text-left">
                    <HelpCircle className="h-5 w-5" />
                    FAQ
                  </button>
                  <button onClick={handleEmailClick} className="flex items-center gap-2 px-3 py-2 text-lg font-medium transition-colors rounded-md hover:bg-accent text-left">
                    <Mail className="h-5 w-5" />
                    Contact
                  </button>
                  <button onClick={handleNewsletterClick} className="flex items-center gap-2 px-3 py-2 text-lg font-medium transition-colors rounded-md hover:bg-accent text-left">
                    <FileText className="h-5 w-5" />
                    Newsletter
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Footer - Small floating pill (hidden on store/shop pages) */}
      {!isStorePage && (
        <button 
          onClick={handleBookClick} 
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden px-4 py-2 bg-black/80 backdrop-blur-sm text-white text-sm rounded-full hover:bg-black transition-colors shadow-lg"
        >
          Get the Book →
        </button>
      )}

      <Dialog open={newsletterOpen} onOpenChange={setNewsletterOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Subscribe to Our Newsletter</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <iframe src="https://embeds.beehiiv.com/d7acfdde-1094-4704-bd04-e61ce20f0566" data-test-id="beehiiv-embed" width="100%" height="320" frameBorder="0" scrolling="no" style={{
            borderRadius: '4px',
            border: '2px solid #e5e7eb',
            margin: 0,
            backgroundColor: 'transparent'
          }} />
          </div>
        </DialogContent>
      </Dialog>
    </>;
};
export default Navigation;