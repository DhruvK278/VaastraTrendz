"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  leftImage: string;
  rightImage: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Summer",
    subtitle: "Vibes",
    description: "Explore the Collection",
    leftImage: "https://images.unsplash.com/photo-1621786030484-4c855eed6974?auto=format&fit=crop&q=80&w=1000",
    rightImage: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 2,
    title: "Urban",
    subtitle: "Style",
    description: "Street Fashion Edit",
    leftImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=1000",
    rightImage: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 3,
    title: "Autumn",
    subtitle: "Mood",
    description: "Seasonal Collection",
    leftImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000",
    rightImage: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=1000",
  }
];

const AUTOPLAY_INTERVAL = 4000;

export default function FashionSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetProgress = useCallback(() => {
    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          if (progressRef.current) clearInterval(progressRef.current);
          return 100;
        }
        return p + (100 / (AUTOPLAY_INTERVAL / 50));
      });
    }, 50);
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
    resetProgress();
  }, [emblaApi, resetProgress]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
    resetProgress();
  }, [emblaApi, resetProgress]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setActiveIndex(emblaApi.selectedScrollSnap()));
    resetProgress();

    intervalRef.current = setInterval(() => {
      emblaApi.scrollNext();
      resetProgress();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [emblaApi, resetProgress]);

  return (
    <div className="relative w-full h-[92vh] bg-black group overflow-hidden">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {slides.map((slide) => (
            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 h-full">
              <div className="relative w-full h-full flex">
                {/* Left Image */}
                <div className="w-1/2 h-full relative overflow-hidden">
                  <img
                    src={slide.leftImage}
                    alt={`Left ${slide.title}`}
                    className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                </div>

                {/* Right Image */}
                <div className="w-1/2 h-full relative overflow-hidden">
                  <img
                    src={slide.rightImage}
                    alt={`Right ${slide.title}`}
                    className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-transparent" />
                </div>

                {/* Bottom vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Center Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="text-center px-4">
                    {/* Decorative line */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="h-px w-12 bg-[#C9A96E]" />
                      <span className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
                        New Collection
                      </span>
                      <div className="h-px w-12 bg-[#C9A96E]" />
                    </div>

                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", lineHeight: 1 }}
                      className="text-7xl md:text-9xl font-light text-[#F5F0E8] drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", lineHeight: 1.1 }}
                      className="text-7xl md:text-9xl font-light text-[#C9A96E] drop-shadow-lg mb-6">
                      {slide.subtitle}
                    </h2>

                    <p className="text-xs tracking-[0.5em] text-[#F5F0E8]/70 uppercase mb-10 drop-shadow-md" style={{ fontFamily: "'Jost', sans-serif" }}>
                      {slide.description}
                    </p>

                    {/* CTA — needs pointer events */}
                    <div className="pointer-events-auto">
                      <Link href="/#collection" className="btn-gold inline-block no-underline">
                        Shop Now →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-6 -translate-y-1/2 bg-black/30 text-[#C9A96E] p-3 border border-[#C9A96E]/30 backdrop-blur-sm hover:bg-[#C9A96E]/10 hover:border-[#C9A96E] transition-all duration-300 z-20 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-6 -translate-y-1/2 bg-black/30 text-[#C9A96E] p-3 border border-[#C9A96E]/30 backdrop-blur-sm hover:bg-[#C9A96E]/10 hover:border-[#C9A96E] transition-all duration-300 z-20 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Slide Dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { emblaApi?.scrollTo(i); resetProgress(); }}
            className={`transition-all duration-300 ${i === activeIndex ? "w-8 h-px bg-[#C9A96E]" : "w-2 h-px bg-[#F5F0E8]/30"}`}
          />
        ))}
      </div>

      {/* Animated Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-[#C9A96E]/10 z-20">
        <div
          className="h-full bg-[#C9A96E] transition-none"
          style={{ width: `${progress}%`, transition: "width 50ms linear" }}
        />
      </div>
    </div>
  );
}