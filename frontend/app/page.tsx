import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductSlider from "@/components/ProductSlider";
import Footer from "@/components/Footer";

const MarqueeOfficial = () => {
  const items = [
    "Cards Against Humanity",
    "A party game for horrible people.",
    "Making the world a worse place.",
    "Best seller.",
    "Horrible things in small boxes.",
  ];

  return (
    <div className="bg-white py-12 border-y-4 border-black overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-marquee-slow">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-black font-black text-6xl md:text-8xl uppercase tracking-tighter px-12"
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
        
        {/* Horizontal Marquee (Big & Bold) */}
        <section className="relative z-20 -mt-12">
           <MarqueeOfficial />
        </section>

        {/* Product Carousel */}
        <ProductSlider />

        {/* Dynamic CMS Sections would go here (Page Builder style) */}
        <section className="bg-white py-40">
          <div className="cah-container grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="order-2 md:order-1">
               <div className="relative group">
                  <div className="absolute inset-0 bg-black rounded-3xl translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform" />
                  <div className="relative bg-black rounded-3xl p-12 aspect-square flex flex-col justify-between border-2 border-white/20">
                     <div className="w-12 h-12 rounded-full border-4 border-white/40" />
                     <div>
                        <p className="text-white text-4xl md:text-5xl font-black leading-tight mb-8">
                           What's fun until it gets weird?
                        </p>
                        <p className="text-white/40 font-black uppercase tracking-widest">
                           Cards Against Humanity
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="order-1 md:order-2">
               <h2 className="text-black section-heading mb-12">
                  The game<br />that changed<br />everything.
               </h2>
               <p className="text-black/60 text-2xl font-black leading-[1.2] mb-12">
                  Cards Against Humanity is a fill-in-the-blank party game that turns your dirtiest thoughts and most random trivia into something truly special.
               </p>
               <button className="btn-cah btn-cah-black text-2xl px-12 py-6">
                  Learn how to play
               </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
