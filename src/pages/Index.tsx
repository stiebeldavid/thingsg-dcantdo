const Index = () => {
  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Footer - anchored at bottom */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 px-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
          <span>ThingsGodCantDo.com</span>
          <span className="hidden sm:inline">|</span>
          <a
            href="https://www.amazon.com/dp/1300448296"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors underline"
          >
            Buy the Book
          </a>
          <span className="hidden sm:inline">|</span>
          <a
            href="/faq"
            className="hover:text-gray-900 transition-colors underline"
          >
            FAQ
          </a>
          <span className="hidden sm:inline">|</span>
          <a
            href="mailto:ThingsGodCantDo@gmail.com"
            className="hover:text-gray-900 transition-colors underline"
          >
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;