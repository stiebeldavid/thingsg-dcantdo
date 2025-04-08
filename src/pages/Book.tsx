
import { useEffect } from "react";

const Book = () => {
  useEffect(() => {
    window.location.href = "https://www.lulu.com/shop/david-stiebel/things-g-d-cant-do/paperback/product-w4k7vem.html";
  }, []);

  return null;
};

export default Book;
