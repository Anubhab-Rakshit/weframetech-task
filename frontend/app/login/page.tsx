"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-[#f8f8f8] flex items-center justify-center py-16">
        <div className="w-full max-w-md px-6">
          {/* Card */}
          <div
            className="bg-white border-2 border-[#0a0a0a] rounded-3xl p-10"
            style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
          >
            <div className="mb-8">
              <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                Welcome back
              </p>
              <h1 className="text-4xl font-black tracking-tight">Login</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="cah-input"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="cah-input pr-12"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="cah-button w-full py-4 text-base mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in…" : "Sign In"}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
              <p className="text-sm font-medium text-zinc-500">
                New here?{" "}
                <Link href="/register" className="font-black text-[#0a0a0a] underline underline-offset-2">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
