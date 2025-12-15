import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-3W7KSJEEL9", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
};

export default usePageTracking;
