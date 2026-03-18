"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { ShoppingCart, ArrowLeft, Package } from "lucide-react";
import Navbar from "@/app/components/Navbar";

interface SizeOption {
  size: string;
  available: boolean;
}

const sizes: SizeOption[] = [
  { size: "XS", available: true },
  { size: "S", available: true },
  { size: "M", available: true },
  { size: "L", available: false },
  { size: "XL", available: true },
];

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  color: string;
  image: string;
  details: string[];
}

export default function ProductDetails({ product }: { product: Product }) {
  const router = useRouter();
  const { cartItems, toggleCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");

  const isInCart = cartItems.includes(parseInt(product.id));

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#888] hover:text-[#C9A96E] transition-colors mb-10 group"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image */}
          <div>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#161616] border border-[#C9A96E]/10">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8 pt-2">
            {/* Name & Price */}
            <div>
              <h1
                className="text-5xl font-light text-[#F5F0E8] leading-tight mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
              >
                {product.name}
              </h1>
              <div className="h-px w-16 bg-[#C9A96E] my-4" />
              <p
                className="text-3xl font-light text-[#C9A96E]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Description */}
            <p className="text-[#888] leading-relaxed text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
              {product.description}
            </p>

            {/* Color */}
            <div>
              <h3
                className="text-[#888] text-xs tracking-[0.3em] uppercase mb-4"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Color — <span className="text-[#F5F0E8]">{product.color}</span>
              </h3>
              <div className="flex gap-2.5">
                <div className="w-7 h-7 bg-[#F5F0E8] border border-[#C9A96E]/40 cursor-pointer hover:border-[#C9A96E] transition-colors" />
                <div className="w-7 h-7 bg-[#1A1A1A] border border-[#C9A96E]/40 cursor-pointer hover:border-[#C9A96E] transition-colors" />
                <div className="w-7 h-7 bg-[#C9A96E]/40 border border-[#C9A96E]/40 cursor-pointer hover:border-[#C9A96E] transition-colors" />
              </div>
            </div>

            {/* Size */}
            <div>
              <h3
                className="text-[#888] text-xs tracking-[0.3em] uppercase mb-4"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Size {selectedSize && <span className="text-[#C9A96E]">— {selectedSize}</span>}
              </h3>
              <div className="flex gap-2">
                {sizes.map((sizeOption) => (
                  <button
                    key={sizeOption.size}
                    onClick={() => setSelectedSize(sizeOption.size)}
                    disabled={!sizeOption.available}
                    style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em" }}
                    className={`w-12 h-12 border transition-all duration-200 ${
                      !sizeOption.available
                        ? "border-[#C9A96E]/10 text-[#444] cursor-not-allowed line-through"
                        : selectedSize === sizeOption.size
                        ? "border-[#C9A96E] bg-[#C9A96E] text-[#0A0A0A] font-semibold"
                        : "border-[#C9A96E]/30 text-[#888] hover:border-[#C9A96E] hover:text-[#C9A96E]"
                    }`}
                  >
                    {sizeOption.size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-2">
              <button
                onClick={() => toggleCart(parseInt(product.id))}
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em" }}
                className={`flex-1 flex items-center justify-center gap-2.5 py-4 border uppercase transition-all duration-300 ${
                  isInCart
                    ? "bg-[#C9A96E] text-[#0A0A0A] border-[#C9A96E] font-semibold"
                    : "bg-transparent text-[#C9A96E] border-[#C9A96E]/40 hover:bg-[#C9A96E]/10 hover:border-[#C9A96E]"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                {isInCart ? "Remove from Cart" : "Add to Cart"}
              </button>
              <button
                onClick={() => router.push('/checkout')}
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em" }}
                className="flex-1 py-4 bg-[#C9A96E] text-[#0A0A0A] border border-[#C9A96E] uppercase font-semibold hover:bg-[#E8C98A] transition-all duration-300"
              >
                Buy Now
              </button>
            </div>

            {/* Product Details */}
            <div className="border border-[#C9A96E]/15 bg-[#161616] p-6">
              <h3
                className="text-[#888] text-xs tracking-[0.3em] uppercase mb-5 flex items-center gap-2"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                <Package className="w-3.5 h-3.5 text-[#C9A96E]" />
                Product Details
              </h3>
              <ul className="space-y-2.5">
                {product.details.map((detail, idx) => (
                  <li
                    key={idx}
                    className="text-[#888] text-sm flex items-center gap-3"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    <span className="w-px h-3 bg-[#C9A96E]/60 inline-block" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}