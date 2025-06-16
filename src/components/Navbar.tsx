'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);

  return (
    <header className="shadow-md sticky top-0 bg-zinc-900 text-white z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        
        {/* === Mobile Header === */}
        <div className="flex justify-between items-center md:hidden">
          <Link href="/" className="text-2xl font-bold">Candlux</Link>

          <div className="flex items-center gap-4">
            <Link href="/profile">
              <User className="w-6 h-6 hover:text-yellow-300" />
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 hover:text-yellow-300" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">2</span>
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* === Mobile Search Bar === */}
        <div className="block md:hidden mt-3">
          <div className="flex items-center bg-zinc-800 px-3 py-1 rounded-full w-full">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search candles..."
              className="bg-transparent outline-none ml-2 text-sm w-full text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* === Desktop Header === */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="text-2xl font-bold">Candlux</Link>

          {/* Center: Search Box */}
          <div className="flex items-center bg-zinc-800 px-3 py-1 rounded-full w-full max-w-md mx-6">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search candles..."
              className="bg-transparent outline-none ml-2 text-sm w-full text-white placeholder:text-gray-400"
            />
          </div>

          {/* Right: Menu Items */}
          <ul className="flex items-center gap-6 font-medium">
            <li>
              <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
            </li>
            <li className="relative group">
              <span className="hover:text-yellow-300 cursor-pointer transition">Products</span>
              <ul className="absolute hidden group-hover:flex flex-col bg-zinc-800 shadow-lg p-3 top-6 right-0 min-w-[160px] rounded-md z-50">
                <li><Link href="/products" className="hover:text-yellow-300 py-1 block">All Candles</Link></li>
                <li><Link href="/products/scented" className="hover:text-yellow-300 py-1 block">Scented</Link></li>
                <li><Link href="/products/decorative" className="hover:text-yellow-300 py-1 block">Decorative</Link></li>
              </ul>
            </li>
            <li>
              <Link href="/about" className="hover:text-yellow-300 transition">About</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-yellow-300 transition">Contact</Link>
            </li>
            <li>
              <Link href="/profile">
                <User className="w-5 h-5 hover:text-yellow-300" />
              </Link>
            </li>
            <li>
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-5 h-5 hover:text-yellow-300" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">2</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* === Mobile Menu === */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800">
          <ul className="flex flex-col p-4 gap-3 font-medium text-white">
            <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li>
              <details open={productMenuOpen} className="group">
                <summary
                  onClick={() => setProductMenuOpen(!productMenuOpen)}
                  className="cursor-pointer"
                >
                  Products
                </summary>
                <ul className="pl-4 mt-2 space-y-1">
                  <li><Link href="/products" onClick={() => setMenuOpen(false)}>All Candles</Link></li>
                  <li><Link href="/products/scented" onClick={() => setMenuOpen(false)}>Scented</Link></li>
                  <li><Link href="/products/decorative" onClick={() => setMenuOpen(false)}>Decorative</Link></li>
                </ul>
              </details>
            </li>
            <li><Link href="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
