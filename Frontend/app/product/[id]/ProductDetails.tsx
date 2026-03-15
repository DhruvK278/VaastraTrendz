"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Heart, ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-2xl font-semibold mb-6">${product.price}</p>
              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="mb-8">
                <h3 className="font-semibold mb-4">Color</h3>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-black" />
                  <div className="w-8 h-8 rounded-full bg-black border" />
                  <div className="w-8 h-8 rounded-full bg-gray-200 border" />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-4">Size</h3>
                <div className="grid grid-cols-5 gap-2">
                  {sizes.map((sizeOption) => (
                    <button
                      key={sizeOption.size}
                      onClick={() => setSelectedSize(sizeOption.size)}
                      disabled={!sizeOption.available}
                      className={`py-3 border rounded-lg transition-all ${!sizeOption.available
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : selectedSize === sizeOption.size
                          ? "bg-black text-white"
                          : "hover:border-black"
                        }`}
                    >
                      {sizeOption.size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={isInCart ? "default" : "outline"}
                  className={`py-6 text-lg border-2 transition-all ${isInCart
                      ? "bg-black text-white hover:bg-gray-800"
                      : "hover:bg-black hover:text-white"
                    }`}
                  onClick={() => toggleCart(parseInt(product.id))}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isInCart ? "Remove from Cart" : "Add to Cart"}
                </Button>
                <Button
                  className="py-6 text-lg bg-black hover:bg-gray-800 transition-all"
                  onClick={() => router.push('/checkout')}
                >
                  Buy Now
                </Button>
              </div>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Product Details</h3>
              <ul className="space-y-2">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="text-gray-600">
                    • {detail}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}