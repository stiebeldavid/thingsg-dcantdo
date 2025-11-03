const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 relative">
      {/* Main content - centered */}
      <div className="flex flex-col items-center gap-8 max-w-md w-full">
        <a
          href="https://www.amazon.com/dp/1300448296"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-foreground text-background hover:opacity-90 transition-opacity rounded-md text-sm font-medium"
        >
          Get the Book
        </a>
        
        <a
          href="mailto:thingsGodcantdo@gmail.com"
          className="text-foreground/60 hover:text-foreground transition-colors text-sm"
        >
          Contact: thingsGodcantdo@gmail.com
        </a>
      </div>
    </div>
  );
};

export default Index;