import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { Loader } from "../src/components/loader";
import ImageSlider from "../src/components/imageSlider";

export default function ProductOverview() {
  const params = useParams();
  const [status, setStatus] = useState("loading");
  const [product, setProducts] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products/" + params.id)
      .then((res) => {
        setProducts(res.data);
        setStatus("success");
      })
      .catch((err) => {
        console.error("API Error:", err);
        toast.error("Failed to fetch product details");
        setStatus("error");
      });
  }, [params.id]);

  return (
    <div className="w-full h-[calc(100vh-100px)] text-secondary">
      {status === "loading" && <Loader />}

      {status === "success" && product && (
        <div className="w-full h-full flex">
          {/* Left Side */}
          <div className="w-[50%] h-full flex justify-center items-center p-8">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg flex items-center justify-center">
              <ImageSlider images={product.Image || product.images || []} />
            </div>
          </div>

          {/* Right Side */}
          <div className="w-[50%] h-full flex items-center justify-center p-10">
            <div className="w-full max-w-xl flex flex-col gap-5">
              <h1 className="text-4xl font-bold leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4">
                <p className="text-xl text-gray-400 line-through">
                  LKR{" "}
                  {product.labalPrice ? product.labalPrice.toFixed(2) : "0.00"}
                </p>

                <p className="text-3xl font-bold text-accent">
                  LKR {product.price ? product.price.toFixed(2) : "0.00"}
                </p>
              </div>

              <div className="w-16 h-1 rounded-full bg-accent"></div>

              <p className="text-gray-600 leading-8 text-justify">
                {product.discription || product.description}
              </p>

              <div className="flex items-center gap-2 text-lg">
                <span className="font-semibold">Category :</span>
                <span>{product.category}</span>
              </div>

              <div className="flex gap-4 mt-4">
                <button className="flex-1 h-12 rounded-lg bg-accent text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Add to Cart
                </button>

                <button className="flex-1 h-12 rounded-lg border-2 border-accent text-accent font-semibold transition-all duration-300 hover:bg-accent hover:text-white hover:scale-105">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-red-600 text-xl font-semibold">
            Failed to load product details
          </h1>
        </div>
      )}
    </div>
  );
}
