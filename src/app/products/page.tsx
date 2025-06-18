'use client';

import { useState } from 'react';

// Define Product interface
interface Product {
  id: number;
  name: string;
  image: string; // Primary image for list view
  images?: string[]; // Optional array of images for detailed view (min 3 for display)
  category: string;
  price: number;
  discounted: number;
  rating: number;
  description: string;
  features: string[];
  reviewsCount: number;
}

// Sample product data
const allProducts: Product[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Candle ${i + 1}`,
  image: "https://www.radliving.in/cdn/shop/products/rad5062.jpg?v=1663946515",
  images: [ // Ensuring at least 3 distinct images for the detailed view
    "https://www.radliving.in/cdn/shop/products/rad5062.jpg?v=1663946515",
    `https://placehold.co/600x600/3f3f46/facc15?text=Candle+${i+1}+A`,
    `https://placehold.co/600x600/3f3f46/facc15?text=Candle+${i+1}+B`,
    `https://placehold.co/600x600/3f3f46/facc15?text=Candle+${i+1}+C`, // Added more unique placeholders
  ],
  category: 'Candle',
  price: 499 + i * 30,
  discounted: 399 + i * 20,
  rating: (i % 5) + 1,
  description: `A beautifully crafted Candle ${i + 1} with a unique aroma. Perfect for creating a relaxing atmosphere in any room. Made from premium quality waxes and infused with natural essential oils for a long-lasting, clean burn. This exquisite candle is designed to fill your space with tranquility and elegance.`,
  features: [
    'Hand-poured perfection',
    'Long-lasting burn (approx. 60 hours)',
    'Eco-friendly materials',
    'Soothing aroma for relaxation',
    'Elegant design suitable for any decor',
    'Non-toxic and lead-free wick'
  ],
  reviewsCount: 10 + i * 2,
}));

// Filter categories
const categories = ['All', 'Candle'];
const priceRanges = ['All', 'Under ₹500', '₹500 - ₹800', '₹800+'];

// Simulated data for similar products (used within the embedded SingleProductPage logic)
const similarProductsData = [
  {
    id: 101,
    name: 'Vanilla Bean Candle',
    image: 'https://placehold.co/300x300/3f3f46/facc15?text=Vanilla',
    price: 499,
    discounted: 399,
  },
  {
    id: 102,
    name: 'Ocean Breeze Diffuser',
    image: 'https://placehold.co/300x300/3f3f46/facc15?text=Diffuser',
    price: 650,
    discounted: 580,
  },
  {
    id: 103,
    name: 'Rose & Sandalwood Scented Wax Melts',
    image: 'https://placehold.co/300x300/3f3f46/facc15?text=Wax+Melts',
    price: 320,
    discounted: 280,
  },
  {
    id: 104,
    name: 'Lavender Relaxation Set',
    image: 'https://placehold.co/300x300/3f3f46/facc15?text=Lavender+Set',
    price: 1200,
    discounted: 999,
  },
];

/**
 * SingleProductPage Content - This is the embedded logic for the detailed view.
 * It is rendered conditionally by the main ProductPage component.
 */
