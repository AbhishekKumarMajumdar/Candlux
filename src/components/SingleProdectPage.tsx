'use client';

import { useState } from 'react';
import FeaturedProducts from './FeaturedProducts';
// Removed explicit imports for ProductPage and SingleProductPage
// as they are now defined internally within this file.

// Define Product type (should match the data structure used in allProducts)
interface Product {
  id: number;
  name: string;
  image: string; // Single image for ProductPage list item
  images: string[]; // Array of images for SingleProductPage
  category: string;
  price: number;
  discounted: number;
  rating: number;
  description: string;
  features: string[];
  reviewsCount: number;
}

// --- Start of ProductPage Component (Embedded) ---
// This component is now defined inside the same file as ShopApp

// Sample product data - now all images are the same and categorized as 'Candle'
const allProducts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Candle ${i + 1}`,
  // Using the specified image link for all products
  image: "https://www.radliving.in/cdn/shop/products/rad5062.jpg?v=1663946515",
  // Providing multiple images for the single product page
  images: [
    "https://www.radliving.in/cdn/shop/products/rad5062.jpg?v=1663946515",
    `https://placehold.co/600x600/3f3f46/facc15?text=Candle+${i+1}+Side`,
    `https://placehold.co/600x600/3f3f46/facc15?text=Candle+${i+1}+Top`,
  ],
  category: 'Candle', // All products are now 'Candle' type
  price: 499 + i * 30,
  discounted: 399 + i * 20,
  rating: (i % 5) + 1,
  description: `A beautifully crafted Candle ${i + 1} with a unique aroma. Perfect for relaxing evenings. Made from premium wax and essential oils.`,
  features: [
    'Hand-poured perfection',
    'Long-lasting burn (approx. 60 hours)',
    'Eco-friendly materials',
    'Soothing aroma for relaxation',
  ],
  reviewsCount: 10 + i * 2,
}));

// Filter categories - updated to reflect only 'Candle'
const categories = ['All', 'Candle'];
const priceRanges = ['All', 'Under ₹500', '₹500 - ₹800', '₹800+'];

// Define props interface for ProductPage
interface ProductPageProps {
  onViewProduct: (product: Product) => void; // Function to call when 'View' is clicked
}

/**
 * ProductPage Component
 * Displays a list of products with category and price filtering options.
 * The filter section is fixed on the left for desktop and a dropdown on mobile.
 * When 'View' is clicked, it calls the onViewProduct prop with the product details.
 */
