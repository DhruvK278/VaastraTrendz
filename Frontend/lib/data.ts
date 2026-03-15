export interface ClothingItem {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    color: string;
    isNew?: boolean;
  }
  
export const clothingItems: ClothingItem[] = [
    {
      id: 1,
      name: "Check Shirt",
      price: 29.99,
      image: "/assets/Shirt 2.png",
      category: "tops",
      color: "brownish",
      isNew: true
    },
    {
      id: 2,
      name: "Classic Shirt",
      price: 89.99,
      image: "/assets/Shirt.png",
      category: "tops",
      color: "Black"
    },
    {
      id: 3,
      name: "Full Sleeves ",
      price: 69.99,
      image: "/assets/Full sleeves.png",
      category: "tops",
      color: "Grey"
    },
    {
      id: 4,
      name: "Pleated Skirt",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=1000",
      category: "bottoms",
      color: "Black"
    },
    {
      id: 5,
      name: "Summer Dress",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000",
      category: "dresses",
      color: "Yellow",
      isNew: true
    },
    {
      id: 6,
      name: "Floral Maxi Dress",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=1000",
      category: "dresses",
      color: "Multicolor"
    },
    {
      id: 7,
      name: "Leather Jacket",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000",
      category: "tops",
      color: "Black",
      isNew: true
    },
    {
      id: 8,
      name: "Silk Blouse",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&q=80&w=1000",
      category: "tops",
      color: "Pink"
    },
    {
      id: 9,
      name: "Cargo Pants",
      price: 74.99,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1000",
      category: "bottoms",
      color: "Khaki"
    },
    {
      id: 10,
      name: "Wide Leg Trousers",
      price: 84.99,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=1000",
      category: "bottoms",
      color: "Beige",
      isNew: true
    },
    {
      id: 11,
      name: "Cocktail Dress",
      price: 119.99,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=1000",
      category: "dresses",
      color: "Red"
    },
    {
      id: 12,
      name: "Wrap Dress",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000",
      category: "dresses",
      color: "Green"
    }
  ];