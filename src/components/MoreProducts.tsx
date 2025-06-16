'use client';

import Image from 'next/image';

const products = [
  {
    id: 1,
    name: 'Lavender Bliss',
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1a1?auto=format&fit=crop&w=400&q=80',
    description: 'Relaxing lavender scent for a peaceful vibe.',
    price: 499,
    discounted: 349,
  },
  {
    id: 2,
    name: 'Citrus Splash',
    image: 'https://images.unsplash.com/photo-1600959738985-bf6a976d3db7?auto=format&fit=crop&w=400&q=80',
    description: 'Bright citrus candle to energize your space.',
    price: 599,
    discounted: 399,
  },
  {
    id: 3,
    name: 'Vanilla Dream',
    image: 'https://images.unsplash.com/photo-1615479812881-c8126656c16e?auto=format&fit=crop&w=400&q=80',
    description: 'Smooth vanilla aroma with warm undertones.',
    price: 549,
    discounted: 399,
  },
  {
    id: 4,
    name: 'Rose Petal Romance',
    image: 'https://images.unsplash.com/photo-1545665277-5937489579fa?auto=format&fit=crop&w=400&q=80',
    description: 'Romantic floral candle perfect for evenings.',
    price: 699,
    discounted: 499,
  },
];

const MoreProducts = () => {
  return (
    <section className="bg-zinc-950 py-16 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Explore More Candles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-zinc-900 rounded-xl p-4 shadow hover:shadow-yellow-500/20 transition transform hover:scale-[1.02]"
            >
              <div className="relative h-56 w-full mb-4 rounded-lg overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">{p.name}</h3>
              <p className="text-zinc-400 text-sm mb-2">{p.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-400 font-semibold text-lg">₹{p.discounted}</span>
                <span className="line-through text-zinc-500 text-sm">₹{p.price}</span>
              </div>
              <div className="flex gap-2">
                <button className="bg-yellow-400 text-black px-3 py-1 text-sm rounded-full hover:bg-yellow-300">
                  Add to Cart
                </button>
                <button className="border border-yellow-400 text-yellow-400 px-3 py-1 text-sm rounded-full hover:bg-yellow-400 hover:text-black">
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreProducts;
