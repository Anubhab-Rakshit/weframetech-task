"use client";

import React, { useState } from "react";
import { Plus, Minus, ChevronRight, ChevronLeft, ShoppingCart } from "lucide-react";
import { useCart, useCreateLineItem } from "medusa-react";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { cart } = useCart();
  const addLineItem = useCreateLineItem(cart?.id!);

  // In a real app, this would be fetched from CMS/Medusa based on the slug
  const product = {
    title: "More Cards Against Humanity",
    price: 30,
    description: "It's a box with a bunch of cards in it. What did you expect?",
    variantId: "variant_3",
    features: [
      "300 all-new cards to add to your game.",
      "This is an expansion. Requires the main game.",
      "Makes your life 4% better, temporarily.",
    ],
    images: [
      "/images/more_cah_1.png",
      "/images/more_cah_2.png",
      "/images/more_cah_3.png",
    ]
  };

  const handleAddToCart = () => {
    addLineItem.mutate({
      variant_id: product.variantId,
      quantity,
    });
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="cah-card bg-brand-gray aspect-square flex items-center justify-center relative overflow-hidden p-0 border-4">
               <div className="w-full h-full bg-white flex items-center justify-center p-12">
                 <div className="text-center font-black text-4xl uppercase">
                   {product.title} <br /> Image {activeImage + 1}
                 </div>
               </div>
               
               <button 
                 className="absolute left-4 top-1/2 -translate-y-1/2 bg-white border-2 border-black p-2 rounded-full hover:bg-black hover:text-white transition-colors"
                 onClick={() => setActiveImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
               >
                 <ChevronLeft className="w-8 h-8" />
               </button>
               <button 
                 className="absolute right-4 top-1/2 -translate-y-1/2 bg-white border-2 border-black p-2 rounded-full hover:bg-black hover:text-white transition-colors"
                 onClick={() => setActiveImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
               >
                 <ChevronRight className="w-8 h-8" />
               </button>
            </div>
            
            <div className="flex gap-4">
              {product.images.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-24 h-24 border-2 rounded-xl transition-all ${activeImage === idx ? "border-black scale-105" : "border-zinc-200"}`}
                >
                  <div className="w-full h-full bg-brand-gray flex items-center justify-center text-xs font-bold">
                    IMG {idx + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl md:text-7xl font-black uppercase mb-6 leading-tight">
              {product.title}
            </h1>
            <p className="text-3xl font-bold mb-8">${product.price}</p>
            
            <div className="space-y-6 mb-12">
              <p className="text-xl font-medium text-zinc-600">
                {product.description}
              </p>
              <ul className="space-y-4">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-black shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center border-4 border-black rounded-full px-6 py-3 h-16">
                <button 
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Minus className="w-6 h-6" />
                </button>
                <span className="w-12 text-center text-2xl font-black">{quantity}</span>
                <button 
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                disabled={addLineItem.isLoading}
                className="cah-button h-16 flex-1 flex items-center justify-center gap-4 text-2xl uppercase disabled:opacity-50"
              >
                <ShoppingCart className="w-8 h-8" />
                {addLineItem.isLoading ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
