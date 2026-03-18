"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { Heart, ShoppingCart } from "lucide-react";
import { clothingItems } from "@/lib/data";

export default function ClothesSection() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<number[]>([]);
  const { cartItems: cart, toggleCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const categories = [
    { value: "all", label: "All" },
    { value: "tops", label: "Tops" },
    { value: "bottoms", label: "Bottoms" },
    { value: "dresses", label: "Dresses" },
  ];

  const filtered = clothingItems.filter(item => activeCategory === "all" || item.category === activeCategory);

  return (
    <div id="collection" className="py-24 px-4 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A96E] text-xs tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
            Curated For You
          </p>
          <h2
            className="text-6xl md:text-7xl font-light text-[#F5F0E8] mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
          >
            Our Collection
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-16 bg-[#C9A96E]/40" />
            <div className="w-1.5 h-1.5 bg-[#C9A96E] rotate-45" />
            <div className="h-px w-16 bg-[#C9A96E]/40" />
          </div>
          <p className="text-[#888] text-sm mt-6 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
            Discover our carefully curated selection of fashion pieces, designed to help you express your&nbsp;unique style.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-7 py-2.5 text-xs tracking-[0.2em] uppercase transition-all duration-300 border ${
                activeCategory === cat.value
                  ? "bg-[#C9A96E] text-[#0A0A0A] border-[#C9A96E] font-semibold"
                  : "bg-transparent text-[#888] border-[#C9A96E]/20 hover:border-[#C9A96E]/60 hover:text-[#C9A96E]"
              }`}
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(item => (
            <div
              key={item.id}
              className="group cursor-pointer"
              onClick={() => router.push(`/product/${item.id}`)}
            >
              {/* Image container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#161616] mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

                {/* NEW badge */}
                {item.isNew && (
                  <div
                    className="absolute top-4 left-4 bg-[#C9A96E] text-[#0A0A0A] px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-semibold"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    New
                  </div>
                )}

                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                    className={`p-2.5 transition-all duration-300 shadow-lg ${
                      favorites.includes(item.id)
                        ? "bg-[#C9A96E] text-[#0A0A0A]"
                        : "bg-black/50 text-[#F5F0E8] backdrop-blur-sm hover:bg-[#C9A96E] hover:text-[#0A0A0A]"
                    }`}
                  >
                    <Heart className="w-4 h-4" fill={favorites.includes(item.id) ? "currentColor" : "none"} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCart(item.id); }}
                    className={`p-2.5 transition-all duration-300 shadow-lg ${
                      cart.includes(item.id)
                        ? "bg-[#C9A96E] text-[#0A0A0A]"
                        : "bg-black/50 text-[#F5F0E8] backdrop-blur-sm hover:bg-[#C9A96E] hover:text-[#0A0A0A]"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom bar that slides in */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#C9A96E] py-2 text-center text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A] font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  style={{ fontFamily: "'Jost', sans-serif" }}>
                  View Details
                </div>
              </div>

              {/* Product info */}
              <div className="px-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      className="text-[#F5F0E8] text-sm font-medium tracking-wide"
                      style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-[#888] text-xs mt-0.5 tracking-wide" style={{ fontFamily: "'Jost', sans-serif" }}>
                      {item.color}
                    </p>
                  </div>
                  <p className="text-[#C9A96E] text-sm font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}