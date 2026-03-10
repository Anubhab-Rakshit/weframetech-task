"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Plus } from "lucide-react";

interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  isNew?: boolean;
  badge?: string;
  description: string;
  cardCount?: string;
}

const PRODUCTS: Product[] = [
  {
    id: "main-game",
    slug: "main-game",
    title: "Cards Against Humanity",
    price: 25,
    description: "The main game. 500 white cards and 100 black cards.",
    cardCount: "500 white + 100 black",
  },
  {
    id: "more-cah",
    slug: "more-cah",
    title: "More Cards Against Humanity",
    price: 10,
    badge: "New",
    isNew: true,
    description: "300 all-new cards you can add to your game.",
    cardCount: "300 cards",
  },
  {
    id: "family-edition",
    slug: "family-edition",
    title: "Family Edition",
    price: 25,
    description: "For the whole family. As dirty as you want it to be.",
    cardCount: "550 cards",
  },
  {
    id: "period-pack",
    slug: "period-pack",
    title: "Period Pack",
    price: 5,
    description: "A period expansion pack made by women.",
    cardCount: "30 cards",
  },
  {
    id: "weed-pack",
    slug: "weed-pack",
    title: "Weed Pack",
    price: 5,
    description: "420 cards about weed. Get it? 420?",
    cardCount: "20 cards",
  },
  {
    id: "science-pack",
    slug: "science-pack",
    title: "Science Pack",
    price: 5,
    description: "We worked with scientists to make science hilarious.",
    cardCount: "75 cards",
  },
];

const ProductCard = ({ product }: { product: Product }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const isBlackCard = product.id === "main-game" || product.id === "period-pack";

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="cah-card overflow-hidden h-full flex flex-col">
        {/* Card Visual */}
        <div
          className={`relative aspect-[3/4] flex flex-col justify-between p-6 rounded-xl mb-4 border-2 border-[#0a0a0a] transition-transform duration-300 group-hover:scale-[1.01]
            ${isBlackCard ? "bg-[#0a0a0a] text-[#f8f8f8]" : "bg-[#f8f8f8] text-[#0a0a0a]"}`}
        >
          {/* Badge */}
          {product.isNew && (
            <div className="absolute top-4 right-4">
              <span className="bg-[#ff3366] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                New
              </span>
            </div>
          )}

          {/* CAH Logo mark */}
          <div>
            <div className={`w-7 h-7 rounded-full border-2 ${isBlackCard ? "border-white/60" : "border-black/30"}`} />
          </div>

          {/* Card text */}
          <div>
            <p className="text-2xl font-black leading-tight mb-3">{product.title}</p>
            {product.cardCount && (
              <p
                className={`text-xs font-bold uppercase tracking-widest ${
                  isBlackCard ? "text-white/50" : "text-black/40"
                }`}
              >
                {product.cardCount}
              </p>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex items-end justify-between mt-auto p-1">
          <div>
            <p className="font-black text-sm">{product.title}</p>
            <p className="text-zinc-500 text-sm font-medium">${product.price}.00</p>
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase transition-all border-2
              ${
                added
                  ? "bg-green-500 border-green-500 text-white scale-90"
                  : "bg-[#0a0a0a] border-[#0a0a0a] text-white hover:bg-white hover:text-[#0a0a0a]"
              }`}
          >
            {added ? (
              "Added ✓"
            ) : (
              <>
                <Plus className="w-3 h-3" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

const ProductGrid = ({ limit }: { limit?: number }) => {
  const displayed = limit ? PRODUCTS.slice(0, limit) : PRODUCTS;

  return (
    <section id="products" className="py-24 bg-[#f8f8f8]">
      <div className="cah-container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3">The Collection</p>
            <h2 className="section-title">Shop All</h2>
          </div>
          {limit && (
            <Link href="/products" className="cah-button-outline text-sm px-6 py-3">
              View All →
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
