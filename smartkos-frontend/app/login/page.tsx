"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // === DUMMY LOGIN (nanti diganti API Laravel) ===
    setTimeout(() => {
      setLoading(false);

      if (email === "admin@smartkos.com" && password === "password") {
        alert("✅ Login berhasil (dummy)");
        // nanti redirect ke dashboard
        // router.push("/dashboard");
      } else {
        setError("Email atau password salah");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
      >
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">SmartKos Admin</h1>
          <p className="text-sm text-gray-500 mt-1">
            Masuk ke sistem manajemen kos
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative mt-1">
              <Mail
                size={16}
                className="absolute left-3 top-2.5 text-gray-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@smartkos.com"
                className="
                  w-full pl-9 pr-3 py-2 
                  border border-gray-300 rounded-lg text-sm
                  focus:ring-2 focus:ring-blue-500 focus:outline-none
                "
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <Lock
                size={16}
                className="absolute left-3 top-2.5 text-gray-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="
                  w-full pl-9 pr-10 py-2 
                  border border-gray-300 rounded-lg text-sm
                  focus:ring-2 focus:ring-blue-500 focus:outline-none
                "
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full flex justify-center items-center gap-2
              bg-blue-600 text-white rounded-lg py-2.5
              hover:bg-blue-700 transition
              disabled:opacity-60
            "
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} SmartKos Management System
        </div>
      </motion.div>
    </div>
  );
}
