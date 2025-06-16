'use client';

import React from 'react';

/**
 * AboutPage Component
 * Provides an "About Us" section for the website, detailing the brand's mission,
 * values, and story. It adheres to the dark theme and responsive design.
 * Now includes a background image in the hero section with improved mobile responsiveness.
 */
export default function AboutPage() {
  return (
    <div className="bg-zinc-950 text-white min-h-screen py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Section: Main Title with Background Image */}
        <section
          className="text-center relative py-12 sm:py-20 px-4 rounded-xl overflow-hidden shadow-lg" // Adjusted vertical padding for mobile
          style={{
            backgroundImage: "url('https://www.shutterstock.com/image-photo/jar-cream-candles-spa-stones-600nw-2368308673.jpg')", // Placeholder background image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black opacity-60 rounded-xl"></div>
          <div className="relative z-10"> {/* Ensure text is above the overlay */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-yellow-400">About Our Candles</h1> {/* Adjusted heading size for mobile */}
            <p className="text-base sm:text-xl text-zinc-200 max-w-3xl mx-auto leading-relaxed"> {/* Adjusted paragraph size for mobile */}
              Crafting ambiance, one flame at a time. Discover the passion behind our meticulously made candles.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="bg-zinc-900 p-6 sm:p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-yellow-400">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-zinc-300 leading-relaxed mb-4">
                Founded with a simple vision: to bring warmth, comfort, and exquisite aromas into every home. What started as a small passion project has blossomed into a dedication to the art of candle making. We believe that a candle is more than just a source of light; it's an experience, a mood, a moment of tranquility.
              </p>
              <p className="text-zinc-300 leading-relaxed">
                Every candle we create is a testament to our commitment to quality, sustainability, and sensory delight. We meticulously select the finest natural waxes, premium fragrance oils, and lead-free cotton wicks to ensure a clean, long-lasting, and captivating burn.
              </p>
            </div>
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
              <img
                src="https://placehold.co/600x400/3f3f46/facc15?text=Our+Story"
                alt="Our Story Illustration"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400/3f3f46/facc15?text=Image+Error"; }}
              />
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="bg-zinc-900 p-6 sm:p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-yellow-400">Our Mission</h2>
          <p className="text-zinc-300 leading-relaxed">
            Our mission is to create exceptional candles that enhance everyday living. We strive to offer a diverse range of unique scents and beautiful designs that resonate with our customers, bringing a touch of luxury and serenity into their personal spaces. We are committed to ethical sourcing and environmentally friendly practices, ensuring our products are as good for the planet as they are for your soul.
          </p>
          <ul className="mt-6 space-y-3 text-zinc-300 list-disc list-inside">
            <li>Hand-poured with natural waxes</li>
            <li>Finest fragrance oils for lasting aroma</li>
            <li>Eco-conscious and sustainable practices</li>
            <li>Designed to elevate your home atmosphere</li>
          </ul>
        </section>

        {/* Our Values Section */}
        <section className="bg-zinc-900 p-6 sm:p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-yellow-400 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-yellow-400 mb-3">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v18m-3-6h.01M12 15h.01M15 12h.01M12 9h.01M12 12h.01M12 6h.01M12 18h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Craftsmanship</h3>
              <p className="text-zinc-400 text-sm">
                Every candle is handcrafted with precision and care, ensuring superior quality and a delightful experience.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-yellow-400 mb-3">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.727A8 8 0 016.343 7.273L17.657 16.727zm0 0L19.5 18.5m-1.843-1.773a2 2 0 01-2.828 0l-1.414-1.414m-1.414-1.414a2 2 0 010-2.828l1.414-1.414m-1.414-1.414a2 2 0 010-2.828l1.414-1.414m-1.414-1.414a2 2 0 010-2.828l1.414-1.414M6.343 7.273A8 8 0 0117.657 16.727z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainable Practices</h3>
              <p className="text-zinc-400 text-sm">
                We are dedicated to minimizing our environmental footprint through responsible sourcing and production.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-yellow-400 mb-3">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
              <p className="text-zinc-400 text-sm">
                Your happiness is our priority. We strive to provide exceptional products and service.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action/Contact */}
        <section className="bg-zinc-900 p-6 sm:p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-zinc-300 leading-relaxed mb-6">
            We'd love to hear from you! Whether you have inquiries about our products, collaborations, or just want to share your experience, feel free to reach out.
          </p>
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors duration-200 shadow-lg">
            Contact Us
          </button>
        </section>
      </div>
    </div>
  );
}
