'use client';

import { useState } from 'react';
import SingleProdectPage from '@/components/SingleProdectPage';

interface Product {
  id: number;
  name: string;
  image: string;
  images?: string[];
  category: string;
  price: number;
  discounted: number;
  rating: number;
  description: string;
  features: string[];
  reviewsCount: number;
}

const allProducts: Product[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Candle ${i + 1}`,
  image: "https://www.radliving.in/cdn/shop/products/rad5062.jpg?v=1663946515",
  images: [
    "https://www.radliving.in/cdn/shop/products/rad5062.jpg?v=1663946515",
    `https://placehold.co/600x600/3f3f46/facc15?text=Candle+${i + 1}+Side`,
    `https://placehold.co/600x600/3f3f46/facc15?text=Candle+${i + 1}+Top`,
    `https://placehold.co/600x600/3f3f46/facc15?text=Candle+${i + 1}+Detail`,
  ],
  category: 'Candle',
  price: 499 + i * 30,
  discounted: 399 + i * 20,
  rating: (i % 5) + 1,
  description: `A beautifully crafted Candle ${i + 1} with a unique aroma. Perfect for relaxing evenings.`,
  features: [
    'Hand-poured perfection',
    'Long-lasting burn (approx. 60 hours)',
    'Eco-friendly materials',
    'Soothing aroma for relaxation',
  ],
  reviewsCount: 10 + i * 2,
}));

const categories = ['All', 'Candle'];
const priceRanges = ['All', 'Under ₹500', '₹500 - ₹800', '₹800+'];

export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filterProducts = () => {
    return allProducts.filter((product) => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const priceMatch =
        selectedPrice === 'All' ||
        (selectedPrice === 'Under ₹500' && product.discounted < 500) ||
        (selectedPrice === '₹500 - ₹800' && product.discounted >= 500 && product.discounted <= 800) ||
        (selectedPrice === '₹800+' && product.discounted > 800);
      return categoryMatch && priceMatch;
    });
  };

  if (selectedProduct) {
    return <SingleProdectPage product={selectedProduct!} onBack={() => setSelectedProduct(null)} />;
  }

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-12 px-4 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold w-full flex justify-between items-center"
          >
            Filters
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${isMobileFilterOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>

        {/* Filter Section */}
        <aside className={`md:w-1/4 w-full md:sticky md:top-24 md:self-start ${isMobileFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="space-y-6 p-6 rounded-xl shadow-lg bg-zinc-900">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <div>
              <h3 className="font-semibold mb-2 text-zinc-300">Category</h3>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsMobileFilterOpen(false);
                  }}
                  className={`block text-left px-3 py-1 rounded-md w-full transition-colors duration-200 ${
                    selectedCategory === cat ? 'bg-yellow-400 text-black font-semibold' : 'hover:bg-zinc-800 text-zinc-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-zinc-300">Price</h3>
              {priceRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setSelectedPrice(range);
                    setIsMobileFilterOpen(false);
                  }}
                  className={`block text-left px-3 py-1 rounded-md w-full transition-colors duration-200 ${
                    selectedPrice === range ? 'bg-yellow-400 text-black font-semibold' : 'hover:bg-zinc-800 text-zinc-200'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product List */}
        <main className="md:w-3/4 w-full overflow-y-auto max-h-[calc(100vh-120px)] pr-2">
          <h2 className="text-2xl font-bold mb-6">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterProducts().map((product) => (
              <div
                key={product.id}
                className="bg-zinc-900 p-4 rounded-xl shadow hover:shadow-yellow-400/20 transition-transform hover:-translate-y-1 flex flex-col"
              >
                <div className="relative h-44 w-full mb-3 rounded-lg overflow-hidden">
                  <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                </div>
                <h3 className="text-md font-semibold">{product.name}</h3>
                <p className="text-sm text-zinc-400">{product.category}</p>
                <div className="flex items-center gap-2 text-sm mt-1 mb-2">
                  <span className="text-yellow-400 font-semibold">₹{product.discounted}</span>
                  <span className="line-through text-zinc-500">₹{product.price}</span>
                </div>
                <div className="flex justify-between mt-auto gap-2">
                  <button className="bg-yellow-400 text-black px-3 py-1.5 text-xs rounded-full hover:bg-yellow-300 transition duration-200 flex-1">
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="border border-yellow-400 text-yellow-400 px-3 py-1.5 text-xs rounded-full hover:bg-yellow-400 hover:text-black transition duration-200 flex-1"
                  >
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
