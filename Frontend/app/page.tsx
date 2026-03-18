import FashionSlider from "./components/FashionSlider";
import Navbar from "./components/Navbar";
import ClothesSection from "./components/ClothesSection";
import { Diamond, Truck, RefreshCw, Instagram } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <FashionSlider />
      <ClothesSection />

      {/* Features Strip */}
      <section className="bg-[#111] border-y border-[#C9A96E]/10 py-12">
        <div className="max-w-5xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: Truck, label: "Free Shipping", desc: "On all Cash on Delivery orders, no minimum spend." },
            { icon: Diamond, label: "100% Authentic", desc: "Ethically sourced and premium quality materials only." },
            { icon: RefreshCw, label: "Easy Returns", desc: "30-day hassle-free return policy on all items." },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-5 group">
              <div className="w-10 h-10 border border-[#C9A96E]/25 flex items-center justify-center flex-shrink-0 group-hover:border-[#C9A96E] transition-colors duration-300">
                <Icon className="w-4 h-4 text-[#C9A96E]" />
              </div>
              <div>
                <h4 className="text-[#F5F0E8] text-xs tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {label}
                </h4>
                <p className="text-[#555] text-xs leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-24 bg-[#0A0A0A] text-center px-4">
        <p className="text-[#C9A96E] text-xs tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
          Stay in Style
        </p>
        <h2
          className="text-5xl font-light text-[#F5F0E8] mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
        >
          Join the Circle
        </h2>
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-[#C9A96E]/40" />
          <div className="w-1 h-1 bg-[#C9A96E] rotate-45" />
          <div className="h-px w-12 bg-[#C9A96E]/40" />
        </div>
        <p className="text-[#555] text-sm mb-10 max-w-md mx-auto leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
          Be the first to discover new collections, exclusive offers, and style inspiration.
        </p>
        <div className="flex items-center justify-center max-w-md mx-auto gap-0">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-[#161616] border border-[#C9A96E]/20 text-[#F5F0E8] px-5 py-3.5 text-sm placeholder-[#444] focus:outline-none focus:border-[#C9A96E] transition-colors"
            style={{ fontFamily: "'Jost', sans-serif" }}
          />
          <button className="btn-gold-filled px-6 py-3.5 whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#C9A96E]/10 bg-[#080808] py-10 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div
            className="text-xl tracking-[0.25em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#F5F0E8" }}
          >
            Vaas<span style={{ color: "#C9A96E" }}>tra</span>
          </div>
          <p className="text-[#444] text-xs tracking-wide" style={{ fontFamily: "'Jost', sans-serif" }}>
            © 2026 VaastraTrendz. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a
                key={link}
                href={`/${link.toLowerCase()}`}
                className="text-[#555] text-xs hover:text-[#C9A96E] transition-colors tracking-wide uppercase no-underline"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}