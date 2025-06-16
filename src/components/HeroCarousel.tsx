'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Defines the structure for each slide in the hero section.
 */
interface Slide {
  id: number;
  title: string;
  subtitle: string;
  button: string;
  link: string;
  imgSrc: string; // URL for the background image
  imgAlt: string; // Alt text for accessibility
}

/**
 * Static data for the hero section slides.
 * In a real application, this might come from a CMS or API.
 */
const slides: Slide[] = [
  {
    id: 1,
    title: 'Glow Naturally',
    subtitle: 'Eco-friendly soy wax candles to soothe your soul.',
    button: 'Shop Now',
    link: '#products', // Using hash links for in-page navigation simulation
    imgSrc: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3d5ed7d5-f99f-4cb1-a762-38fcefba530e.png',
    imgAlt: 'Eco-friendly soy wax candle with natural glow on wooden table',
  },
  {
    id: 2,
    title: 'Handcrafted with Care',
    subtitle: 'Every candle tells a story of light and warmth.',
    button: 'Explore',
    link: '#about',
    imgSrc: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/507904fa-51e8-48ff-a04b-083e2e2337e2.png',
    imgAlt: 'Handmade candle glowing warmly in artistic setting with soft light',
  },
  {
    id: 3,
    title: 'Festive Aroma',
    subtitle: 'Celebrate every season with premium fragrances.',
    button: 'View Collection',
    link: '#seasonal',
    imgSrc: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e0c3eb60-4c25-4b03-a2a0-5c506e762771.png',
    imgAlt: 'Seasonal festive candle with holiday decorations in background',
  },
];

/**
 * HeroSection Component
 * Displays an auto-playing image carousel with content overlays.
 * Images are set as background images for a sleek UI.
 * This version is self-contained for compatibility within the Canvas environment.
 */
export default function HeroSection() {
  // State to keep track of the currently active slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  // Ref to store the interval timer ID for cleanup
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Set up an interval to change slides automatically
    timer.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    // Cleanup function: Clear the interval when the component unmounts
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []); // Empty dependency array ensures this effect runs once on mount and cleans up on unmount

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    // Reset the timer when a dot is clicked to give the user time to view the new slide
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 4000);
    }
  };

  return (
    <section className="relative w-full h-[80vh] overflow-hidden bg-zinc-950 font-sans">
      {/* Loop through slides to create each carousel item */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          // Apply active/inactive classes for visibility and smooth transition
          className={`
            absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out
            ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}
          `}
          // Set the background image directly using inline style
          style={{
            backgroundImage: `url('${slide.imgSrc}')`,
            backgroundSize: 'cover', // Ensures the image covers the entire container
            backgroundPosition: 'center', // Centers the image in the container
            backgroundRepeat: 'no-repeat', // Prevents image repetition
          }}
          // Use a role and aria-label for accessibility for background images
          role="img"
          aria-label={slide.imgAlt}
        >
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{slide.title}</h1>
            <p className="text-sm md:text-lg mb-4">{slide.subtitle}</p>
            {/* Using a regular <a> tag for simulated navigation in this environment */}
            <a
              href={slide.link}
              className="bg-yellow-400 text-black px-6 py-2 rounded-full font-medium hover:bg-yellow-300 transition-colors duration-200 shadow-lg"
            >
              {slide.button}
            </a>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              w-3 h-3 rounded-full transition-colors duration-300
              ${index === currentSlide ? 'bg-yellow-400' : 'bg-zinc-600 hover:bg-zinc-500'}
            `}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
