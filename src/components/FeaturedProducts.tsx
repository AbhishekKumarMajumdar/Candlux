'use client';

import Image from 'next/image';
import { ShoppingCart, Eye } from 'lucide-react';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Lavender Calm Candle',
    description: 'Soothing lavender fragrance for peaceful evenings.',
    image: 'https://images.unsplash.com/photo-1582727461540-14160c31d9bc?auto=format&fit=crop&w=800&q=80',
    originalPrice: '₹699',
    discountedPrice: '₹499',
    slug: 'lavender-calm-candle',
  },
  {
    id: 2,
    name: 'Vanilla Spice Glow',
    description: 'Warm vanilla and spice for cozy nights.',
    image: 'https://images.unsplash.com/photo-1603052875305-39b9936c0db9?auto=format&fit=crop&w=800&q=80',
    originalPrice: '₹799',
    discountedPrice: '₹599',
    slug: 'vanilla-spice-glow',
  },
  {
    id: 3,
    name: 'Rose Essence Jar',
    description: 'Romantic rose scent to refresh your space.',
    image: 'https://images.unsplash.com/photo-1623934791452-fd9bbba80972?auto=format&fit=crop&w=800&q=80',
    originalPrice: '₹899',
    discountedPrice: '₹699',
    slug: 'rose-essence-jar',
  },
  {
    id: 4,
    name: 'Coconut Luxe Candle',
    description: 'Tropical coconut aroma with a luxe finish.',
    image: 'https://images.unsplash.com/photo-1633471248563-68f6f21dc712?auto=format&fit=crop&w=800&q=80',
    originalPrice: '₹999',
    discountedPrice: '₹799',
    slug: 'coconut-luxe-candle',
  },
];

const FeaturedProducts = () => {
  return (
    <section className="bg-zinc-900 py-12 px-4 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Featured Products</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-800 rounded-xl p-4 shadow-md hover:shadow-yellow-500/20 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
            >
              <div className="relative w-full h-40 rounded-md overflow-hidden mb-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>

              <h3 className="text-base font-semibold">{product.name}</h3>
              <p className="text-sm text-zinc-400 mt-1 mb-2">{product.description}</p>

              <div className="flex gap-2 items-center mb-3">
                <span className="text-yellow-400 font-bold text-sm">{product.discountedPrice}</span>
                <span className="line-through text-zinc-500 text-xs">{product.originalPrice}</span>
              </div>

              <div className="flex gap-2 mt-auto">
                <button className="flex-1 flex items-center justify-center gap-1 bg-yellow-400 text-black px-2 py-1 text-xs rounded-full font-medium hover:bg-yellow-300 transition">
                  <ShoppingCart size={14} />
                  Cart
                </button>

                <Link
                  href={`/product/${product.slug}`}
                  className="flex-1 flex items-center justify-center gap-1 border border-yellow-400 text-yellow-400 px-2 py-1 text-xs rounded-full font-medium hover:bg-yellow-400 hover:text-black transition"
                >
                  <Eye size={14} />
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
