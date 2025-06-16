'use client';

import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Aarushi Sharma',
    review: 'The fragrance is heavenly! It made my room feel so calm. Will definitely order more.',
    rating: 5,
  },
  {
    name: 'Kunal Mehta',
    review: 'Beautiful design, strong scent, and long lasting. Perfect for gifting too!',
    rating: 4,
  },
  {
    name: 'Sneha Patil',
    review: 'Amazing quality! I love the eco-friendly packaging and fast delivery.',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-zinc-900 py-14 px-4 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Customers Say</h2>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-zinc-800 rounded-xl p-6 text-left shadow-md hover:shadow-yellow-500/10 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-2 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 italic">“{testimonial.review}”</p>
              <p className="mt-4 font-semibold text-yellow-400">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
