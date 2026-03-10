"use client";

import React, { useState } from "react";
import { useCart, useUpdateCart, useSetPaymentSession, useCompleteCart } from "medusa-react";
import { ChevronRight, CheckCircle2, Truck, CreditCard, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const { cart } = useCart();
  const updateCart = useUpdateCart(cart?.id!);
  const setPaymentSession = useSetPaymentSession(cart?.id!);
  const completeCart = useCompleteCart(cart?.id!);
  
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  
  const [shippingData, setShippingData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleNextStep = () => {
    if (step === 1) {
      // Update cart with shipping address logic (simplified)
      setStep(2);
    } else if (step === 2) {
      // Set dummy payment session
      setStep(3);
    }
  };

  const handleComplete = () => {
    completeCart.mutate(undefined, {
      onSuccess: () => {
        // Redirect to success page
      }
    });
  };

  const subtotal = cart?.subtotal ? cart.subtotal / 100 : 0;

  return (
    <div className="pt-32 pb-20 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h1 className="text-5xl font-black uppercase mb-12">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Checkout Form */}
          <div className="flex-1 space-y-8">
            {/* Step Indicators */}
            <div className="flex items-center gap-4 mb-12">
              <div className={`flex items-center gap-2 ${step >= 1 ? "text-black" : "text-zinc-400"}`}>
                <span className={`w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold`}>1</span>
                <span className="font-black uppercase text-sm">Shipping</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-300" />
              <div className={`flex items-center gap-2 ${step >= 2 ? "text-black" : "text-zinc-400"}`}>
                <span className={`w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold`}>2</span>
                <span className="font-black uppercase text-sm">Payment</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-300" />
              <div className={`flex items-center gap-2 ${step >= 3 ? "text-black" : "text-zinc-400"}`}>
                <span className={`w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold`}>3</span>
                <span className="font-black uppercase text-sm">Review</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="cah-card bg-white p-8 md:p-12"
                >
                  <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-4">
                    <Truck className="w-8 h-8" /> Shipping Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                       <label className="block font-black uppercase text-xs mb-2">Email</label>
                       <input type="email" className="w-full border-4 border-zinc-100 rounded-xl p-4 font-bold outline-none focus:border-black transition-colors" />
                    </div>
                    <div>
                       <label className="block font-black uppercase text-xs mb-2">First Name</label>
                       <input type="text" className="w-full border-4 border-zinc-100 rounded-xl p-4 font-bold outline-none focus:border-black transition-colors" />
                    </div>
                    <div>
                       <label className="block font-black uppercase text-xs mb-2">Last Name</label>
                       <input type="text" className="w-full border-4 border-zinc-100 rounded-xl p-4 font-bold outline-none focus:border-black transition-colors" />
                    </div>
                    <div className="md:col-span-2">
                       <label className="block font-black uppercase text-xs mb-2">Address</label>
                       <input type="text" className="w-full border-4 border-zinc-100 rounded-xl p-4 font-bold outline-none focus:border-black transition-colors" />
                    </div>
                  </div>
                  <button onClick={handleNextStep} className="cah-button mt-12 w-full md:w-auto px-12">
                    Continue to Payment
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="cah-card bg-white p-8 md:p-12"
                >
                  <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-4">
                    <CreditCard className="w-8 h-8" /> Payment Method
                  </h2>
                  <div className="space-y-4">
                     <label className="flex items-center gap-4 p-6 border-4 border-black rounded-2xl cursor-pointer bg-zinc-50">
                        <input type="radio" checked className="w-6 h-6 accent-black" readOnly />
                        <div className="flex-1">
                          <p className="font-black uppercase">Dummy Payment</p>
                          <p className="text-sm font-bold text-zinc-500">Test the checkout flow without real charges.</p>
                        </div>
                     </label>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 mt-12">
                    <button onClick={() => setStep(1)} className="cah-button-outline px-12">Back</button>
                    <button onClick={handleNextStep} className="cah-button px-12">Review Order</button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="cah-card bg-white p-8 md:p-12"
                >
                  <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-4">
                    <CheckCircle2 className="w-8 h-8" /> Review Order
                  </h2>
                  <p className="text-xl font-bold mb-8">Please check your details before placing the order.</p>
                  
                  <div className="flex flex-col md:flex-row gap-4 mt-12">
                    <button onClick={() => setStep(2)} className="cah-button-outline px-12">Back</button>
                    <button onClick={handleComplete} className="cah-button px-12 flex-1">Place Order</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          <div className="w-full lg:w-96">
             <div className="cah-card bg-white p-8 sticky top-32">
                <h3 className="text-2xl font-black uppercase mb-8 flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6" /> Summary
                </h3>
                <div className="space-y-4 mb-8">
                  {cart?.items?.map((item) => (
                    <div key={item.id} className="flex justify-between font-bold text-sm">
                       <span>{item.quantity}x {item.title}</span>
                       <span>${(item.unit_price * item.quantity) / 100}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t-4 border-black pt-6 space-y-3">
                   <div className="flex justify-between font-bold">
                     <span>Subtotal</span>
                     <span>${subtotal}</span>
                   </div>
                   <div className="flex justify-between font-bold">
                     <span>Shipping</span>
                     <span>$0.00</span>
                   </div>
                   <div className="flex justify-between text-2xl font-black pt-4">
                     <span>Total</span>
                     <span>${subtotal}</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
