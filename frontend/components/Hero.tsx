"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

const CARD_DATA = [
  { text: "What's big, sweaty, and fantastic?", color: "black", x: -20, y: -25, rotate: -15 },
  { text: "I'm Ted Cruz, and I'm proud to endorse _________.", color: "black", x: 15, y: -35, rotate: 10 },
  { text: "A stinky hoo-ha.", color: "white", x: 40, y: -10, rotate: 20 },
  { text: "Bananas.", color: "white", x: -45, y: 15, rotate: -8 },
  { text: "Colluding with Russia.", color: "white", x: -15, y: 35, rotate: 12 },
  { text: "A sticky tree hole full of pancake sauce.", color: "white", x: 25, y: 25, rotate: -10 },
  { text: "After phasing out orca shows, Seaworld is now attracting customers with _________.", color: "black", x: 0, y: 0, scale: 1.1, zIndex: 10 },
];

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 40;
      const y = (clientY / window.innerHeight - 0.5) * 40;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[120vh] flex flex-col items-center justify-center overflow-hidden bg-black py-32 cursor-default">
      {/* Scattered Cards with Parallax */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center">
          {CARD_DATA.map((card, i) => (
            <motion.div
              key={i}
              className={`absolute w-72 md:w-80 rounded-3xl p-8 flex flex-col justify-between
                ${card.color === "black" ? "bg-black text-white border border-white/20" : "bg-white text-black"}
              `}
              style={{
                x: `${card.x}vw`,
                y: `${card.y}vh`,
                rotate: card.rotate || 0,
                scale: card.scale || 1,
                zIndex: card.zIndex || i,
                boxShadow: "0 20px 80px -10px rgba(0,0,0,0.8)",
                translateX: useTransform(springX, (v) => v * (i + 1) * 0.2),
                translateY: useTransform(springY, (v) => v * (i + 1) * 0.2),
              }}
            >
              <p className="text-xl md:text-2xl font-black leading-tight">
                {card.text}
              </p>
              <div className="flex items-center gap-2 mt-12 opacity-30">
                <div className="w-6 h-6 rounded-full border-2 border-current" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Cards Against Humanity
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white display-title mb-12"
        >
          Cards
          <br />
          Against
          <br />
          Humanity
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/60 text-xl md:text-2xl font-black max-w-2xl mx-auto mb-16 leading-[1.1]"
        >
          A party game for horrible people.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/products" className="btn-cah text-2xl px-12 py-6">
            Buy Stuff
          </Link>
        </motion.div>
      </div>

      {/* NPR Quote */}
      <div className="absolute bottom-12 left-12 z-20 hidden lg:flex items-center gap-6 opacity-40 hover:opacity-100 transition-opacity">
        <div className="w-16 h-px bg-white/20" /> {/* Fallback for broken laurel */}
        <div className="text-center">
          <p className="text-white text-4xl font-black italic">“Bad.”</p>
          <p className="text-white/60 text-sm font-black uppercase tracking-widest">NPR</p>
        </div>
        <div className="w-16 h-px bg-white/20" /> {/* Fallback for broken laurel */}
      </div>
    </section>
  );
};

export default Hero;
