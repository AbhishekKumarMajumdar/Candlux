'use client';

import { Leaf, Truck, ShieldCheck, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Leaf size={28} className="text-yellow-400" />,
    title: 'Eco-Friendly',
    description: 'Made with natural soy wax and sustainable packaging.',
  },
  {
    icon: <Sparkles size={28} className="text-yellow-400" />,
    title: 'Handcrafted Quality',
    description: 'Each candle is carefully crafted by skilled artisans.',
  },
  {
    icon: <Truck size={28} className="text-yellow-400" />,
    title: 'Free Shipping',
    description: 'Enjoy free delivery on all orders above ₹499.',
  },
  {
    icon: <ShieldCheck size={28} className="text-yellow-400" />,
    title: 'Trusted by Customers',
    description: '4.9⭐ average from hundreds of happy customers.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-zinc-900 py-14 px-4 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose Candlux?</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-zinc-800 rounded-xl p-6 shadow hover:shadow-yellow-500/10 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
