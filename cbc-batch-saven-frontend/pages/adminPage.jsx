import { Link, Routes, Route } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { BsBox2Heart } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import AdminProductPage from "./admin/adminProductPage";
import AddProductPage from "./admin/adminAddNewProduct";
export default function AdminPage() {
  return (
    <div className="w-full h-full bg-primary flex p-2 text-secondary">
      <div className="w-[300px] h-full bg-primary flex flex-col gap-[20px] ">
        <div className="flex flex-row w-[90%] h-[80px] bg-accent items-center rounded-2xl mb-[20px]">
          <img src="/logo.png" alt="CBC-Online System" className="h-[100px]" />
          <span className="text-white text-2xl ml-4">Admin Panal</span>
        </div>

        <Link to="/admin" className="w-[90%] flex items-center gap-2 px-4 ">
          <FaChartLine />
          Dashboard
        </Link>
        <Link
          to="/admin/oredrs"
          className="w-[90%] flex items-center gap-2 px-4 "
        >
          <MdOutlineShoppingCartCheckout className="text-xl" />
          Orders
        </Link>
        <Link
          to="/admin/Products"
          className="w-[90%] flex items-center gap-2 px-4 "
        >
          <BsBox2Heart />
          Products
        </Link>
        <Link
          to="/admin/Users"
          className="w-[90%] flex items-center gap-2 px-4 "
        >
          <FiUsers />
          Users
        </Link>
      </div>
      <div className="w-[calc(100%-300px)] h-full border-[4px] border-accent bg-primary rounded-[20px] overflow-hidden">
        <div className="w-full max-w-full h-full  max-h-full overflow-scroll">
          <Routes path="/">
            <Route path="/" element={<h1>Dashboard</h1>} />
            <Route path="/products" element={<AdminProductPage />} />
            <Route path="/orders" element={<h1>Orders</h1>} />
            <Route path="/add-product" element={<AddProductPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
