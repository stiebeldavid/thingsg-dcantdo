
import React, { useState } from "react";
import { Menu, Book } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [open, setOpen] = useState(false);

  const handleBookClick = () => {
    window.open('https://www.amazon.com/dp/1300448296?tag=yoursite-20', '_blank');
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
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navigation;
