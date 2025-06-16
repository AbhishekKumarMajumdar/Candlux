'use client';

import { useState } from 'react';
import Image from 'next/image';

const allProducts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Candle ${i + 1}`,
  image: `https://source.unsplash.com/400x400/?candle,${i}`,
  category: i % 2 === 0 ? 'Decor' : 'Aromatherapy',
  price: 499 + i * 30,
  discounted: 399 + i * 20,
  rating: (i % 5) + 1,
}));

const categories = ['All', 'Decor', 'Aromatherapy'];
const priceRanges = ['All', 'Under ₹500', '₹500 - ₹800', '₹800+'];

export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');

  const filterProducts = () => {
    return allProducts.filter((product) => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;

      const priceMatch =
        selectedPrice === 'All' ||
        (selectedPrice === 'Under ₹500' && product.discounted < 500) ||
        (selectedPrice === '₹500 - ₹800' &&
          product.discounted >= 500 &&
          product.discounted <= 800) ||
        (selectedPrice === '₹800+' && product.discounted > 800);

      return categoryMatch && priceMatch;
    });
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <aside className="md:col-span-1 space-y-6">
          <h2 className="text-xl font-bold mb-2">Filters</h2>

          <div>
            <h3 className="font-semibold mb-1">Category</h3>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`block text-left px-3 py-1 rounded-md w-full ${
                  selectedCategory === cat
                    ? 'bg-yellow-400 text-black font-semibold'
                    : 'hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-1">Price</h3>
            {priceRanges.map((range) => (
              <button
                key={range}
                onClick={() => setSelectedPrice(range)}
                className={`block text-left px-3 py-1 rounded-md w-full ${
                  selectedPrice === range
                    ? 'bg-yellow-400 text-black font-semibold'
                    : 'hover:bg-zinc-800'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </aside>

        {/* Product Grid */}
        <main className="md:col-span-3">
          <h2 className="text-2xl font-bold mb-6">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filterProducts().map((product) => (
              <div
                key={product.id}
                className="bg-zinc-900 p-4 rounded-xl shadow hover:shadow-yellow-400/20 transition-transform hover:-translate-y-1"
              >
                <div className="relative h-44 w-full mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-md font-semibold">{product.name}</h3>
                <p className="text-sm text-zinc-400">{product.category}</p>
                <div className="flex items-center gap-2 text-sm mt-1 mb-2">
                  <span className="text-yellow-400 font-semibold">₹{product.discounted}</span>
                  <span className="line-through text-zinc-500">₹{product.price}</span>
                </div>
                <div className="flex justify-between">
                  <button className="bg-yellow-400 text-black px-3 py-1 text-xs rounded-full hover:bg-yellow-300">
                    Add to Cart
                  </button>
                  <button className="border border-yellow-400 text-yellow-400 px-3 py-1 text-xs rounded-full hover:bg-yellow-400 hover:text-black">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
