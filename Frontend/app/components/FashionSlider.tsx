"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface Slide {
  id: number;
  title: string;
  description: string;
  leftImage: string;
  rightImage: string;
  color: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Summer Vibes",
    description: "Explore the Collection",
    leftImage: "https://images.unsplash.com/photo-1621786030484-4c855eed6974?auto=format&fit=crop&q=80&w=1000",
    rightImage: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&q=80&w=1000",
    color: "#f4d03f"
  },
  {
    id: 2,
    title: "Urban Style",
    description: "Street Fashion Edit",
    leftImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=1000",
    rightImage: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&q=80&w=1000",
    color: "#e74c3c"
  },
  {
    id: 3,
    title: "Autumn Mood",
    description: "Seasonal Collection",
    leftImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000",
    rightImage: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=1000",
    color: "#27ae60"
  }
];

export default function FashionSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full h-[90vh] bg-black group">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative flex-[0_0_100%] min-w-0 h-full"
            >
              {/* Content Container */}
              <div className="relative w-full h-full flex">
                {/* Left Image */}
                <div className="w-1/2 h-full relative overflow-hidden">
                  <img
                    src={slide.leftImage}
                    alt={`Left ${slide.title}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Right Image */}
                <div className="w-1/2 h-full relative overflow-hidden">
                  <img
                    src={slide.rightImage}
                    alt={`Right ${slide.title}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Center Content Overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{
                    background: `linear-gradient(45deg, ${slide.color}22, transparent)`
                  }}
                >
                  <div className="text-center">
                    <h2 className="font-bourbon text-8xl mb-6 text-white drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <p className="text-2xl tracking-[8px] text-white/90 uppercase drop-shadow-md">
                      {slide.description}
                    </p>
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
        className="absolute top-1/2 left-8 -translate-y-1/2 bg-white/10 text-white p-4 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 z-20 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-8 -translate-y-1/2 bg-white/10 text-white p-4 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 z-20 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}