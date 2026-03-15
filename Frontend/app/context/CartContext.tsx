"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
    cartItems: number[];
    addToCart: (id: number) => void;
    removeFromCart: (id: number) => void;
    toggleCart: (id: number) => void;
    clearCart: () => void;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<number[]>([]);

    const addToCart = (id: number) => {
        setCartItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
    };

    const removeFromCart = (id: number) => {
        setCartItems((prev) => prev.filter((itemId) => itemId !== id));
    };

    const toggleCart = (id: number) => {
        setCartItems((prev) =>
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.length;

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, toggleCart, clearCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
