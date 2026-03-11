"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";

// Official shop megamenu categories with colorful backgrounds
// matching what was seen in the official site screenshot
const SHOP_CATEGORIES = [
  {
    title: "All Products",
    href: "/products",
    bg: "bg-[#c084fc]", // purple
    image: null,
  },
  {
    title: "Expansions",
    href: "/products#expansions",
    bg: "bg-[#facc15]", // yellow
    image: null,
  },
  {
    title: "Twists",
    href: "/products#twists",
    bg: "bg-[#7dd3fc]", // blue
    image: null,
  },
];

const ABOUT_LINKS = [
  { title: "How to Play", href: "/how-to-play" },
  { title: "Our Story", href: "/story" },
  { title: "Jack Rochester", href: "/story" },
  { title: "Press", href: "/press" },
  { title: "Jobs", href: "/jobs" },
];

import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<null | "shop" | "about">(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Mock cart state for UI demonstration
  const [cartItems, setCartItems] = useState([
    {
      id: "more-cah",
      name: "More Cards Against Humanity",
      price: 29,
      quantity: 1,
      image: "https://www.cardsagainsthumanity.com/static/img/shop/more-cah.png",
    }
  ]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setActiveMenu(null);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 ${
          isScrolled || activeMenu ? "bg-black" : "bg-transparent"
        }`}
      >
        <div
          className="flex items-center justify-between px-6 md:px-10"
          style={{ height: "68px" }}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="text-white font-black leading-[0.85] tracking-tight uppercase hover:opacity-80 transition-opacity"
            style={{
              fontSize: "clamp(13px, 1.4vw, 18px)",
              fontFamily: "'Helvetica Neue', 'Inter', Arial, sans-serif",
            }}
          >
            Cards Against
            <br />
            Humanity
          </Link>

          {/* Desktop Nav — right side */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Shop */}
            <button
              onClick={() => setActiveMenu(activeMenu === "shop" ? null : "shop")}
              className="flex items-center gap-1.5 text-white font-black uppercase px-4 py-3 hover:opacity-70 transition-opacity"
              style={{
                fontSize: "clamp(14px, 1.2vw, 17px)",
                fontFamily: "'Helvetica Neue', 'Inter', Arial, sans-serif",
              }}
            >
              Shop
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "shop" ? "rotate-180" : ""}`}
                strokeWidth={2.5}
              />
            </button>

            {/* About */}
            <button
              onClick={() => setActiveMenu(activeMenu === "about" ? null : "about")}
              className="flex items-center gap-1.5 text-white font-black uppercase px-4 py-3 hover:opacity-70 transition-opacity"
              style={{
                fontSize: "clamp(14px, 1.2vw, 17px)",
                fontFamily: "'Helvetica Neue', 'Inter', Arial, sans-serif",
              }}
            >
              About
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "about" ? "rotate-180" : ""}`}
                strokeWidth={2.5}
              />
            </button>

            {/* Cart — official \ N / style */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-white font-black hover:opacity-70 transition-opacity px-4 py-3"
              style={{
                fontSize: "clamp(14px, 1.2vw, 17px)",
                fontFamily: "'Helvetica Neue', 'Inter', Arial, sans-serif",
              }}
            >
              \ {cartCount} /
            </button>
          </div>
        </div>

        {/* Megamenu */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="bg-black border-t border-white/10 w-full"
            >
              {activeMenu === "shop" ? (
                // Official shop megamenu: left col = tagline + CTA, right cols = category tiles
                <div className="flex items-start gap-8 px-10 py-8">
                  {/* Left column */}
                  <div className="w-1/4 flex-shrink-0 pr-8">
                    <p
                      className="text-white font-black leading-tight mb-8"
                      style={{
                        fontSize: "clamp(22px, 2.5vw, 36px)",
                        fontFamily: "'Helvetica Neue', 'Inter', Arial, sans-serif",
                      }}
                    >
                      A party game
                      <br />
                      for horrible
                      <br />
                      people.
                    </p>
                    <Link
                      href="/products"
                      onClick={closeMenu}
                      className="inline-block bg-white text-black font-black rounded-full px-7 py-3 hover:bg-white/90 transition-colors uppercase"
                      style={{
                        fontSize: "14px",
                        fontFamily: "'Helvetica Neue', 'Inter', Arial, sans-serif",
                      }}
                    >
                      Buy Stuff
                    </Link>
                  </div>

                  {/* Right: category tiles */}
                  <div className="flex gap-4 flex-1">
                    {SHOP_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.title}
                        href={cat.href}
                        onClick={closeMenu}
                        className="group flex-1 min-w-0"
                      >
                        <div
                          className={`${cat.bg} rounded-2xl overflow-hidden aspect-[4/3] mb-3 flex items-end p-4 group-hover:scale-[1.02] transition-transform`}
                        >
                          {/* Placeholder visual */}
                          <div className="w-full h-full opacity-0" />
                        </div>
                        <p
                          className="text-white font-black group-hover:underline underline-offset-4 decoration-2"
                          style={{
                            fontSize: "clamp(18px, 1.8vw, 24px)",
                            fontFamily: "'Helvetica Neue', 'Inter', Arial, sans-serif",
                          }}
                        >
                          {cat.title}
                        </p>
                      </Link>
                    ))}
                  </div>

                  <button
                    onClick={closeMenu}
                    className="text-white/40 hover:text-white transition-colors ml-4 flex-shrink-0"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                // About megamenu: simple link list
                <div className="flex items-start gap-16 px-10 py-8">
                  <div className="flex flex-col gap-4">
                    {ABOUT_LINKS.map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        onClick={closeMenu}
                        className="text-white font-black hover:opacity-60 transition-opacity"
                        style={{
                          fontSize: "clamp(20px, 2.2vw, 32px)",
                          fontFamily: "'Helvetica Neue', 'Inter', Arial, sans-serif",
                        }}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                  <button
                    onClick={closeMenu}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Backdrop when menu is open */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer Container */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
    </>
  );
};

export default Navbar;