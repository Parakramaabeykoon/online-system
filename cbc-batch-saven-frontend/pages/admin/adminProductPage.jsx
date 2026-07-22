import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegCreditCard, FaRegEdit } from "react-icons/fa";
import { FaCirclePlus, FaRegTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { Loader } from "../../src/components/loader";

function ProductDeleteConfirm(props) {
  const productId = props.productId;
  const close = props.close;
  const refresh = props.refresh;
  function deleteProduct() {
    const token = localStorage.getItem("token");
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        close();
        toast.success("Product delete successfully");
        refresh();
      })
      .catch(() => {
        toast.error("failed to delete product");
      });
  }
  return (
    <div className="fixed inset-0 top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="flex flex-col relative h-[200px] w-[500px] rounded-xl bg-white p-6 shadow-xl justify-center items-center gap-[40px]">
        <button
          onClick={close}
          className="absolute right-[-42px] top-[-42px] w-[40px] h-[40px] flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-800"
        >
          ✕
        </button>

        <p className=" text-xl text-gray-600 justify-center ">
          Are you sure you want to delete this product with product ID :{" "}
          {productId}?
        </p>
        <div className="flex gap-[50px] justify-center items-center">
          <button
            onClick={close}
            className="w-[100px] bg-red-600 text-white hover:bg-accent"
          >
            Cancel
          </button>
          <button
            onClick={deleteProduct}
            className="w-[100px] rounded bg-blue-600 py-1.5 text-white hover:bg-blue-700"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [isDeleteConfirmVisible, setisDeleteConfirmVisible] = useState(false);
  const [ProductDelete, setProductToDelte] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/products")
        .then((Response) => {
          console.log(Response.data);
          setProducts(Response.data);
          setisLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full h-full p-4 sm:p-6 bg-transparent">
      {isDeleteConfirmVisible && (
        <ProductDeleteConfirm
          refresh={() => setisLoading(true)}
          productId={ProductDelete}
          close={() => {
            setisDeleteConfirmVisible(false);
          }}
        />
      )}
      <Link
        to="/admin/add-product"
        className="flex right-[50px] bottom-[50px] text-5xl hover:text-accent "
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
            {/* Manage your product inventory and pricing */}
          </p>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          {isLoading ? (
            <Loader />
          ) : (
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
                            }
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
                          {item.labalPrice
                            ? item.labalPrice.toLocaleString()
                            : 0}
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
                            <FaRegTrashCan
                              size={16}
                              title="Delete"
                              aria-label="Delete product"
                              onClick={() => {
                                setProductToDelte(item.productID);
                                setisDeleteConfirmVisible(true);
                              }}
                            />
                          </button>

                          <button
                            type="button"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-all duration-200 hover:bg-accent/10 hover:text-accent active:scale-95 "
                          >
                            <FaRegEdit
                              size={16}
                              title="Edit"
                              aria-label="Edit product"
                              onClick={() => {
                                navigate("/admin/update-product", {
                                  state: item,
                                });
                              }}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
