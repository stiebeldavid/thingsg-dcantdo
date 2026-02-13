import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ShoppingCart } from "lucide-react";

interface BookEdition {
  title: string;
  subtitle?: string;
  url?: string;
  comingSoon?: boolean;
}

const editions: BookEdition[] = [
  { title: "Original Edition", url: "https://www.amazon.com/dp/1300448296" },
  { title: "Jewish Edition", subtitle: "With Rabbinical Endorsements", url: "https://feldheim.com/things-g-d-can-t-do" },
  { title: "Spanish Edition", comingSoon: true },
  { title: "Hebrew Edition", comingSoon: true },
  { title: "Russian Edition", comingSoon: true },
  { title: "Mandarin Edition", comingSoon: true },
  { title: "French Edition", comingSoon: true },
  { title: "German Edition", comingSoon: true },
];

const Book = () => {
  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  const handlePurchase = (edition: BookEdition) => {
    if (edition.comingSoon) {
      setComingSoonOpen(true);
    } else if (edition.url) {
      window.open(edition.url, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-foreground mb-2">Things G-d Can't Do</h1>
        <p className="text-center text-muted-foreground mb-10">Available in multiple editions</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {editions.map((edition) => (
            <div key={edition.title} className="flex flex-col items-center text-center gap-3">
              <div className="w-28 h-40 bg-muted rounded-md overflow-hidden shadow-sm flex items-center justify-center">
                <img
                  src="/lovable-uploads/book-cover.png"
                  alt={edition.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">{edition.title}</p>
                {edition.subtitle && (
                  <p className="text-xs text-muted-foreground">{edition.subtitle}</p>
                )}
              </div>
              <Button
                size="sm"
                onClick={() => handlePurchase(edition)}
                className="text-xs"
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Purchase
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={comingSoonOpen} onOpenChange={setComingSoonOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Coming Soon!</DialogTitle>
            <DialogDescription>
              This edition is not yet available. Please check back later!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Book;
