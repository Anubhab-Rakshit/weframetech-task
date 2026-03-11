"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartDrawerProps) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[201] w-full max-w-[480px] bg-white text-black flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="relative p-8 flex items-center justify-center border-b border-black/10">
              <button
                onClick={onClose}
                className="absolute left-8 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
              <h2 className="text-3xl font-black uppercase tracking-tight">Cart</h2>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-xl font-bold text-black/40 mb-4">Your cart is empty.</p>
                  <button
                    onClick={onClose}
                    className="text-black font-black underline underline-offset-4 decoration-2 hover:opacity-70 transition-opacity"
                  >
                    Go buy some stuff
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-6 pb-8 border-b border-black/5 last:border-0 relative group">
                      <div className="w-24 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-black/5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-black leading-tight max-w-[180px] hover:underline cursor-pointer">
                            {item.name}
                          </h3>
                          <button 
                            onClick={() => onRemove(item.id)}
                            className="text-black/40 hover:text-black transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-4 bg-black/5 rounded-full px-4 py-2">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="hover:opacity-60 transition-opacity"
                            >
                              <Minus className="w-4 h-4" strokeWidth={3} />
                            </button>
                            <span className="text-lg font-black min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="hover:opacity-60 transition-opacity"
                            >
                              <Plus className="w-4 h-4" strokeWidth={3} />
                            </button>
                          </div>
                          <p className="text-xl font-black">€{item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-black/10 space-y-6">
                <div className="flex justify-between items-center px-2">
                  <span className="text-2xl font-black">Subtotal</span>
                  <span className="text-2xl font-black">€{subtotal}</span>
                </div>
                <button
                  className="w-full bg-black text-white font-black py-6 rounded-full text-xl hover:scale-[1.02] transition-transform active:scale-95 shadow-lg"
                >
                  Check Out
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
