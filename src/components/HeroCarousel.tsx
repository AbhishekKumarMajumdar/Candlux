'use client';

import { useState, useEffect, useRef } from 'react';
// Removed 'next/image' import
// Removed 'next/link' import (will use standard <a> tag)

/**
 * Defines the structure for each slide in the hero section.
 */
interface Slide {
  id: number;
  title: string;
  subtitle: string;
  button: string;
  link: string;
  imgSrc: string; // Local path for the background image (e.g., /images/carousel-1.jpg)
  imgAlt: string; // Alt text for accessibility
}

/**
 * Static data for the hero section slides.
 * IMPORTANT: For these images to work in a Next.js project, you must place them
 * in your `public` directory. For example, `public/images/carousel-1.jpg`.
 * For this Canvas environment, ensure these URLs are accessible.
 */
const slides: Slide[] = [
  {
    id: 1,
    title: 'Glow Naturally',
    subtitle: 'Eco-friendly soy wax candles to soothe your soul.',
    button: 'Shop Now',
    link: '#products', // Using hash links for in-page navigation simulation in Canvas
    imgSrc: '/images/carousel-1.jpg', // Placeholder for local image
    imgAlt: 'Eco-friendly soy wax candle with natural glow on wooden table',
  },
  {
    id: 2,
    title: 'Handcrafted with Care',
    subtitle: 'Every candle tells a story of light and warmth.',
    button: 'Explore',
    link: '#about', // Using hash links for in-page navigation simulation in Canvas
    imgSrc: '/images/carousel-2.jpg', // Placeholder for local image
    imgAlt: 'Handmade candle glowing warmly in artistic setting with soft light',
  },
  {
    id: 3,
    title: 'Festive Aroma',
    subtitle: 'Celebrate every season with premium fragrances.',
    button: 'View Collection',
    link: '#products', // Using hash links for in-page navigation simulation in Canvas
    imgSrc: '/images/carousel-3.jpg', // Placeholder for local image
    imgAlt: 'Seasonal festive candle with holiday decorations in background',
  },
];

/**
 * CarouselHeroSection Component
 * Displays an auto-playing image carousel with content overlays.
 * Uses standard HTML <img> and <a> tags for Canvas compatibility.
 */
export default function CarouselHeroSection() {
  // State to keep track of the currently active slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  // Ref to store the interval timer ID for cleanup
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Set up an interval to change slides automatically
    timer.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds (4000ms)

    // Cleanup function: Clear the interval when the component unmounts
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []); // Empty dependency array ensures this effect runs once on mount and cleans up on unmount

  /**
   * Handles navigation to a specific slide when a dot is clicked.
   * Resets the auto-play timer after manual navigation.
   * @param {number} index - The index of the slide to navigate to.
   */
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
        >
          {/* Use standard <img> tag for local images */}
          <img
            src={slide.imgSrc}
            alt={slide.imgAlt}
            className="absolute inset-0 w-full h-full object-cover" // Ensure it covers the container
            // Add onError for fallback placeholder if image not found
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/1200x800/3f3f46/facc15?text=Image+${slide.id}+Not+Found`;
            }}
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{slide.title}</h1>
            <p className="text-sm md:text-lg mb-4">{slide.subtitle}</p>
            {/* Use standard <a> tag for navigation */}
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
