import Navbar from "@/app/components/Navbar";
import { Diamond, Truck, RefreshCw } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* Hero */}
      <div className="relative h-64 flex items-center justify-center overflow-hidden border-b border-[#C9A96E]/10">
        <div className="absolute inset-0 bg-[#111]" />
        <div className="relative text-center px-4">
          <p className="text-[#C9A96E] text-xs tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
            Our Story
          </p>
          <h1
            className="text-6xl font-light text-[#F5F0E8]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
          >
            About Us
          </h1>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-16 bg-[#C9A96E]/40" />
            <div className="w-1.5 h-1.5 bg-[#C9A96E] rotate-45" />
            <div className="h-px w-16 bg-[#C9A96E]/40" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="space-y-8">
          {[
            "Welcome to our fashion destination, where style meets sophistication. Our journey began with a simple vision: to create a space where fashion enthusiasts can discover unique pieces that reflect their individual style.",
            "We carefully curate our collections to bring you the latest trends while maintaining a commitment to quality and sustainability. Each piece in our store is selected with attention to detail and a passion for fashion.",
            "Our team of fashion experts is dedicated to providing you with an exceptional shopping experience, whether you're looking for everyday essentials or statement pieces for special occasions."
          ].map((text, i) => (
            <p
              key={i}
              className="text-[#888] leading-8 text-base"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Gold divider */}
        <div className="flex items-center justify-center gap-4 my-16">
          <div className="h-px flex-1 bg-[#C9A96E]/20" />
          <Diamond className="w-4 h-4 text-[#C9A96E]" />
          <div className="h-px flex-1 bg-[#C9A96E]/20" />
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: Diamond, label: "Premium Quality", desc: "Every piece is selected for its exceptional craftsmanship." },
            { icon: Truck, label: "Free Shipping", desc: "Complimentary delivery on all Cash on Delivery orders." },
            { icon: RefreshCw, label: "Easy Returns", desc: "Hassle-free returns within 30 days of purchase." },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="group">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 border border-[#C9A96E]/20 flex items-center justify-center group-hover:border-[#C9A96E] transition-colors duration-300">
                  <Icon className="w-5 h-5 text-[#C9A96E]" />
                </div>
              </div>
              <h3
                className="text-[#F5F0E8] text-xs tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {label}
              </h3>
              <p className="text-[#555] text-xs leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}