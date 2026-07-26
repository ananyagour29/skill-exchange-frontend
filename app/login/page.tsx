"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/services/api";
import useAuth from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const response = await api.post(
        "/login",
        formData
      );

      console.log("Login Response:", response.data);

      localStorage.setItem(
        "userId",
        String(response.data.id)
      );

      login(
        {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        },
        "logged-in"
      );

      router.push("/dashboard");

    } catch (err: any) {

      setError(
        err.response?.data?.message ||
        "Invalid email or password"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center px-5">

      <div className="w-full max-w-md rounded-3xl border border-[#E7DDD4] bg-white p-8 shadow-[0_10px_30px_rgba(166,124,82,0.12)]">

        <h1 className="text-3xl font-bold text-center text-[#2D2D2D]">
          Login
        </h1>

        <p className="mt-2 text-center text-sm text-gray-500">
          Welcome back to SkillExchange
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          <div>
            <label className="block mb-2 text-sm font-medium text-[#2D2D2D]">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-[#E7DDD4] px-4 py-3 outline-none focus:border-[#A67C52]"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-[#2D2D2D]">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-[#E7DDD4] px-4 py-3 outline-none focus:border-[#A67C52]"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#A67C52] py-3 text-white font-semibold hover:bg-[#8F6743] transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?

          <button
            onClick={() => router.push("/register")}
            className="ml-1 font-semibold text-[#A67C52]"
          >
            Register
          </button>
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-4 w-full text-[#A67C52] font-medium"
        >
          Back to Home
        </button>

      </div>

    </div>
  );
}