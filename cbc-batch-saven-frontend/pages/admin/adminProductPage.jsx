import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegCreditCard, FaRegEdit } from "react-icons/fa";
import { FaCirclePlus, FaRegTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products")
      .then((Response) => {
        console.log(Response.data);
        // 🟢 ERROR FIX: Backend එකෙන් එන දත්ත ටික products state එකට සෙට් කළා
        setProducts(Response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="w-full h-full p-4 sm:p-6 bg-transparent">
      <Link
        to="/admin/add-product"
        className="flex right-[50px] bottom-[50px] text-5xl hover:text-accent " /* 🟢 ERROR FIX: bottem -> bottom ලෙස නිවැරදි කළා */
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
                          src={
                            item.Image && item.Image[0] ? item.Image[0] : ""
                          } /* 🟢 SAFTEY CHECK: Image array එක හිස්ව ආවොත් crash නොවීමට */
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
                        Rs. {item.price ? item.price.toLocaleString() : 0}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-gray-500 line-through">
                        Rs.{" "}
                        {item.labalPrice ? item.labalPrice.toLocaleString() : 0}
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
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-all duration-200 hover:bg-accent/10 hover:text-accent active:scale-95 "
                          onClick={() => {
                            navigate("/admin/update-product", {
                              state: item,
                            });
                          }}
                        >
                          <FaRegEdit size={16} />
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