const ProductPage = ({ onViewProduct }: ProductPageProps) => { // Defined as a const to be an inner component
  // State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState('All');
  // State for selected price range filter
  const [selectedPrice, setSelectedPrice] = useState('All');
  // State to control the visibility of the mobile filter dropdown
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  /**
   * Filters the products based on the currently selected category and price range.
   * @returns {Array} An array of filtered product objects.
   */
  const filterProducts = () => {
    return allProducts.filter((product) => {
      // Check if the product category matches the selected category or if 'All' is selected
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;

      // Check if the product's discounted price matches the selected price range or if 'All' is selected
      const priceMatch =
        selectedPrice === 'All' ||
        (selectedPrice === 'Under ₹500' && product.discounted < 500) ||
        (selectedPrice === '₹500 - ₹800' &&
          product.discounted >= 500 &&
          product.discounted <= 800) ||
        (selectedPrice === '₹800+' && product.discounted > 800);

      // Return true if both category and price criteria are met
      return categoryMatch && priceMatch;
    });
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-12 px-4 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Mobile Filter Toggle Button */}
        {/* This button is only visible on small screens (md:hidden) */}
        <div className="md:hidden col-span-1">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold w-full flex justify-between items-center"
          >
            Filters
            {/* Conditional SVG for chevron icon (up/down) */}
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

        {/* Filter Sidebar (fixed on desktop, dropdown on mobile) */}
        <aside
          className={`
            md:col-span-1
            space-y-6
            p-6 rounded-xl shadow-lg
            md:block md:sticky md:top-8 md:self-start
            ${isMobileFilterOpen ? 'block absolute z-10 w-full bg-zinc-900 mt-2' : 'hidden'}
          `}
        >
          <h2 className="text-xl font-bold mb-4">Filters</h2>

          {/* Category Filter Section */}
          <div>
            <h3 className="font-semibold mb-2 text-zinc-300">Category</h3>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setIsMobileFilterOpen(false);
                }}
                className={`block text-left px-3 py-1 rounded-md w-full transition-colors duration-200
                  ${selectedCategory === cat
                    ? 'bg-yellow-400 text-black font-semibold'
                    : 'hover:bg-zinc-800 text-zinc-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Price Filter Section */}
          <div>
            <h3 className="font-semibold mb-2 text-zinc-300">Price</h3>
            {priceRanges.map((range) => (
              <button
                key={range}
                onClick={() => {
                  setSelectedPrice(range);
                  setIsMobileFilterOpen(false);
                }}
                className={`block text-left px-3 py-1 rounded-md w-full transition-colors duration-200
                  ${selectedPrice === range
                    ? 'bg-yellow-400 text-black font-semibold'
                    : 'hover:bg-zinc-800 text-zinc-200'
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
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
                  />
                </div>
                <h3 className="text-md font-semibold">{product.name}</h3>
                <p className="text-sm text-zinc-400">{product.category}</p>
                <div className="flex items-center gap-2 text-sm mt-1 mb-2">
                  <span className="text-yellow-400 font-semibold">₹{product.discounted}</span>
                  <span className="line-through text-zinc-500">₹{product.price}</span>
                </div>
                {/* Star Rating Display */}
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
                  <button className="bg-yellow-400 text-black px-4 py-2 text-sm rounded-full hover:bg-yellow-300 transition-colors duration-200 flex-1">
                    Add to Cart
                  </button>
                  <button
                    onClick={() => onViewProduct(product)} // Call the prop function on 'View' click
                    className="border border-yellow-400 text-yellow-400 px-4 py-2 text-sm rounded-full hover:bg-yellow-400 hover:text-black transition-colors duration-200 flex-1"
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
};
// --- End of ProductPage Component (Embedded) ---

// --- Start of SingleProductPage Component (Embedded) ---
// This component is now defined inside the same file as ShopApp

// Simulated data for similar products (this remains internal for now)
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

// Define the interface for the product data that will be passed as props
interface SingleProductPageProps { // Renamed interface to avoid conflict if ProductDetailsProps was external
  id: number;
  name: string;
  images: string[]; // Array of image URLs
  category: string;
  description: string;
  features: string[];
  price: number;
  discounted: number;
  rating: number;
  reviewsCount: number;
  onBackToProducts: () => void; // New prop: function to go back to product list
}

/**
 * SingleProductPage Component
 * Displays detailed information about a specific product, received via props.
 * Includes an image gallery, description, features, pricing, "Add to Cart",
 * and a "Similar Products" section. It also has a button to go back to the product list.
 * Designed to match the dark theme and be fully responsive.
 *
 * @param {SingleProductPageProps} props - The product data to display, and a callback for going back.
 */
const SingleProductPage = (props: SingleProductPageProps) => { // Defined as a const to be an inner component
  // Destructure product data and the onBackToProducts callback from props
  const { id, name, images, category, description, features, price, discounted, rating, reviewsCount, onBackToProducts } = props;

  // State for quantity to add to cart
  const [quantity, setQuantity] = useState(1);
  // State for the currently displayed main image in the gallery
  // Initialize with the first image from props.images, ensuring images array is not empty
  const [mainImage, setMainImage] = useState(images.length > 0 ? images[0] : 'https://placehold.co/600x600/3f3f46/facc15?text=No+Image');

  /**
   * Handles adding the product to the cart.
   */
  const handleAddToCart = () => {
    console.log(`Added ${quantity} of "${name}" (ID: ${id}) to cart.`);
    alert(`Added ${quantity} of "${name}" to cart!`);
    setQuantity(1);
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto bg-zinc-900 p-6 sm:p-8 rounded-xl shadow-lg">
        {/* Back Button */}
        <button
          onClick={onBackToProducts}
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
                alt={name}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/600x600/3f3f46/facc15?text=Image+Error";
                }}
              />
            </div>
            {/* Image Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-full aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${
                    image === mainImage ? 'border-yellow-400' : 'border-zinc-700 hover:border-yellow-300'
                  } transition-all duration-200`}
                  onClick={() => setMainImage(image)}
                >
                  <img
                    src={image}
                    alt={`${name} thumbnail ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/100x100/3f3f46/facc15?text=Thumb";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{name}</h1>
            <p className="text-yellow-400 text-lg mb-4">{category}</p>

            {/* Pricing */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl font-bold text-yellow-400">₹{discounted}</span>
              <span className="text-xl line-through text-zinc-500">₹{price}</span>
              {price > discounted && (
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {(100 - (discounted / price) * 100).toFixed(0)}% OFF
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center mb-6">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-zinc-600'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.565-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.76c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                </svg>
              ))}
              <span className="ml-2 text-zinc-400 text-sm">
                {rating}.0 ({reviewsCount} reviews)
              </span>
            </div>

            {/* Description */}
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-zinc-300 leading-relaxed mb-6">{description}</p>

            {/* Features */}
            <h3 className="text-xl font-semibold mb-2">Key Features</h3>
            <ul className="list-disc list-inside text-zinc-300 space-y-1 mb-6">
              {features.map((feature, index) => (
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
      <section className="max-w-6xl mx-auto my-12 bg-zinc-900 p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Customer Reviews</h2>
        <div className="text-center text-zinc-400">
          <p>No reviews yet. Be the first to review this product!</p>
        </div>
      </section>

      {/* Similar Products Section */}
    <FeaturedProducts/>
    </div>
  );
};
// --- End of SingleProductPage Component (Embedded) ---

/**
 * ShopApp Component
 * Acts as the main controller for the shop, managing the view between
 * the ProductPage (product list) and SingleProductPage (product detail).
 */
export default function ShopApp() {
  // State to hold the currently selected product for detailed view
  // Null means the product list is being shown
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  /**
   * Callback function passed to ProductPage.
   * Sets the selected product to display its details.
   * @param {Product} product - The product object to display.
   */
  const handleViewProduct = (product: Product) => {
    // Ensure 'images' array exists for SingleProductPage.
    // If not already present, create it from the single 'image' property.
    const productWithMultipleImages: Product = {
      ...product,
      images: product.images && product.images.length > 0 ? product.images : [product.image],
    };
    setSelectedProduct(productWithMultipleImages);
  };

  /**
   * Callback function passed to SingleProductPage.
   * Resets the selected product to null, returning to the product list.
   */
  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      {selectedProduct ? (
        // If a product is selected, render the SingleProductPage
        <SingleProductPage
          {...selectedProduct} // Pass all properties of the selected product
          onBackToProducts={handleBackToProducts} // Pass the back callback
        />
      ) : (
        // Otherwise, render the ProductPage (list of products)
        <ProductPage
          onViewProduct={handleViewProduct} // Pass the view product callback
        />
      )}
    </>
  );
}
