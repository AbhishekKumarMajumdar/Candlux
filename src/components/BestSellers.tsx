'use client';

import Image from 'next/image';
import { ShoppingCart, Eye } from 'lucide-react';
import Link from 'next/link';

const bestSellers = [
  {
    id: 1,
    name: 'Amber Glow Jar',
    image: 'https://images.unsplash.com/photo-1602525428466-5b0a38cf13a0?auto=format&fit=crop&w=800&q=80',
    originalPrice: '₹799',
    discountedPrice: '₹599',
    slug: 'amber-glow-jar',
  },
  {
    id: 2,
    name: 'Ocean Breeze Candle',
    image: 'https://images.unsplash.com/photo-1601134467661-3a3b2c7610ec?auto=format&fit=crop&w=800&q=80',
    originalPrice: '₹899',
    discountedPrice: '₹699',
    slug: 'ocean-breeze-candle',
  },
  {
    id: 3,
    name: 'Mint Mist Votive',
    image: 'https://images.unsplash.com/photo-1599915828887-265d709aba94?auto=format&fit=crop&w=800&q=80',
    originalPrice: '₹599',
    discountedPrice: '₹449',
    slug: 'mint-mist-votive',
  },
  {
    id: 4,
    name: 'Berry Bloom Tin',
    image: 'https://images.unsplash.com/photo-1583938646644-41212e4a2b20?auto=format&fit=crop&w=800&q=80',
    originalPrice: '₹749',
    discountedPrice: '₹549',
    slug: 'berry-bloom-tin',
  },
  {
    id: 5,
    name: 'Citrus Sunshine',
    image: 'https://images.unsplash.com/photo-1611075383548-67f2564eace4?auto=format&fit=crop&w=800&q=80',
    originalPrice: '₹899',
    discountedPrice: '₹699',
    slug: 'citrus-sunshine',
  },
  {
    id: 6,
    name: 'Woodland Escape',
    image: 'https://images.unsplash.com/photo-1582719478165-2b3f43b6a683?auto=format&fit=crop&w=800&q=80',
    originalPrice: '₹849',
    discountedPrice: '₹649',
    slug: 'woodland-escape',
  },
];

const BestSellers = () => {
  return (
    <section className="bg-zinc-900 py-14 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Best Sellers</h2>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="min-w-[250px] bg-zinc-800 rounded-xl p-4 flex-shrink-0 shadow-md hover:shadow-yellow-500/20 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
            >
              <div className="relative w-full h-40 rounded-md overflow-hidden mb-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 250px"
                />
              </div>

              <h3 className="text-base font-semibold mb-1">{product.name}</h3>
              <div className="flex gap-2 items-center mb-3 text-sm">
                <span className="text-yellow-400 font-bold">{product.discountedPrice}</span>
                <span className="line-through text-zinc-500">{product.originalPrice}</span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-yellow-400 text-black px-2 py-1 text-xs rounded-full font-medium hover:bg-yellow-300 transition flex items-center justify-center gap-1">
                  <ShoppingCart size={14} />
                  Cart
                </button>
                <Link
                  href={`/product/${product.slug}`}
                  className="flex-1 border border-yellow-400 text-yellow-400 px-2 py-1 text-xs rounded-full font-medium hover:bg-yellow-400 hover:text-black transition flex items-center justify-center gap-1"
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

export default BestSellers;
