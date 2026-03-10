import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <div className="bg-[#0a0a0a] text-[#f8f8f8] py-24">
          <div className="cah-container">
            <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-4">
              Everything We Make
            </p>
            <h1 className="section-title">Shop All Products</h1>
          </div>
        </div>

        <ProductGrid />
      </main>
      <Footer />
    </>
  );
}
