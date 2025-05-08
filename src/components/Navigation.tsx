
import React, { useState } from "react";
import { Menu, Book } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [open, setOpen] = useState(false);

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
            <Link 
              to="/book" 
              className="flex items-center gap-2 px-3 py-2 text-lg font-medium transition-colors rounded-md hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              <Book className="h-5 w-5" />
              Book
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navigation;
