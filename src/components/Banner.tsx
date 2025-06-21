'use client';

import Image from 'next/image';

const Banner = () => {
  return (
    <section className="relative h-[30vh]  lg:h-[50vh] w-full overflow-hidden bg-black">
      {/* Background image */}
      <Image
        src='https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3d5ed7d5-f99f-4cb1-a762-38fcefba530e.png'
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
