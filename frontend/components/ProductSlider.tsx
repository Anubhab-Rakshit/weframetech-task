"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const PRODUCTS = [
  {
    id: "main",
    title: "Cards Against Humanity",
    tagline: "The main game.",
    color: "bg-[#bae6fd]", // Blue
    image: "https://images.unsplash.com/photo-1610819013583-6997841198f1?q=80&w=800&auto=format&fit=crop", // Placeholder
    description: "A party game for horrible people.",
    price: 25,
  },
  {
    id: "family",
    title: "Family Edition",
    tagline: "Play CAH with your kids.",
    color: "bg-[#fef08a]", // Yellow
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format&fit=crop", // Placeholder
    description: "Wholesome and totally appropriate.",
    price: 25,
  },
  {
    id: "everything",
    title: "Everything Box",
    tagline: "Mooooore cards!",
    color: "bg-[#fbcfe8]", // Pink
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=800&auto=format&fit=crop", // Placeholder
    description: "300 all-new cards to add to your game.",
    price: 20,
  },
  {
    id: "expansions",
    title: "The Expansions",
    tagline: "Endless suffering.",
    color: "bg-[#bbf7d0]", // Green
    image: "https://images.unsplash.com/photo-1496262967815-132206202600?q=80&w=800&auto=format&fit=crop", // Placeholder
    description: "Diverse packs for every interest.",
    price: 5,
  },
];

const ProductSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      containerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <section className="bg-black py-40 overflow-hidden">
      <div className="cah-container">
        <div className="flex items-end justify-between mb-16 px-4">
          <h2 className="text-white section-heading">Buy the game.</h2>
          
          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-16 h-16 rounded-full border-4 border-white flex items-center justify-center text-white transition-all
                ${!canScrollLeft ? "opacity-20 cursor-not-allowed" : "hover:bg-white hover:text-black"}
              `}
            >
              <ChevronLeft className="w-8 h-8" strokeWidth={3} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-16 h-16 rounded-full border-4 border-white flex items-center justify-center text-white transition-all
                ${!canScrollRight ? "opacity-20 cursor-not-allowed" : "hover:bg-white hover:text-black"}
              `}
            >
              <ChevronRight className="w-8 h-8" strokeWidth={3} />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 pb-12"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -10 }}
              className={`relative flex-shrink-0 w-[85vw] md:w-[600px] h-[700px] rounded-[3rem] ${product.color} snap-start overflow-hidden group`}
            >
              <Link href={`/products/${product.id}`} className="block h-full p-12 flex flex-col justify-between">
                <div>
                  <h3 className="text-black text-6xl font-black leading-none mb-4 tracking-tighter">
                    {product.title}
                  </h3>
                  <p className="text-black/60 text-2xl font-black uppercase tracking-widest leading-none">
                    {product.tagline}
                  </p>
                </div>

                <div className="relative h-full flex items-center justify-center py-12">
                   <motion.img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full object-contain z-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)]"
                      whileHover={{ scale: 1.05 }}
                    />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-black font-black text-lg">{product.description}</p>
                    <p className="text-black/40 font-black text-xl">${product.price}.00</p>
                  </div>
                  <button className="bg-black text-white px-8 py-4 rounded-full font-black uppercase text-xl hover:scale-105 transition-transform">
                    Buy Now
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
