import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/login",
        {
          email,
          password,
        },
      );
      localStorage.setItem("token", response.data.token);
      toast.success("Login Successful");

      const user = response.data.user;
      if (user.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login Failed", error);
      toast.error("Login Failed Check Your");
    }
  }

  return (
    <div className="relative min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center">
      {/* Elegant Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[--color-secondary]/85 via-black/45 to-[--color-secondary]/85"></div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Section */}
        <div className="hidden lg:flex flex-1 items-center justify-center px-16">
          <div className="max-w-xl">
            <img
              src="/logo.png"
              alt="Online System"
              className="w-32 drop-shadow-xl mb-8"
            />

            <h1 className="text-6xl font-bold text-white leading-tight">
              Reveal Your
              <br />
              <span className="text-[--color-accent]">Natural Beauty</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-200">
              Discover premium skincare and cosmetics carefully selected to
              enhance your confidence. Shop your favorite beauty products from
              trusted brands—all in one place.
            </p>

            <div className="mt-10 flex gap-8 text-white/80">
              <div>
                <h3 className="text-3xl font-bold text-[--color-accent]">
                  1000+
                </h3>
                <p>Beauty Products</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[--color-accent]">
                  50+
                </h3>
                <p>Trusted Brands</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] px-10 py-10">
            {/* Logo */}
            <div className="flex justify-center">
              <img src="/logo.png" alt="Logo" className="w-24 drop-shadow-lg" />
            </div>

            <p className="text-center text-gray-300 text-xs tracking-[0.3em] uppercase mt-3">
              Beauty • Skincare • Cosmetics
            </p>

            <h2 className="text-3xl font-bold text-center text-white mt-6">
              Welcome Back
            </h2>

            <p className="text-center text-gray-300 mt-2 mb-8">
              Sign in to continue shopping your favorite beauty products.
            </p>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-gray-200 mb-2 text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 rounded-xl bg-white/95 px-4 text-gray-800 placeholder:text-gray-400 outline-none transition duration-300 focus:ring-4 focus:ring-[--color-accent]/30"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-200 mb-2 text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 rounded-xl bg-white/95 px-4 text-gray-800 placeholder:text-gray-400 outline-none transition duration-300 focus:ring-4 focus:ring-[--color-accent]/30"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end mt-3 mb-6">
              <a
                href="/forgot-password"
                className="text-sm text-gray-200 hover:text-[--color-accent] transition"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              onClick={login}
              className="w-full h-12 rounded-xl bg-[--color-accent] text-white font-semibold tracking-wide shadow-lg transition-all duration-300 hover:brightness-110 hover:shadow-xl active:scale-95 bg-accent"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="border-t border-white/20 my-8"></div>

            {/* Register */}
            <p className="text-center text-gray-200">
              New to Online System?{" "}
              <a
                href="/register"
                className="font-semibold text-[--color-accent] hover:underline"
              >
                Create an Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
