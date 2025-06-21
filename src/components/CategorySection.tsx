'use client';

import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    title: 'Aromatherapy',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
    link: '/category/aromatherapy',
  },
  {
    id: 2,
    title: 'Festive Candles',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
    link: '/category/festive',
  },
  {
    id: 3,
    title: 'Gift Sets',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
    link: '/category/gift-sets',
  },
  {
    id: 4,
    title: 'Minimal Collection',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
    link: '/category/minimal',
  },
  {
    id: 5,
    title: 'Luxury Line',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
    link: '/category/luxury',
  },
  {
    id: 6,
    title: 'Luxury Line',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
    link: '/category/luxury',
  },
];

const CategorySection = () => {
  return (
    <section className="py-10 px-4 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>

        <div className="flex md:flex-row lg:grid lg:grid-cols-6 gap-6 overflow-x-auto md:justify-start lg:justify-center px-2 scrollbar-hide">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="flex flex-col items-center gap-2 hover:text-yellow-400 transition shrink-0 w-28"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg hover:scale-105 transition-transform">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <span className="text-sm font-medium">{category.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
