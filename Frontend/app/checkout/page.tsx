"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import Navbar from "@/app/components/Navbar";
import { clothingItems } from "@/lib/data";
import { ShieldCheck, Truck } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const cartProducts = cartItems.map(id => clothingItems.find(item => item.id === id)).filter(Boolean) as typeof clothingItems;
  const cartTotal = cartProducts.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsSubmitting(true);

    const orderItemsRecord: Record<number, any> = {};
    cartItems.forEach(id => {
      if (!orderItemsRecord[id]) {
        const product = clothingItems.find(item => item.id === id);
        if (product) {
          orderItemsRecord[id] = { ...product, quantity: 1 };
        }
      } else {
        orderItemsRecord[id].quantity += 1;
      }
    });

    const items = Object.values(orderItemsRecord);

    try {
      const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          totalAmount: cartTotal,
          items,
        }),
      });

      if (!response.ok) throw new Error("Failed to place order.");

      alert("Order placed successfully via Cash on Delivery!");
      clearCart();
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("There was an issue placing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Form */}
        <div>
          <p className="text-[#C9A96E] text-xs tracking-[0.5em] uppercase mb-3" style={{ fontFamily: "'Jost', sans-serif" }}>
            Secure Checkout
          </p>
          <h1
            className="text-5xl font-light text-[#F5F0E8] mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
          >
            Checkout
          </h1>
          <div className="h-px w-12 bg-[#C9A96E] mb-10" />

          <div className="bg-[#161616] border border-[#C9A96E]/15 p-8">
            <h2
              className="text-xs tracking-[0.3em] uppercase text-[#888] mb-8"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Shipping Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
                { id: "phone", label: "Phone Number", type: "tel", placeholder: "+1 234 567 8900" },
                { id: "address", label: "Full Address", type: "text", placeholder: "123 Main St, City, Country" },
              ].map((field) => (
                <div key={field.id} className="space-y-2">
                  <label
                    htmlFor={field.id}
                    className="block text-[#888] text-[11px] tracking-[0.2em] uppercase"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    required
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className="w-full bg-[#0A0A0A] border border-[#C9A96E]/20 text-[#F5F0E8] px-4 py-3 text-sm placeholder-[#555] focus:outline-none focus:border-[#C9A96E] transition-colors duration-300"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  />
                </div>
              ))}

              {/* COD notice */}
              <div className="flex items-center gap-3 p-4 border border-[#C9A96E]/20 bg-[#C9A96E]/5 mt-2">
                <Truck className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                <p className="text-[#888] text-xs leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
                  Cash on Delivery — Pay when your order arrives at your doorstep. Free shipping included.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || cartItems.length === 0}
                className="w-full btn-gold-filled py-4 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "Place Order — Cash on Delivery"}
              </button>
            </form>
          </div>

          {/* Trust badge */}
          <div className="flex items-center gap-2 mt-6">
            <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
            <span className="text-[#555] text-xs tracking-wide" style={{ fontFamily: "'Jost', sans-serif" }}>
              Your information is safe and encrypted
            </span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:mt-16">
          <h2
            className="text-xs tracking-[0.4em] uppercase text-[#888] mb-6"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Order Summary
          </h2>

          <div className="bg-[#161616] border border-[#C9A96E]/15 p-8">
            {cartProducts.length === 0 ? (
              <p className="text-[#555] text-sm text-center py-8" style={{ fontFamily: "'Jost', sans-serif" }}>
                Your cart is empty.
              </p>
            ) : (
              <div className="space-y-6">
                {cartProducts.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b border-[#C9A96E]/10 pb-5">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover border border-[#C9A96E]/10" />
                      <div>
                        <h4 className="text-[#F5F0E8] text-sm font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>{item.name}</h4>
                        <p className="text-[#555] text-xs mt-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>{item.color}</p>
                      </div>
                    </div>
                    <p className="text-[#C9A96E] text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                ))}

                <div className="pt-2 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#555] text-xs tracking-wide uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>Subtotal</span>
                    <span className="text-[#888] text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#555] text-xs tracking-wide uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>Shipping (COD)</span>
                    <span className="text-[#C9A96E] text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>Free</span>
                  </div>
                  <div className="h-px bg-[#C9A96E]/20 my-2" />
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#888] text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>Total</span>
                    <span className="text-[#C9A96E] text-2xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
