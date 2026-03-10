import React from "react";
import Link from "next/link";
import { Twitter, Instagram, Youtube } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/products" },
    { label: "Main Game", href: "/products/main-game" },
    { label: "More CAH", href: "/products/more-cah" },
    { label: "Expansions", href: "/products/expansions" },
    { label: "Family Edition", href: "/products/family-edition" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Press", href: "/press" },
    { label: "Careers", href: "/careers" },
  ],
  Help: [
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-[#f8f8f8] pt-20 pb-10">
      <div className="cah-container">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-black text-2xl uppercase tracking-tighter leading-tight block mb-6">
              Cards Against
              <br />
              Humanity
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-8">
              A party game for horrible people. Invented in 2011 by a group of friends in Chicago.
            </p>
            {/* Social */}
            <div className="flex gap-4">
              {[
                { Icon: Twitter, href: "https://twitter.com/CAH" },
                { Icon: Instagram, href: "https://instagram.com/cardsagainsthumanity" },
                { Icon: Youtube, href: "https://youtube.com" },
              ].map(({ Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/80 hover:bg-white/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-black text-xs uppercase tracking-widest text-white/40 mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-white/70 hover:text-white text-sm font-medium transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-xs">
          <p className="font-medium">© {new Date().getFullYear()} Cards Against Humanity LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
