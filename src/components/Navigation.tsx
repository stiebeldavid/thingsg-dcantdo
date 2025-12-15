import React, { useState } from "react";
import { Menu, Book, HelpCircle, Mail, FileText, Home } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);

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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black py-3 px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo/Home link */}
          <a href="/" className="text-white font-bold text-xl md:text-2xl hover:text-gray-300 transition-colors">
            Things G-d Can't Do
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <span className="text-white/80 text-sm italic mr-2">
              ✨ Featured on Amazon Bestseller Page
            </span>
            <Button 
              onClick={handleBookClick}
              className="bg-white text-black hover:bg-gray-200 font-bold px-6"
            >
              Buy the Book
            </Button>
            <a
              href="/faq"
              className="text-white hover:text-gray-300 transition-colors"
            >
              FAQ
            </a>
            <a
              href="mailto:ThingsGodCantDo@gmail.com"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Contact
            </a>
            <button
              onClick={handleNewsletterClick}
              className="text-white hover:text-gray-300 transition-colors"
            >
              Newsletter
            </button>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[200px] sm:w-[240px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <button 
                    onClick={handleHomeClick}
                    className="flex items-center gap-2 px-3 py-2 text-lg font-medium transition-colors rounded-md hover:bg-accent text-left"
                  >
                    <Home className="h-5 w-5" />
                    Home
                  </button>
                  <button 
                    onClick={handleFAQClick}
                    className="flex items-center gap-2 px-3 py-2 text-lg font-medium transition-colors rounded-md hover:bg-accent text-left"
                  >
                    <HelpCircle className="h-5 w-5" />
                    FAQ
                  </button>
                  <button 
                    onClick={handleEmailClick}
                    className="flex items-center gap-2 px-3 py-2 text-lg font-medium transition-colors rounded-md hover:bg-accent text-left"
                  >
                    <Mail className="h-5 w-5" />
                    Contact
                  </button>
                  <button 
                    onClick={handleNewsletterClick}
                    className="flex items-center gap-2 px-3 py-2 text-lg font-medium transition-colors rounded-md hover:bg-accent text-left"
                  >
                    <FileText className="h-5 w-5" />
                    Newsletter
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Footer - Buy the Book */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black md:hidden">
        <p className="text-white/80 text-sm italic text-center mb-2">
          ✨ Featured on Amazon Bestseller Page ✨
        </p>
        <Button 
          onClick={handleBookClick}
          className="w-full bg-white text-black hover:bg-gray-200 font-bold py-6 text-lg"
        >
          Buy the Book
        </Button>
      </div>

      <Dialog open={newsletterOpen} onOpenChange={setNewsletterOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Subscribe to Our Newsletter</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <iframe 
              src="https://embeds.beehiiv.com/d7acfdde-1094-4704-bd04-e61ce20f0566" 
              data-test-id="beehiiv-embed" 
              width="100%" 
              height="320" 
              frameBorder="0" 
              scrolling="no" 
              style={{
                borderRadius: '4px',
                border: '2px solid #e5e7eb',
                margin: 0,
                backgroundColor: 'transparent'
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navigation;
