
import React, { useState } from "react";
import { Menu, Book, HelpCircle, Mail, FileText } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);

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
    <div className="fixed top-4 right-4 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
            <Menu className="h-7 w-7" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[200px] sm:w-[240px]">
          <nav className="flex flex-col gap-4 mt-8">
            <button 
              onClick={handleBookClick}
              className="flex items-center gap-2 px-3 py-2 text-lg font-medium transition-colors rounded-md hover:bg-accent text-left"
            >
              <Book className="h-5 w-5" />
              Book
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
              Email Us
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
    </div>
  );
};

export default Navigation;
