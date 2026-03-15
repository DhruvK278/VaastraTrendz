"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Navbar from "@/app/components/Navbar";
import { clothingItems } from "@/lib/data";

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
    
    // Group identical items to calculate quantity
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

      if (!response.ok) {
        throw new Error("Failed to place order.");
      }

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold mb-8 font-bourbon">Checkout</h1>
          <Card className="p-8">
            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  required 
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Input 
                  id="address" 
                  name="address" 
                  required 
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St, City, Country"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full py-6 text-lg bg-black hover:bg-gray-800 text-white mt-8"
                disabled={isSubmitting || cartItems.length === 0}
              >
                {isSubmitting ? "Processing..." : "Place Order (Cash on Delivery)"}
              </Button>
            </form>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-8 font-bourbon lg:mt-0 mt-8">Order Summary</h2>
          <Card className="p-8">
            {cartProducts.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-6">
                {cartProducts.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.color}</p>
                      </div>
                    </div>
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                ))}
                
                <div className="pt-4 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping (COD)</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-4 border-t">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
