"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, ShoppingBag } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<null | "shop" | "about">(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = {
    shop: [
      {
        title: "All Products",
        image: "https://www.cardsagainsthumanity.com/static/img/shop/all-products.png",
        href: "/products",
      },
      {
        title: "Main Games",
        image: "https://www.cardsagainsthumanity.com/static/img/shop/main-games.png",
        href: "/products#main",
      },
      {
        title: "Expansions",
        image: "https://www.cardsagainsthumanity.com/static/img/shop/expansions.png",
        href: "/products#expansions",
      },
    ],
    about: [
      { title: "How to Play", href: "/how-to-play" },
      { title: "Our Story", href: "/story" },
      { title: "Press", href: "/press" },
    ],
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? "bg-black py-4 shadow-cah" : "bg-transparent py-8"
      }`}
    >
      <div className="cah-container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group">
          <motion.div
            className="text-white font-black text-2xl leading-[0.85] tracking-tighter uppercase"
            whileHover={{ scale: 1.02 }}
          >
            Cards Against
            <br />
            Humanity
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12 font-black text-white uppercase text-lg">
          <button
            onClick={() => setActiveMenu(activeMenu === "shop" ? null : "shop")}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            Shop <ChevronDown className={`w-5 h-5 transition-transform ${activeMenu === "shop" ? "rotate-180" : ""}`} />
          </button>
          <button
            onClick={() => setActiveMenu(activeMenu === "about" ? null : "about")}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            About <ChevronDown className={`w-5 h-5 transition-transform ${activeMenu === "about" ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Cart */}
        <Link href="/cart" className="flex items-center text-white font-black text-2xl tracking-tighter hover:scale-110 transition-transform">
          \ {cartCount} /
        </Link>
      </div>

      {/* Megamenu Backdrop */}
      <AnimatePresence>
        {activeMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveMenu(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[-1]"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-black border-t border-white/10 p-12 shadow-2xl"
            >
              <div className="cah-container">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-white/40 font-black uppercase tracking-widest text-sm">
                    {activeMenu === "shop" ? "Choose your path to hell" : "Learn our lore"}
                  </h3>
                  <button onClick={() => setActiveMenu(null)} className="text-white/40 hover:text-white">
                    <X className="w-8 h-8" />
                  </button>
                </div>

                <div className={`grid ${activeMenu === "shop" ? "grid-cols-3" : "grid-cols-4"} gap-8`}>
                  {activeMenu === "shop" ? (
                    menuItems.shop.map((item) => (
                      <Link key={item.title} href={item.href} onClick={() => setActiveMenu(null)} className="group">
                        <div className="bg-white/5 aspect-video rounded-xl overflow-hidden mb-4 border border-white/10 group-hover:border-white transition-colors">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <span className="text-white font-black text-2xl group-hover:underline underline-offset-4 decoration-4">
                          {item.title}
                        </span>
                      </Link>
                    ))
                  ) : (
                    menuItems.about.map((item) => (
                      <Link key={item.title} href={item.href} onClick={() => setActiveMenu(null)} className="text-white font-black text-4xl hover:line-through transition-all decoration-white">
                        {item.title}
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
