'use client';

import { useState } from 'react';
// Keep User and LogIn. LogOut is no longer needed for direct toggle.
import { ShoppingCart, Menu, X, User, Search, LogIn } from 'lucide-react';

// Simulated product data for search results
// In a real application, this would come from an API or a global store.
const allSearchProducts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Candle ${i + 1} - ${i % 3 === 0 ? 'Scented' : i % 3 === 1 ? 'Decorative' : 'Pillar'}`,
  link: `/products/${i + 1}`, // Simulated link to product page
}));

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<typeof allSearchProducts>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  // Initial state for login status. In a real app, this would come from auth context/store.
  // For demonstration, you can manually toggle this in your browser's React DevTools or temporarily
  // set it to true/false to see the change.
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to true to see User icon, false for LogIn icon

  /**
   * Filters products based on the search query.
   * In a real app, this would likely be an async call to a search API.
   * @param {string} query - The current search input.
   */
  const filterSearchProducts = (query: string) => {
    if (query.trim() === '') {
      setFilteredResults([]);
      setShowSearchResults(false);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const results = allSearchProducts.filter(product =>
      product.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredResults(results);
    setShowSearchResults(true); // Show results when there's a query
  };

  /**
   * Handles changes to the search input.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterSearchProducts(query); // Filter results as user types
  };

  /**
   * Handles the search action when Enter is pressed or a search button is clicked.
   * This would typically navigate to a full search results page.
   */
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      console.log('Performing full search for:', searchQuery);
      // In a real application, you would typically:
      // router.push(`/search?q=${searchQuery}`);
      alert(`Navigating to search results page for: "${searchQuery}"`); // Using alert for immediate feedback
      setSearchQuery(''); // Clear search query after submit
      setFilteredResults([]); // Clear live results
      setShowSearchResults(false); // Hide results
    }
  };

  /**
   * Handles key presses in the search input. Triggers search on 'Enter' key.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  // No handleLoginToggle as a direct click handler on the icon anymore.
  // The icon itself will be a link.

  return (
    <header className="shadow-md sticky top-0 bg-zinc-900 text-white z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">

        {/* === Mobile Header === */}
        <div className="flex justify-between items-center md:hidden">
          <a href="/" className="text-2xl font-bold">Candlux</a>

          <div className="flex items-center gap-4">
            {/* Dynamic User/Login Icon for Mobile */}
            {isLoggedIn ? (
              <a href="/profile" aria-label="Go to Profile">
                <User className="w-6 h-6 hover:text-yellow-300" />
              </a>
            ) : (
              <a href="/login" aria-label="Login to your account">
                <LogIn className="w-6 h-6 hover:text-yellow-300" />
              </a>
            )}
            <a href="/cart" className="relative" aria-label="View Shopping Cart">
              <ShoppingCart className="w-6 h-6 hover:text-yellow-300" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">2</span>
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close Menu" : "Open Menu"}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* === Mobile Search Bar === */}
        <div className="block md:hidden mt-3 relative">
          <div className="flex items-center bg-zinc-800 px-3 py-1 rounded-full w-full">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search candles..."
              className="bg-transparent outline-none ml-2 text-sm w-full text-white placeholder:text-gray-400"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onFocus={() => searchQuery.trim() !== '' && setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 100)}
              aria-label="Search products"
            />
          </div>
          {showSearchResults && filteredResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg mt-1 z-40 max-h-60 overflow-y-auto">
              {filteredResults.map(product => (
                <a
                  key={product.id}
                  href={product.link}
                  className="block px-3 py-2 text-sm text-white hover:bg-zinc-700 transition-colors"
                  onClick={() => {
                    setShowSearchResults(false);
                    setSearchQuery('');
                  }}
                >
                  {product.name}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* === Desktop Header === */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left: Logo */}
          <a href="/" className="text-2xl font-bold">Candlux</a>

          {/* Center: Search Box */}
          <div className="flex items-center bg-zinc-800 px-3 py-1 rounded-full w-full max-w-md mx-6 relative">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search candles..."
              className="bg-transparent outline-none ml-2 text-sm w-full text-white placeholder:text-gray-400"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onFocus={() => searchQuery.trim() !== '' && setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 100)}
              aria-label="Search products"
            />
            {showSearchResults && filteredResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg mt-1 z-40 max-h-60 overflow-y-auto">
                {filteredResults.map(product => (
                  <a
                    key={product.id}
                    href={product.link}
                    className="block px-3 py-2 text-sm text-white hover:bg-zinc-700 transition-colors"
                    onClick={() => {
                      setShowSearchResults(false);
                      setSearchQuery('');
                    }}
                  >
                    {product.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right: Menu Items */}
          <ul className="flex items-center gap-6 font-medium">
            <li>
              <a href="/" className="hover:text-yellow-300 transition">Home</a>
            </li>
            <li className="relative group">
              <span className="hover:text-yellow-300 cursor-pointer transition">Products</span>
              <ul className="absolute hidden group-hover:flex flex-col bg-zinc-800 shadow-lg p-3 top-6 right-0 min-w-[160px] rounded-md z-50">
                <li><a href="/products" onClick={() => setMenuOpen(false)}>All Candles</a></li>
                <li><a href="/products/scented" onClick={() => setMenuOpen(false)}>Scented</a></li>
                <li><a href="/products/decorative" onClick={() => setMenuOpen(false)}>Decorative</a></li>
              </ul>
            </li>
            <li>
              <a href="/about" className="hover:text-yellow-300 transition">About</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-yellow-300 transition">Contact</a>
            </li>
            {/* Dynamic User/Login Icon for Desktop */}
            <li>
              {isLoggedIn ? (
                <a href="/profile" aria-label="Go to Profile">
                  <User className="w-5 h-5 hover:text-yellow-300" />
                </a>
              ) : (
                <a href="/login" aria-label="Login to your account">
                  <LogIn className="w-5 h-5 hover:text-yellow-300" />
                </a>
              )}
            </li>
            <li>
              <a href="/cart" className="relative" aria-label="View Shopping Cart">
                <ShoppingCart className="w-5 h-5 hover:text-yellow-300" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">2</span>
              </a>
            </li>
            {/* Removed the 'Login/Logout' button */}
          </ul>
        </div>
      </div>

      {/* === Mobile Menu === */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800">
          <ul className="flex flex-col p-4 gap-3 font-medium text-white">
            <li><a href="/" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li>
              <details open={productMenuOpen} className="group">
                <summary
                  onClick={() => setProductMenuOpen(!productMenuOpen)}
                  className="cursor-pointer"
                >
                  Products
                </summary>
                <ul className="pl-4 mt-2 space-y-1">
                  <li><a href="/products" onClick={() => setMenuOpen(false)}>All Candles</a></li>
                  <li><a href="/products/scented" onClick={() => setMenuOpen(false)}>Scented</a></li>
                  <li><a href="/products/decorative" onClick={() => setMenuOpen(false)}>Decorative</a></li>
                </ul>
              </details>
            </li>
            <li><a href="/about" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
