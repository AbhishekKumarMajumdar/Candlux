'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1616627982720-843d6cb0c57e?auto=format&fit=crop&w=1200&q=80',
    title: 'Glow Naturally',
    subtitle: 'Eco-friendly soy wax candles to soothe your soul.',
    button: 'Shop Now',
    link: '/products',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600170315315-0ddc1b6c3e5c?auto=format&fit=crop&w=1200&q=80',
    title: 'Handcrafted with Care',
    subtitle: 'Every candle tells a story of light and warmth.',
    button: 'Explore',
    link: '/about',
  },
  {
    id: 3,
    image: 'https://www.purplemill.co.uk/wp-content/uploads/2016/09/candle-banner-purple-mill.jpg',
    title: 'Festive Aroma',
    subtitle: 'Celebrate every season with premium fragrances.',
    button: 'View Collection',
    link: '/products/seasonal',
  },
];

const HeroCarousel = () => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: 'performance',
    mode: 'snap',
    slides: { perView: 1 },
    created: (slider) => {
      timer.current = setInterval(() => {
        slider.next();
      }, 4000);
    },
    destroyed: () => {
      if (timer.current) clearInterval(timer.current);
    },
  });

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <section className="relative">
      <div ref={sliderRef} className="keen-slider">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="keen-slider__slide relative h-[80vh] w-full"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-2">{slide.title}</h1>
              <p className="text-sm md:text-lg mb-4">{slide.subtitle}</p>
              <Link
                href={slide.link}
                className="bg-yellow-400 text-black px-6 py-2 rounded-full font-medium hover:bg-yellow-300 transition"
              >
                {slide.button}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
