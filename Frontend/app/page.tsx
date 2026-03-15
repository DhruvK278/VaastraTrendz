import dynamic from "next/dynamic";
import FashionSlider from "./components/FashionSlider";
import Navbar from "./components/Navbar";
import ClothesSection from "./components/ClothesSection";


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <FashionSlider />
      <ClothesSection />
      <div className="max-w-7xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Our Fashion Store
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
          Discover the latest trends and timeless classics in our carefully curated collection.
        </p>
      </div>
    </main>
  );
}