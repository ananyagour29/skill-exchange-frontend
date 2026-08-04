
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import useAuth from "@/hooks/useAuth";
import { LuSparkles, LuMail, LuLock, LuRefreshCw, LuArrowRight, LuShieldCheck, LuZap, LuGraduationCap } from "react-icons/lu";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/login", formData);

      console.log("Login Response:", response.data);

      localStorage.setItem("userId", String(response.data.id));

      localStorage.setItem("user", JSON.stringify({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
      }));
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", response.data.email);

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
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50/60 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex items-center justify-center">
      
      {/* Background Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-teal-300/20 dark:bg-teal-950/30 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-md w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider border border-teal-500/25 shadow-sm">
            <LuSparkles className="text-sm" /> Welcome Back
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Member Login
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Sign in to continue your skill exchange journey.
          </p>

          {/* Professional Custom Feature Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60">
              <LuGraduationCap className="text-sm text-teal-600 dark:text-teal-400" /> Learn New Skills
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
              <LuZap className="text-sm text-emerald-600 dark:text-emerald-400" /> Teach Your Expertise

            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800/60">
              <LuShieldCheck className="text-sm text-cyan-600 dark:text-cyan-400" />  Build Connections
            </span>
          </div>
        </div>

        {/* Login Card Form - Taller Box with comfortable padding */}
        <div className="rounded-3xl border border-teal-100/90 dark:border-teal-900/50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl space-y-6">

          {error && (
            <div className="p-4 text-sm rounded-2xl border font-medium bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center gap-2 shadow-sm">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 text-sm">
            
            {/* Email Field */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider mb-2 text-xs">
                Email Address
              </label>
              <div className="relative flex items-center">
                <LuMail className="absolute left-4 text-teal-600 dark:text-teal-400 text-base" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all font-medium text-sm shadow-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider mb-2 text-xs">
                Password
              </label>
              <div className="relative flex items-center">
                <LuLock className="absolute left-4 text-teal-600 dark:text-teal-400 text-base" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all font-medium text-sm shadow-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 disabled:opacity-50 text-white rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? <LuRefreshCw className="animate-spin text-lg" /> : <LuArrowRight className="text-lg" />}
              {loading ? "Logging in..." : "Login to Platform"}
            </button>
          </form>

          {/* Footer links */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center space-y-3">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="font-bold text-teal-600 dark:text-teal-400 hover:underline"
              >
                Register
              </button>
            </p>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="block w-full text-center text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition"
            >
              Back to Home
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}