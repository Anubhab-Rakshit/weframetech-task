import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductSlider from "@/components/ProductSlider";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

// Full-bleed marquee strip
const MarqueeStrip = () => {
  const items = [
    "Cards Against Humanity",
    "A party game for horrible people.",
    "Making the world a worse place, one card at a time.",
    "Best. Worst. Game.",
    "Horrible things in small boxes.",
  ];
  const fullList = [...items, ...items];

  return (
    <div className="bg-white border-y-[3px] border-black overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-marquee-slow py-6">
        {fullList.map((item, i) => (
          <span
            key={i}
            className="text-black font-black text-5xl md:text-7xl uppercase tracking-tighter px-12"
            style={{ fontFamily: "'Helvetica Neue', 'Inter', Arial, sans-serif", fontWeight: 900 }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <ProductSlider />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
