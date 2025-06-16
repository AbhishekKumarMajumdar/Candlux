'use client';

import Link from 'next/link';
import { Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Text */}
        <p className="text-sm text-center md:text-left">
          © 2025 Candlux. Built by{" "}
          <Link
            href="https://abhishekkumarmajumdar.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:underline"
          >
            Abhishek Kumar Majumdar
          </Link>
        </p>

        {/* Right: Icons */}
        <div className="flex gap-4">
          <Link
            href="https://www.instagram.com/its.chiku__?igsh=NHQ1aTYwOHdzM3Zm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition"
          >
            <Instagram className="w-5 h-5" />
          </Link>
          <Link
            href="https://www.youtube.com/@yourchannel" // Update with your actual channel
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition"
          >
            <Youtube className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
