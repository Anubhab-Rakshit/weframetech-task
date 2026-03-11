"use client";

import React, { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-[#0a0a0a] text-[#f8f8f8]">
      <div className="cah-container text-center">
        <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-4">
          Stay Updated
        </p>
        <h2 className="section-title mb-6">Get the Newsletter.</h2>
        <p className="text-white/60 text-lg mb-12 max-w-lg mx-auto">
          We&apos;ll send you new product announcements and occasionally do something weird.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-full px-8 py-4">
            <span className="text-green-400 font-black text-lg">✓</span>
            <span className="font-bold text-white/80">You&apos;re on the list. We&apos;ll try not to be annoying.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-white/10 border-2 border-white/20 text-white placeholder-white/30 rounded-full px-6 py-4 font-medium outline-none focus:border-white/60 transition-colors"
              required
            />
            <button
              type="submit"
              className="bg-[#f8f8f8] text-[#0a0a0a] font-black uppercase tracking-wide px-8 py-4 rounded-full hover:bg-white transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}