"use client";

import Link from "next/link";
import { Mail, MessageCircle, ArrowRight, HelpCircle, Shirt, Camera, Wand2 } from "lucide-react";

export default function HelpPage() {
    const faqs = [
        {
            question: "How does the virtual try-on work?",
            answer: "Our AI analysis the submitted photo and the selected clothing item to create a realistic preview of how the clothes would look on you. It takes into account body posture, lighting, and fabric physics."
        },
        {
            question: "What kind of photos should I upload?",
            answer: "For best results, upload a full-body photo with good lighting. Make sure usage of simple backgrounds and avoid loose clothing for accurate sizing estimation."
        },
        {
            question: "Is my photo data secure?",
            answer: "Yes, your privacy is our priority. Photos are processed temporarily for the try-on simulation and are not stored permanently on our servers."
        },
        {
            question: "Can I try on multiple items at once?",
            answer: "Currently, you can try on one outfit combination (e.g., a top and bottom) at a time. We are working on advanced layering features for future updates."
        }
    ];

    const steps = [
        {
            icon: <Camera className="w-8 h-8 text-white" />,
            title: "1. Upload Photo",
            description: "Take a photo or upload an existing one for the try-on experience."
        },
        {
            icon: <Shirt className="w-8 h-8 text-white" />,
            title: "2. Select Clothes",
            description: "Browse our extensive collection and pick the items you love."
        },
        {
            icon: <Wand2 className="w-8 h-8 text-white" />,
            title: "3. See Magic",
            description: "Watch as our AI instantly dresses you in your selected outfit."
        }
    ];

    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto space-y-16">

                {/* Header Section */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full ring-1 ring-white/10 mb-4">
                        <HelpCircle className="w-6 h-6 text-white/80" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-italian tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
                        Help Center
                    </h1>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Everything you need to know about using our AI Virtual Try-on platform.
                    </p>
                </div>

                {/* How it Works Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                            <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-transparent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-medium mb-3 font-italian tracking-wide">{step.title}</h3>
                            <p className="text-white/60 leading-relaxed font-light">{step.description}</p>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-italian tracking-wide text-center">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors">
                                <h3 className="text-lg font-medium mb-3 text-white/90">{faq.question}</h3>
                                <p className="text-white/50 font-light leading-relaxed text-sm">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Support CTA */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-white/10 to-white/5 border border-white/10 p-8 md:p-12 text-center">
                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <h2 className="text-3xl md:text-4xl font-italian tracking-wide">Still need help?</h2>
                        <p className="text-white/60 max-w-lg font-light">
                            Our support team is available 24/7 to assist you with any issues or questions you might have.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors duration-300"
                        >
                            Contact Support
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Decorative background elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
                </div>

            </div>
        </main>
    );
}
