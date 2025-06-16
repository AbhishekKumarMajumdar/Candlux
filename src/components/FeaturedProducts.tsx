'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Eye } from 'lucide-react';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Lavender Calm Candle',
    description: 'Soothing lavender fragrance for peaceful evenings.',
    image: '/assets/images/theme.jpg',
    originalPrice: '₹699',
    discountedPrice: '₹499',
    slug: 'lavender-calm-candle',
  },
  {
    id: 2,
    name: 'Vanilla Spice Glow',
    description: 'Warm vanilla and spice for cozy nights.',
    image: '/assets/images/theme.jpg',
    originalPrice: '₹799',
    discountedPrice: '₹599',
    slug: 'vanilla-spice-glow',
  },
  {
    id: 3,
    name: 'Rose Essence Jar',
    description: 'Romantic rose scent to refresh your space.',
    image: '/assets/images/theme.jpg',
    originalPrice: '₹899',
    discountedPrice: '₹699',
    slug: 'rose-essence-jar',
  },
  {
    id: 4,
    name: 'Coconut Luxe Candle',
    description: 'Tropical coconut aroma with a luxe finish.',
    image: '/assets/images/theme.jpg',
    originalPrice: '₹999',
    discountedPrice: '₹799',
    slug: 'coconut-luxe-candle',
  },
];

const FeaturedProducts = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <section className="bg-zinc-900 py-12 px-4 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Featured Products</h2>

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-800 rounded-xl shadow-md flex flex-col overflow-hidden transition hover:shadow-yellow-400/20"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>

              <div className="flex flex-col justify-between flex-grow p-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                  <p className="hidden sm:block text-sm text-zinc-400 mb-3">{product.description}</p>

                  <div className="flex gap-2 items-center mb-4">
                    <span className="text-yellow-400 font-bold text-sm">{product.discountedPrice}</span>
                    <span className="line-through text-zinc-500 text-xs">{product.originalPrice}</span>
                  </div>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
