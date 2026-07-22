import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateProductPage() {
  const location = useLocation();

  const [productId, setProductId] = useState(location.state.productID);
  const [name, setName] = useState(location.state.name);
  const [altName, setAltName] = useState(location.state.altName.join(","));
  const [description, setDescription] = useState(location.state.description);
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(location.state.price);
  const [labalPrice, setLabalPrice] = useState(location.state.labalPrice);
  const [category, setCategory] = useState(location.state.category);
  const [stoke, setStoke] = useState(location.state.stoke);
  const navigate = useNavigate();

  async function updateProduct() {
    const token = localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
      return;
    }

    const uploadPromises = [];
    for (let i = 0; i < images.length; i++) {
      uploadPromises[i] = mediaUpload(images[i]);
    }

    try {
      let urls = await Promise.all(uploadPromises);
      if (urls.length == 0) {
        urls = location.state.images;
      }

      const AlternativeName = altName
        ? altName.split(",").map((item) => item.trim())
        : [];

      const product = {
        productID: productId,
        name: name,
        altName: AlternativeName,
        discription: description,
        Image: urls,
        price: price,
        labalPrice: labalPrice,
        category: category,
        stock: stoke,
      };

      await axios.put(
        import.meta.env.VITE_API_URL + "/api/products/" + productId,
        product,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      console.log(urls);
      toast.success("Product added Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  }

  return (
    <div className="min-h-full w-full bg-primary px-6 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium tracking-wide text-accent">
            PRODUCT MANAGEMENT
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Update product
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create something beautiful for your customers.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)] md:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Section */}
            <div className="space-y-6">
              {/* Product ID */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product ID
                </label>

                <input
                  disabled
                  value={productId}
                  onChange={(e) => {
                    setProductId(e.target.value);
                  }}
                  placeholder="e.g. P001"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
                />
              </div>

              {/* Product Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product name
                </label>

                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Enter product name"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
                />
              </div>

              {/* Alternative Names */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Alternative names
                </label>

                <input
                  value={altName}
                  onChange={(e) => {
                    setAltName(e.target.value);
                  }}
                  placeholder="e.g. Face Serum, Brightening Serum"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder="Tell customers about this product..."
                  rows={6}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              {/* Images */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product images
                </label>

                <label className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 text-center transition-all hover:border-accent hover:bg-accent/5">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-2xl">
                    📸
                  </div>

                  <p className="text-sm font-semibold text-gray-700">
                    Upload product images
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Select multiple images for your product
                  </p>

                  <input
                    type="file"
                    onChange={(e) => {
                      setImages(e.target.files);
                    }}
                    multiple
                    className="hidden"
                  />
                </label>
              </div>

              {/* Price Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Price
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">
                      Rs
                    </span>

                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-4 text-sm text-gray-800 outline-none transition-all focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Label price
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">
                      Rs
                    </span>

                    <input
                      type="number"
                      value={labalPrice}
                      onChange={(e) => setLabalPrice(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-4 text-sm text-gray-800 outline-none transition-all focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
                    />
                  </div>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm capitalize text-gray-800 outline-none transition-all focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
                >
                  <option value="cream">Cream</option>
                  <option value="lotion">Lotion</option>
                  <option value="serum">Serum</option>
                </select>
              </div>

              {/* Stock */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Stock
                </label>

                <input
                  type="number"
                  value={stoke}
                  onChange={(e) => setStoke(e.target.value)}
                  placeholder="Enter available stock"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/admin/products", {});
                  }}
                  className="rounded-full bg-red-200 px-3 h-[40px] w-[100px] py-1 text-md flex justify-center items-center font-medium text-secondary ring-accent/3 hover:border-accent hover:border-[2px]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={updateProduct}
                  className="rounded-full bg-accent/15 px-3 h-[40px] w-[100px] py-1 text-md flex justify-center items-center font-medium text-secondary ring-accent/30 hover:border-accent hover:border-[2px]"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
