"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, ArrowLeft, Check } from "lucide-react";

// ──────────────────────────────────────────────
// Product data (in a real app, fetched from Payload CMS + Medusa)
// ──────────────────────────────────────────────
const PRODUCT_DATA: Record<string, {
  title: string;
  price: number;
  tagline: string;
  description: string;
  features: string[];
  isBlack?: boolean;
}> = {
  "main-game": {
    title: "Cards Against Humanity",
    price: 25,
    tagline: "The party game for horrible people.",
    description:
      "Cards Against Humanity is a party game for horrible people. Unlike most of the party games you've played before, Cards Against Humanity is as despicable and awkward as you and your friends.",
    features: [
      "500 white cards",
      "100 black cards",
      "Instructions",
      "A box to put them all in",
      "Freely available as a print-and-play PDF",
    ],
    isBlack: true,
  },
  "more-cah": {
    title: "More Cards Against Humanity",
    price: 10,
    tagline: "Even more awful. 300 new cards.",
    description:
      "More Cards Against Humanity is an expansion for the main game. You'll need the main game to use this. It contains 300 all-new cards (245 white and 55 black) that you can add to your game.",
    features: [
      "245 new white cards",
      "55 new black cards",
      "Requires the main game",
      "Fits in the main game box",
    ],
  },
  "family-edition": {
    title: "Family Edition",
    price: 25,
    tagline: "A wholesome reinvention of the world's worst card game.",
    description:
      "Cards Against Humanity: Family Edition is wholesome and totally appropriate for kids and adults to play together! Or... is it?!? Yes it is. It's clean and fun for the whole family.",
    features: [
      "550 cards",
      "Appropriate for all ages",
      "Adult and kid versions of some cards",
      "No need for the main game",
    ],
  },
};

// ──────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────
export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = PRODUCT_DATA[params.slug] ?? PRODUCT_DATA["main-game"];

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[#f8f8f8]">
        <div className="cah-container py-16">
          {/* Breadcrumb */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* ── Card Visual ── */}
            <div className="sticky top-32">
              <div className="relative">
                {/* Shadow cards */}
                {[3, 2, 1].map((i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 rounded-3xl border-2 border-[#0a0a0a] ${
                      product.isBlack ? "bg-white/20" : "bg-black/10"
                    }`}
                    style={{
                      transform: `rotate(${i * 2 - 3}deg) translate(${(i - 2) * 6}px, ${(i - 2) * 4}px)`,
                    }}
                  />
                ))}

                {/* Main card */}
                <div
                  className={`relative rounded-3xl border-2 border-[#0a0a0a] p-10 aspect-[3/4] flex flex-col justify-between
                    ${product.isBlack ? "bg-[#0a0a0a] text-[#f8f8f8]" : "bg-[#f8f8f8] text-[#0a0a0a]"}
                  `}
                  style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,0.9)" }}
                >
                  {/* Circle logo mark */}
                  <div
                    className={`w-10 h-10 rounded-full border-2 ${
                      product.isBlack ? "border-white/40" : "border-black/20"
                    }`}
                  />

                  <div>
                    <h2
                      className="text-3xl font-black leading-tight mb-4"
                      style={{ fontFamily: "Inter, Helvetica Neue, Arial, sans-serif" }}
                    >
                      {product.title}
                    </h2>
                    <p
                      className={`text-xs font-bold uppercase tracking-widest ${
                        product.isBlack ? "text-white/40" : "text-black/40"
                      }`}
                    >
                      Cards Against Humanity LLC
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Product Info ── */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3">
                Cards Against Humanity
              </p>
              <h1
                className="font-black text-5xl lg:text-6xl leading-none mb-4 tracking-tight"
                style={{ fontFamily: "Inter, Helvetica Neue, Arial, sans-serif" }}
              >
                {product.title}
              </h1>
              <p className="text-2xl font-black text-zinc-500 mb-6">{product.tagline}</p>

              <p className="text-zinc-500 text-lg leading-relaxed mb-8">{product.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-10">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-base font-medium">
                    <Check className="w-5 h-5 text-green-500 shrink-0" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <p className="text-4xl font-black mb-8">${product.price}.00</p>

              {/* Quantity + Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {/* Quantity */}
                <div className="flex items-center border-2 border-[#0a0a0a] rounded-full overflow-hidden h-14 shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-5 h-full hover:bg-zinc-100 transition-colors font-bold"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-black text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-5 h-full hover:bg-zinc-100 transition-colors font-bold"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 h-14 flex items-center justify-center gap-3 rounded-full font-black text-base uppercase tracking-wide transition-all
                    ${
                      added
                        ? "bg-green-500 text-white"
                        : "bg-[#0a0a0a] text-[#f8f8f8] hover:bg-zinc-800"
                    }
                  `}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5" strokeWidth={3} />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>

              {/* Trust signals */}
              <div className="mt-8 pt-8 border-t-2 border-zinc-100 flex flex-col gap-2">
                {[
                  "Free standard shipping on orders over $40",
                  "30-day hassle-free returns",
                  "Made in the USA",
                ].map((t) => (
                  <p key={t} className="text-sm font-medium text-zinc-400">
                    ✓ {t}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
