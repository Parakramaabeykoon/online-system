import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "../../src/components/loader";
import ProductCard from "../../src/components/productCard";

export function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/products")
        .then((Response) => {
          setProducts(Response.data);
          setisLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setisLoading(false);
          toast.error("Failed to load products");
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full h-[calc(100vh-100px)]">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-full flex flex-wrap">
          {products.map((item) => {
            return <ProductCard key={item.productId} product={item} />;
          })}
        </div>
      )}
    </div>
  );
}
