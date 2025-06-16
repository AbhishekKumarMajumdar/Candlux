'use client';

import Image from 'next/image';

const Banner = () => {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden bg-black">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1598550880861-04be4dd6a95e?auto=format&fit=crop&w=1600&q=80"
        alt="Candle Banner"
        fill
        className="object-cover opacity-60"
        priority
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Ignite Your Senses</h2>
        <p className="max-w-xl text-lg md:text-xl text-zinc-300 mb-6">
          Discover handcrafted candles that bring warmth, love, and light to your space.
        </p>
        <button className="bg-yellow-400 text-black px-6 py-2 rounded-full font-medium hover:bg-yellow-300 transition">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Banner;
