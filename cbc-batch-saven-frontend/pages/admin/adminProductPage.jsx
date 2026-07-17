import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegCreditCard } from "react-icons/fa";
import { FaCirclePlus, FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router";

const sampleData = [
  {
    productID: "P001",
    name: "Vitamin C Brightening Serum",
    altName: ["Vitamin C Serum", "Brightening Serum", "Face Serum"],
    discription:
      "A lightweight vitamin C serum that helps brighten the skin and reduce the appearance of dark spots.",
    Image: [
      "/products/vitamin-c-serum-1.jpg",
      "/products/vitamin-c-serum-2.jpg",
    ],
    price: 4500,
    labalPrice: 5000,
    category: "Skincare",
  },

  {
    productID: "P002",
    name: "Hydrating Face Moisturizer",
    altName: ["Face Moisturizer", "Hydrating Cream", "Moisturizing Cream"],
    discription:
      "A gentle hydrating moisturizer that keeps the skin soft, smooth, and moisturized throughout the day.",
    Image: [
      "/products/hydrating-moisturizer-1.jpg",
      "/products/hydrating-moisturizer-2.jpg",
    ],
    price: 3200,
    labalPrice: 3800,
    category: "Skincare",
  },

  {
    productID: "P003",
    name: "Matte Liquid Lipstick",
    altName: ["Liquid Lipstick", "Matte Lipstick", "Long Lasting Lipstick"],
    discription:
      "A long-lasting matte liquid lipstick with a smooth texture and rich color payoff.",
    Image: ["/products/matte-lipstick-1.jpg", "/products/matte-lipstick-2.jpg"],
    price: 2500,
    labalPrice: 3000,
    category: "Makeup",
  },

  {
    productID: "P004",
    name: "Aloe Vera Face Wash",
    altName: ["Aloe Face Wash", "Facial Cleanser", "Aloe Cleanser"],
    discription:
      "A refreshing aloe vera face wash that gently cleanses the skin and removes dirt and excess oil.",
    Image: ["/products/aloe-face-wash-1.jpg", "/products/aloe-face-wash-2.jpg"],
    price: 1800,
    labalPrice: 2200,
    category: "Skincare",
  },

  {
    productID: "P005",
    name: "Rose Glow Facial Toner",
    altName: ["Rose Toner", "Face Toner", "Glow Toner"],
    discription:
      "A refreshing rose facial toner that helps balance the skin and gives a natural healthy glow.",
    Image: ["/products/rose-toner-1.jpg", "/products/rose-toner-2.jpg"],
    price: 2100,
    labalPrice: 2600,
    category: "Skincare",
  },
];

export default function AdminProductPage() {
  const [products, setProducts] = useState(sampleData);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products")
      .then((Response) => {
        console.log(Response.data);
      });
  }, []);

  return (
    <div className="w-full h-full p-4 sm:p-6 bg-transparent">
      <Link
        to="/admin/add-product"
        className="flex right-[50px] bottem-[50px] text-5xl hover:text-accent "
      >
        <FaCirclePlus />
      </Link>
      <div className="w-full overflow-hidden rounded-2xl border border-gray-200/70 bg-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-sm">
        {/* Header */}
        <div className="flex flex-col gap-1 border-b border-gray-100 px-5 py-5 sm:px-6">
          <h1 className="text-xl font-semibold tracking-tight text-gray-800">
            Products
          </h1>

          <p className="text-sm text-gray-500">
            Manage your product inventory and pricing
          </p>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Image
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Product ID
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Product Name
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Product Price
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Labelled Price
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Category
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {products.map((item) => {
                return (
                  <tr
                    key={item.productID}
                    className="group transition-colors duration-200 hover:bg-accent/[0.03]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shadow-sm">
                        <img
                          src={item.Image[0]}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold tracking-wide text-gray-600">
                        {item.productID}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{item.name}</p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-800">
                        Rs. {item.price.toLocaleString()}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-gray-500 line-through">
                        Rs. {item.labalPrice.toLocaleString()}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500 active:scale-95"
                        >
                          <FaRegTrashCan size={16} />
                        </button>

                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-all duration-200 hover:bg-accent/10 hover:text-accent active:scale-95"
                        >
                          <FaRegCreditCard size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
