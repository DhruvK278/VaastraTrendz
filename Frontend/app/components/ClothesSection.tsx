"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { clothingItems } from "@/lib/data";

export default function ClothesSection() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<number[]>([]);
  const { cartItems: cart, toggleCart } = useCart();

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="py-16 px-2 bg-gray-50">
      <div className="max-w-8xl mx-auto">
        <span className="block h-1 w-100 bg-black my--1 mx-auto rounded"></span>
        <span className="block h-1 w-50 bg-black my-1 mx-auto rounded"></span>
        <div className="text-center mb-12">
          <h2 className="font-bourbon text-7xl font-bold mb-4">
            Our Collection
            <span className="block h-1 w-100 bg-black my--1 mx-auto rounded"></span>
            <span className="block h-1 w-50 bg-black my-1 mx-auto rounded"></span>
          </h2>
          <p className="text-black font-sans max-w-2xl mx-auto">
            Discover our carefully curated selection of fashion pieces, designed to help you express your unique style.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="top-24 z-40 bg-transparent">
            <TabsList className="flex justify-center font-semibold mb-12 bg-black p-1 rounded-full border shadow-sm">
              <TabsTrigger value="all" className="px-8 py-3 rounded-full text-white">All</TabsTrigger>
              <TabsTrigger value="tops" className="px-8 py-3 rounded-full text-white">Tops</TabsTrigger>
              <TabsTrigger value="bottoms" className="px-8 py-3 rounded-full text-white">Bottoms</TabsTrigger>
              <TabsTrigger value="dresses" className="px-8 py-3 rounded-full text-white">Dresses</TabsTrigger>
            </TabsList>
          </div>

          {["all", "tops", "bottoms", "dresses"].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {clothingItems
                  .filter(item => category === "all" || item.category === category)
                  .map(item => (
                    <Card
                      key={item.id}
                      className="overflow-hidden group bg-white hover:shadow-lg transition-all duration-300"
                      onClick={() => router.push(`/product/${item.id}`)}
                    >
                      <div className="relative aspect-[1]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {item.isNew && (
                          <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                            New
                          </div>
                        )}
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(item.id);
                            }}
                            className={`p-2 rounded-full ${favorites.includes(item.id)
                              ? "bg-red-500 text-white"
                              : "bg-white/80 text-gray-700"
                              } hover:scale-110 transition-all duration-300 shadow-md`}
                          >
                            <Heart className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCart(item.id);
                            }}
                            className={`p-2 rounded-full ${cart.includes(item.id)
                              ? "bg-black text-white"
                              : "bg-white/80 text-gray-700"
                              } hover:scale-110 transition-all duration-300 shadow-md`}
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-gray-500">{item.color}</p>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}