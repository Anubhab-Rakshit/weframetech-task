"use client";

import React from "react";
import { useCart, useDeleteLineItem, useUpdateLineItem } from "medusa-react";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { cart } = useCart();
  const deleteItem = useDeleteLineItem(cart?.id!);
  const updateItem = useUpdateLineItem(cart?.id!);

  const subtotal = cart?.subtotal ? cart.subtotal / 100 : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l-4 border-black z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b-4 border-black flex items-center justify-between">
              <h2 className="text-3xl font-black uppercase flex items-center gap-3">
                <ShoppingBag className="w-8 h-8" /> Your Cart
              </h2>
              <button onClick={onClose} className="hover:scale-125 transition-transform">
                <X className="w-10 h-10" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {!cart?.items?.length ? (
                <div className="text-center py-20">
                   <p className="text-xl font-bold text-zinc-400">Your cart is empty.</p>
                   <button 
                     onClick={onClose}
                     className="mt-6 font-black border-b-4 border-black uppercase"
                   >
                     Go Shop
                   </button>
                </div>
              ) : (
                cart.items.map((item) => (
                  <div key={item.id} className="flex gap-6">
                    <div className="w-24 h-32 bg-brand-gray border-2 border-black rounded-xl overflow-hidden shrink-0">
                      {/* Image placeholder */}
                      <div className="w-full h-full bg-white flex items-center justify-center p-2 text-[10px] font-bold text-center">
                        {item.title}
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                       <h3 className="font-black text-xl leading-tight">{item.title}</h3>
                       <p className="font-bold">${item.unit_price / 100}</p>
                       
                       <div className="flex items-center gap-4 pt-2">
                         <div className="flex items-center border-2 border-black rounded-full px-3 py-1">
                           <button onClick={() => updateItem.mutate({ lineId: item.id, quantity: item.quantity - 1 })}><Minus className="w-4 h-4" /></button>
                           <span className="w-8 text-center font-bold">{item.quantity}</span>
                           <button onClick={() => updateItem.mutate({ lineId: item.id, quantity: item.quantity + 1 })}><Plus className="w-4 h-4" /></button>
                         </div>
                         <button 
                           onClick={() => deleteItem.mutate({ lineId: item.id })}
                           className="text-sm font-bold border-b-2 border-black"
                         >
                           Remove
                         </button>
                       </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-8 border-t-4 border-black bg-brand-gray">
               <div className="flex items-center justify-between mb-8">
                 <span className="text-xl font-bold">Subtotal</span>
                 <span className="text-2xl font-black">${subtotal}</span>
               </div>
               <button 
                 disabled={!cart?.items?.length}
                 className="cah-button w-full h-16 text-2xl uppercase disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 Checkout
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
