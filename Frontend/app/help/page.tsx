"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import { HelpCircle, Shirt, MessageSquare, Sparkles, ArrowRight, Truck, RefreshCw, CreditCard } from "lucide-react";

export default function HelpPage() {
  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day hassle-free return policy. Items must be unworn, unwashed, and have all original tags attached. Intimate wear, swimwear, and customized items are final sale.",
    },
    {
      question: "How do I exchange for a different size?",
      answer:
        "Size exchanges are accepted within 14 days of delivery at no extra cost. Simply raise a support ticket with the 'Sizing & Fit Issues' category and we'll arrange an exchange.",
    },
    {
      question: "What if I received the wrong item?",
      answer:
        "If you received an incorrect item, we'll expedite a free replacement within 2–3 business days and offer a 10% discount on your next order as an apology.",
    },
    {
      question: "How does your AI support agent work?",
      answer:
        "Our AI agent analyzes your complaint against our company policies using advanced language models. It recommends the best resolution (refund, exchange, discount, etc.) with a confidence score — all in seconds.",
    },
  ];

  const steps = [
    {
      icon: <Shirt className="w-6 h-6 text-[#C9A96E]" />,
      title: "1. Browse & Shop",
      description: "Explore our premium collection and place your order with confidence.",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-[#C9A96E]" />,
      title: "2. Describe Your Issue",
      description: "Head to our AI Support page, select an issue category, and describe what went wrong.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#C9A96E]" />,
      title: "3. Get AI Resolution",
      description: "Our AI agent instantly analyzes your issue and recommends the best resolution based on our policies.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-20 pb-16 space-y-20">
        {/* Header */}
        <div className="text-center space-y-5">
          <div className="inline-flex items-center justify-center w-12 h-12 border border-[#C9A96E]/20 mb-2">
            <HelpCircle className="w-5 h-5 text-[#C9A96E]" />
          </div>
          <p
            className="text-[#C9A96E] text-xs tracking-[0.5em] uppercase"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Help Center
          </p>
          <h1
            className="text-4xl md:text-5xl font-light text-[#F5F0E8]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
          >
            How Can We Help?
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-[#C9A96E]/40" />
            <div className="w-1 h-1 bg-[#C9A96E] rotate-45" />
            <div className="h-px w-12 bg-[#C9A96E]/40" />
          </div>
          <p
            className="text-[#555] text-sm max-w-lg mx-auto leading-relaxed"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Everything you need to know about shopping with VaastraTrendz — from placing orders to getting AI-powered support.
          </p>
        </div>

        {/* How it Works */}
        <div>
          <h2
            className="text-2xl font-light text-[#F5F0E8] text-center mb-10"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
          >
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="luxury-card rounded-lg p-8 text-center group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 border border-[#C9A96E]/20 flex items-center justify-center mx-auto mb-5 group-hover:border-[#C9A96E]/50 transition-colors">
                  {step.icon}
                </div>
                <h3
                  className="text-[#F5F0E8] text-sm tracking-[0.15em] uppercase mb-3"
                  style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
                >
                  {step.title}
                </h3>
                <p className="text-[#555] text-xs leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Truck, label: "Shipping Info", desc: "Free shipping on all COD orders." },
            { icon: RefreshCw, label: "Returns & Exchanges", desc: "30-day return policy, 14-day exchanges." },
            { icon: CreditCard, label: "Price Match", desc: "Sale within 7 days? Get store credit." },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-4 group">
              <div className="w-9 h-9 border border-[#C9A96E]/20 flex items-center justify-center flex-shrink-0 group-hover:border-[#C9A96E]/50 transition-colors">
                <Icon className="w-4 h-4 text-[#C9A96E]" />
              </div>
              <div>
                <h4
                  className="text-[#F5F0E8] text-xs tracking-[0.15em] uppercase mb-1"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {label}
                </h4>
                <p className="text-[#555] text-xs leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div>
          <h2
            className="text-2xl font-light text-[#F5F0E8] text-center mb-8"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="luxury-card rounded-lg p-6">
                <h3
                  className="text-[#F5F0E8] text-sm font-medium mb-3"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {faq.question}
                </h3>
                <p className="text-[#555] text-xs leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="border border-[#C9A96E]/15 rounded-lg p-10 text-center relative overflow-hidden"
          style={{ background: "rgba(201,169,110,0.03)" }}
        >
          <h2
            className="text-3xl font-light text-[#F5F0E8] mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
          >
            Still need help?
          </h2>
          <p className="text-[#555] text-sm mb-6 max-w-md mx-auto" style={{ fontFamily: "'Jost', sans-serif" }}>
            Our AI support agent is available 24/7 to resolve your issues instantly.
          </p>
          <Link href="/support" className="btn-gold-filled inline-flex items-center gap-2 no-underline">
            Go to AI Support
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

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
        </div>
      </footer>
    </main>
  );
}
