'use client';

import Image from 'next/image';

const products = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `Candle ${i + 1}`,
  image: `https://www.radliving.in/cdn/shop/products/rad5062.jpg?v=1663946515`,
  description: 'Premium scented candle for a soothing ambiance.',
  price: 599 + i * 20,
  discounted: 449 + i * 10,
}));

const ProductSection = () => {
  return (
    <section className="bg-zinc-950 py-16 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Our Candles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-900 rounded-xl p-4 shadow-md hover:shadow-yellow-500/20 transition-transform transform hover:-translate-y-2"
            >
              <div className="relative h-44 w-full mb-3 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-md font-semibold mb-1">{product.name}</h3>
              <p className="text-xs text-zinc-400 mb-2">{product.description}</p>
              <div className="flex items-center gap-2 mb-4 text-sm">
                <span className="text-yellow-400 font-semibold">₹{product.discounted}</span>
                <span className="line-through text-zinc-500">₹{product.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <button className="bg-yellow-400 text-black px-3 py-1 text-xs rounded-full hover:bg-yellow-300 transition">
                  Add to Cart
                </button>
                <button className="border border-yellow-400 text-yellow-400 px-3 py-1 text-xs rounded-full hover:bg-yellow-400 hover:text-black transition">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
