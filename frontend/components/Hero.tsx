"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

// Content pools matching official CAH vibes
const BLACK_CARDS = [
  "Men like _________.",
  "What's my secret power?",
  "I drink to forget _________.",
  "What's the next Happy Meal toy?",
  "What's that smell?",
  "White people like _________.",
  "Next from J.K. Rowling: Harry Potter and the Chamber of _________.",
  "I'm sorry, Professor, but I couldn't complete my homework because of _________.",
  "What did I bring back from Mexico?",
  "What's the most emo?",
];

const WHITE_CARDS = [
  "Gloryholes.",
  "This boring-ass white bitch from work.",
  "Pulling out.",
  "My secret butt.",
  "A fuck-ton of almonds.",
  "Foul vegan shits.",
  "Natalie Portman.",
  "The glass ceiling.",
  "Meclizine.",
  "A low-speed chase.",
  "Pretending to be happy.",
  "A disappointing birthday party.",
  "The quiet majesty of the whale.",
  "72 vugins.",
  "The miracle of childbirth.",
  "A lifetime of sadness.",
  "Actually taking a candy from a baby.",
  "A balanced breakfast.",
  "Active listening.",
  "The blood of Christ.",
  "Dead parents.",
  "Waiting 'til marriage.",
  "The Pope.",
  "A Bop It™.",
  "Morgan Freeman's voice.",
];

// Random generation logic
const generateCards = () => {
  const blackCardIdx = Math.floor(Math.random() * BLACK_CARDS.length);
  const shuffledWhite = [...WHITE_CARDS].sort(() => 0.5 - Math.random());
  
  return [
    {
      id: `black-${Math.random()}`,
      color: "black",
      text: BLACK_CARDS[blackCardIdx],
      top: `${15 + Math.random() * 15}%`,
      left: `${35 + Math.random() * 10}%`,
      rotate: -8 + Math.random() * 16,
      zIndex: 20,
      parallaxFactor: 0.06,
    },
    ...shuffledWhite.slice(0, 6).map((text, i) => ({
      id: `white-${Math.random()}`,
      color: "white",
      text,
      // Scattered layout
      top: i < 3 ? `${-5 + Math.random() * 35}%` : `${40 + Math.random() * 45}%`,
      left: `${(i % 3) * 30 + Math.random() * 15 - 5}%`,
      rotate: -15 + Math.random() * 30,
      zIndex: 10 + i,
      parallaxFactor: 0.03 + Math.random() * 0.04,
    })),
  ];
};

const CardLogo = ({ inverted }: { inverted?: boolean }) => (
  <div className={`flex items-center gap-1.5 ${inverted ? "text-white" : "text-black"}`}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="3" width="9" height="12" rx="1.5" fill="currentColor" opacity="0.6" />
      <rect x="5" y="1" width="9" height="12" rx="1.5" fill="currentColor" />
    </svg>
    <span className="text-[9px] font-bold tracking-widest uppercase opacity-70">
      Cards Against Humanity
    </span>
  </div>
);

const LaurelLeft = () => (
  <svg width="40" height="52" viewBox="0 0 40 52" fill="none">
    <path d="M20 48c-4-8-12-12-16-20 4 2 10 2 14 6-2-6-8-10-10-16 4 4 8 6 12 12-2-8-6-14-6-20 4 6 6 12 8 20 0-8 0-16 4-22-2 8-2 16 0 24 2-8 4-16 10-20-4 6-8 14-8 22 4-6 8-12 14-14-6 4-10 12-12 20 4-4 10-8 16-8-8 2-12 10-14 18 4-2 10-4 14-2z" fill="white" />
  </svg>
);

const LaurelRight = () => (
  <svg width="40" height="52" viewBox="0 0 40 52" fill="none" style={{ transform: "scaleX(-1)" }}>
    <path d="M20 48c-4-8-12-12-16-20 4 2 10 2 14 6-2-6-8-10-10-16 4 4 8 6 12 12-2-8-6-14-6-20 4 6 6 12 8 20 0-8 0-16 4-22-2 8-2 16 0 24 2-8 4-16 10-20-4 6-8 14-8 22 4-6 8-12 14-14-6 4-10 12-12 20 4-4 10-8 16-8-8 2-12 10-14 18 4-2 10-4 14-2z" fill="white" />
  </svg>
);