const SingleProductContent = ({ product, onBack }: { product: Product; onBack: () => void }) => {
  // Ensure images array is always available and has at least one element
  // Fallback to the single 'image' if 'images' array is missing or empty
  const images = product.images && product.images.length > 0
    ? product.images
    : (product.image ? [product.image] : ['https://placehold.co/600x600/3f3f46/facc15?text=No+Image+Provided']);

  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(images[0]);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of "${product.name}" (ID: ${product.id}) to cart.`);
    alert(`Added ${quantity} of "${product.name}" to cart!`);
    setQuantity(1);
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto bg-zinc-900 p-6 sm:p-8 rounded-xl shadow-lg">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Product Image Gallery Section */}
          <div className="flex flex-col gap-4">
            {/* Main Product Image */}
            <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md">
              <img
                src={mainImage}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                onError={(e) => { e.currentTarget.src = "https://placehold.co/600x600/3f3f46/facc15?text=Image+Error"; }}
              />
            </div>
            {/* Image Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {images.slice(0, 4).map((image, index) => ( // Show up to 4 thumbnails
                <div
                  key={index}
                  className={`relative w-full aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${
                    image === mainImage ? 'border-yellow-400' : 'border-zinc-700 hover:border-yellow-300'
                  } transition-all duration-200`}
                  onClick={() => setMainImage(image)}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    onError={(e) => { e.currentTarget.src = "https://placehold.co/100x100/3f3f46/facc15?text=Thumb"; }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-yellow-400 text-lg mb-4">{product.category}</p>

            {/* Pricing */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl font-bold text-yellow-400">₹{product.discounted}</span>
              <span className="text-xl line-through text-zinc-500">₹{product.price}</span>
              {product.price > product.discounted && (
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {(100 - (product.discounted / product.price) * 100).toFixed(0)}% OFF
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center mb-6">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400' : 'text-zinc-600'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.565-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.76c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                </svg>
              ))}
              <span className="ml-2 text-zinc-400 text-sm">
                {product.rating}.0 ({product.reviewsCount} reviews)
              </span>
            </div>

            {/* Description */}
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-zinc-300 leading-relaxed mb-6">{product.description}</p>

            {/* Features */}
            <h3 className="text-xl font-semibold mb-2">Key Features</h3>
            <ul className="list-disc list-inside text-zinc-300 space-y-1 mb-6">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            {/* Quantity Selector and Add to Cart Button */}
            <div className="flex items-center gap-4 mt-auto">
              <div className="flex items-center bg-zinc-800 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-white rounded-l-full hover:bg-zinc-700 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-white rounded-r-full hover:bg-zinc-700 transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-grow bg-yellow-400 text-black px-6 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors duration-200 shadow-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="max-w-6xl mx-auto mt-12 bg-zinc-900 p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Customer Reviews</h2>
        <div className="text-center text-zinc-400">
          <p>No reviews yet. Be the first to review this product!</p>
        </div>
      </section>

      {/* Similar Products Section */}
      <section className="max-w-6xl mx-auto mt-12 bg-zinc-900 p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {similarProductsData.map((similarProduct) => (
            <a
              key={similarProduct.id}
              href={`#product-${similarProduct.id}`} // Simulate link for in-page navigation (or replace with actual routing)
              className="bg-zinc-800 p-4 rounded-xl shadow hover:shadow-yellow-400/20 transition-transform hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <div className="relative w-36 h-36 mb-3 rounded-lg overflow-hidden">
                <img
                  src={similarProduct.image}
                  alt={similarProduct.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/300x300/3f3f46/facc15?text=Product";
                  }}
                />
              </div>
              <h3 className="text-lg font-semibold text-white">{similarProduct.name}</h3>
              <div className="flex items-center gap-2 text-sm mt-1">
                <span className="text-yellow-400 font-semibold">₹{similarProduct.discounted}</span>
                <span className="line-through text-zinc-500">₹{similarProduct.price}</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};


/**
 * Main ProductPage Component
 * Displays a list of products with category and price filtering options.
 * It conditionally renders the detailed single product view when a product is selected.
 */
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

  // If a product is selected, render the SingleProductContent
  if (selectedProduct) {
    return (
      <SingleProductContent
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)} // Callback to return to product list
      />
    );
  }

  // Otherwise, render the product listing page
  return (
    <div className="bg-zinc-950 text-white min-h-screen py-12 px-4 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden w-full mb-4">
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

        {/* Filter Sidebar */}
        <aside
          className={`
            md:w-1/4 w-full md:sticky md:top-24 md:self-start
            space-y-6 p-6 rounded-xl shadow-lg bg-zinc-900
            ${isMobileFilterOpen ? 'block' : 'hidden md:block'}
          `}
        >
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
        </aside>

        {/* Product List */}
        <main className="md:w-3/4 w-full pr-2">
          <h2 className="text-2xl font-bold mb-6">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterProducts().map((product) => (
              <div
                key={product.id}
                className="bg-zinc-900 p-4 rounded-xl shadow hover:shadow-yellow-400/20 transition-transform hover:-translate-y-1 flex flex-col"
              >
                <div className="relative h-44 w-full mb-3 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    onError={(e) => { e.currentTarget.src = "https://placehold.co/600x600/3f3f46/facc15?text=Image+Error"; }}
                  />
                </div>
                <h3 className="text-md font-semibold">{product.name}</h3>
                <p className="text-sm text-zinc-400">{product.category}</p>
                <div className="flex items-center gap-2 text-sm mt-1 mb-2">
                  <span className="text-yellow-400 font-semibold">₹{product.discounted}</span>
                  <span className="line-through text-zinc-500">₹{product.price}</span>
                </div>
                <div className="flex items-center mb-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-zinc-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.565-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.76c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-zinc-400">({product.rating})</span>
                </div>
                <div className="flex justify-between mt-auto gap-2">
                  <button className="bg-yellow-400 text-black px-3 py-1.5 text-xs rounded-full hover:bg-yellow-300 transition duration-200 flex-1">
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setSelectedProduct(product)} // Set the selected product in state to show details
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
