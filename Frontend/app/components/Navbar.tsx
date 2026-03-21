"use client";

import { Menu, ShoppingBag, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { clothingItems } from "@/lib/data";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const { cartCount, cartItems, removeFromCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const recommendations = searchQuery.trim()
    ? clothingItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const matchedItem = clothingItems.find(
      (item) => item.name.toLowerCase() === searchQuery.toLowerCase()
    );

    if (matchedItem) {
      router.push(`/product/${matchedItem.id}`);
      setSearchQuery("");
      setShowDropdown(false);
    } else {
      if (recommendations.length > 0) {
        router.push(`/product/${recommendations[0].id}`);
        setSearchQuery("");
        setShowDropdown(false);
      } else {
        alert("Product not found");
      }
    }
  };

  const cartProducts = cartItems.map(id => clothingItems.find(item => item.id === id)).filter(Boolean) as typeof clothingItems;
  const cartTotal = cartProducts.reduce((sum, item) => sum + item.price, 0);

  return (
    <nav className="flex justify-between items-center bg-[#080808]/90 text-[#F5F0E8] px-8 py-5 border-b border-[#C9A96E]/15 sticky top-0 z-50 backdrop-blur-xl">
      {/* Left: Hamburger + Brand */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-[#C9A96E] hover:text-[#E8C98A] transition-colors"
          onClick={() => setIsMobile(!isMobile)}
        >
          {isMobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <Link href="/" className="no-underline">
          <div
            className="text-2xl tracking-[0.25em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#F5F0E8" }}
          >
            Vaas<span style={{ color: "#C9A96E" }}>tra</span>
          </div>
        </Link>
      </div>

      {/* Center: Nav Links */}
      <div className={`absolute left-1/2 -translate-x-1/2 hidden md:flex gap-12 ${isMobile ? "!flex flex-col absolute top-full left-0 w-full bg-[#080808] border-b border-[#C9A96E]/15 p-8 translate-x-0 items-center justify-center gap-8 z-40" : ""}`}>
        {["Home", "About", "Help", "Support", "Contact"].map((label) => (
          <Link
            key={label}
            href={label === "Home" ? "/" : `/${label.toLowerCase()}`}
            className="no-underline uppercase tracking-[0.2em] text-xs transition-all duration-300 group relative"
            style={{ fontFamily: "'Jost', sans-serif", color: "rgba(245,240,232,0.7)" }}
            onClick={() => setIsMobile(false)}
          >
            <span className="group-hover:text-[#C9A96E] transition-colors duration-300">{label}</span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A96E] group-hover:w-full transition-all duration-300" />
          </Link>
        ))}
      </div>

      {/* Right: Search + Cart */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden md:block">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              className="bg-transparent border border-[#C9A96E]/30 rounded-none py-1.5 px-4 text-xs text-[#F5F0E8] placeholder-[#888] focus:outline-none focus:border-[#C9A96E] transition-all duration-300 w-36 focus:w-56"
              style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.05em" }}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C9A96E]/60 hover:text-[#C9A96E] transition-colors">
              <Search className="h-3.5 w-3.5" />
            </button>
          </form>

          {showDropdown && recommendations.length > 0 && (
            <div className="absolute top-full left-0 w-64 bg-[#111] border border-[#C9A96E]/20 mt-2 py-2 shadow-2xl z-50 max-h-60 overflow-y-auto gold-scrollbar">
              {recommendations.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-3 hover:bg-[#C9A96E]/10 cursor-pointer text-xs text-[#F5F0E8]/80 transition-colors flex items-center gap-3 border-b border-[#C9A96E]/10 last:border-0"
                  onClick={() => {
                    router.push(`/product/${item.id}`);
                    setSearchQuery("");
                    setShowDropdown(false);
                  }}
                >
                  <img src={item.image} alt={item.name} className="w-8 h-8 object-cover" />
                  <span style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.05em" }}>{item.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="text-[#F5F0E8]/70 hover:text-[#C9A96E] transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C9A96E] text-[#0A0A0A] text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {cartCount}
                </span>
              )}
            </button>
          </SheetTrigger>
          <SheetContent className="w-[420px] sm:w-[480px] bg-[#111] text-[#F5F0E8] border-l border-[#C9A96E]/20 overflow-y-auto gold-scrollbar z-[100]">
            <SheetHeader>
              <SheetTitle
                className="text-2xl font-light mb-4 tracking-[0.15em] uppercase"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5F0E8" }}
              >
                Your Cart
              </SheetTitle>
              <div className="h-px w-12 bg-[#C9A96E] mb-6" />
            </SheetHeader>
            <div className="flex flex-col gap-6 mt-2">
              {cartProducts.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="h-12 w-12 text-[#C9A96E]/30 mx-auto mb-4" />
                  <p className="text-[#888] text-sm tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-4">
                    {cartProducts.map((item) => (
                      <div key={item.id} className="flex gap-4 border-b border-[#C9A96E]/10 pb-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm tracking-wide text-[#F5F0E8]" style={{ fontFamily: "'Jost', sans-serif" }}>{item.name}</h4>
                          <p className="text-[#C9A96E] text-sm mt-1" style={{ fontFamily: "'Jost', sans-serif" }}>${item.price.toFixed(2)}</p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#888] text-xs mt-2 hover:text-[#C9A96E] transition-colors tracking-widest uppercase"
                            style={{ fontFamily: "'Jost', sans-serif" }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-[#C9A96E]/20 pt-6">
                    <div className="flex justify-between mb-6">
                      <span className="text-[#888] text-sm tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>Total</span>
                      <span className="text-[#C9A96E] text-lg font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>${cartTotal.toFixed(2)}</span>
                    </div>
                    <SheetTrigger asChild>
                      <button
                        className="w-full btn-gold-filled"
                        onClick={() => router.push('/checkout')}
                      >
                        Proceed to Checkout
                      </button>
                    </SheetTrigger>
                  </div>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}