"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

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
          <div
            className="bg-white border-2 border-[#0a0a0a] rounded-3xl p-10"
            style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
          >
            <div className="mb-8">
              <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                Join the family
              </p>
              <h1 className="text-4xl font-black tracking-tight">Create Account</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={update("firstName")}
                    className="cah-input"
                    placeholder="Alex"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={update("lastName")}
                    className="cah-input"
                    placeholder="Smith"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  className="cah-input"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={update("password")}
                  className="cah-input"
                  placeholder="At least 8 characters"
                  minLength={8}
                  required
                />
              </div>

              <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                By creating an account you agree to our{" "}
                <Link href="/terms" className="underline">Terms</Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline">Privacy Policy</Link>.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="cah-button w-full py-4 text-base mt-2 disabled:opacity-50"
              >
                {loading ? "Creating Account…" : "Create Account"}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
              <p className="text-sm font-medium text-zinc-500">
                Already have an account?{" "}
                <Link href="/login" className="font-black text-[#0a0a0a] underline underline-offset-2">
                  Sign in
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
