
import { useEffect } from "react";

const Shop = () => {
  useEffect(() => {
    window.open("https://thingsgodcantdo.myshopify.com/", "_blank");
    window.location.href = "/";
  }, []);

  return null;
};

export default Shop;