const HeroCard = ({ card, mouseX, mouseY }: { card: any, mouseX: any, mouseY: any }) => {
  const isBlack = card.color === "black";
  const pf = card.parallaxFactor;

  const xPos = useTransform(mouseX, (v: number) => v * pf);
  const yPos = useTransform(mouseY, (v: number) => v * pf);

  const springX = useSpring(xPos, { stiffness: 60, damping: 20 });
  const springY = useSpring(yPos, { stiffness: 60, damping: 20 });

  const variants = {
    initial: { 
      opacity: 0, 
      scale: 0.8,
      x: Math.random() > 0.5 ? 1200 : -1200,
      y: Math.random() > 0.5 ? 1200 : -1200,
      rotate: card.rotate * 2
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      x: 0, 
      y: 0,
      rotate: card.rotate,
      transition: { 
        type: "spring" as const, 
        stiffness: 120, 
        damping: 18,
        delay: Math.random() * 0.25 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.5,
      x: parseFloat(card.left) > 50 ? 1200 : -1200,
      y: parseFloat(card.top) > 50 ? 1200 : -1200,
      rotate: card.rotate * 4,
      transition: { duration: 0.5, ease: "backIn" as const }
    },
    floating: {
      y: [0, -10, 0],
      rotate: [card.rotate, card.rotate - 1, card.rotate + 1, card.rotate],
      transition: {
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate={["animate", "floating"]}
      exit="exit"
      className="absolute select-none cursor-pointer group"
      style={{
        top: card.top,
        left: card.left,
        zIndex: card.zIndex,
        width: "clamp(180px, 18vw, 240px)",
        x: springX,
        y: springY,
      }}
    >
      <div
        className={`rounded-[1.2rem] flex flex-col justify-between overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-[1.05]
          ${isBlack ? "bg-[#111111] text-white border border-white/10" : "bg-white text-black border border-black/5"}
        `}
        style={{
          aspectRatio: "63 / 88",
          padding: "1.5rem",
        }}
      >
        <p className="font-black leading-[1.1] tracking-tight text-[1.2rem] sm:text-[1.4rem]">
          {card.text}
        </p>
        <CardLogo inverted={isBlack} />
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const [cards, setCards] = useState<any[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setCards(generateCards());
  }, []);

  const handleShuffle = useCallback((e: React.MouseEvent) => {
    setCards([]); 
    setTimeout(() => {
      setCards(generateCards());
    }, 450);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={heroRef}
      onMouseDown={handleShuffle}
      className="relative w-full h-[100dvh] overflow-hidden bg-black text-white cursor-default"
      style={{
        background: "radial-gradient(ellipse at 50% 100%, #0a0a20 0%, #000000 70%)"
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-blue-900/10 to-transparent opacity-40" />
      </div>

      <div className="relative w-full h-full z-0">
        <AnimatePresence mode="popLayout">
          {cards.map((card) => (
            <HeroCard key={card.id} card={card} mouseX={mouseX} mouseY={mouseY} />
          ))}
        </AnimatePresence>
      </div>

      <div className="absolute top-32 left-10 z-[12] pointer-events-none text-white overflow-visible">
        <h1 className="text-7xl md:text-[5rem] font-black leading-[0.8] tracking-tighter select-none opacity-100 drop-shadow-2xl">
          Cards
          <br />
          Against
          <br />
          Humanity
        </h1>
      </div>

      <div className="absolute bottom-10 left-10 z-[10] flex items-center gap-4 pointer-events-none select-none">
        <LaurelLeft />
        <div className="text-center">
          <p className="text-3xl font-black tracking-tighter serif italic text-white">"Bad."</p>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 text-white">NPR</p>
        </div>
        <LaurelRight />
      </div>
    </section>
  );
};

export default Hero;