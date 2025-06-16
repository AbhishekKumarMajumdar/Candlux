'use client';

const reels = [
  {
    id: 1,
    title: 'Candle Pouring Reel',
    url: 'https://www.instagram.com/reel/DK636VaiLoH/?igsh=eng0cXJtMmE0ZXZq', // Replace with your reel link
  },
  {
    id: 2,
    title: 'Candlux Ambiance',
    url: 'https://www.instagram.com/reel/DK636VaiLoH/?igsh=eng0cXJtMmE0ZXZq', // Replace with your reel link
  },
];

const ReelSection = () => {
  return (
    <section className="bg-zinc-950 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Instagram Reels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="w-full aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-md"
            >
              <iframe
                src={reel.url}
                title={reel.title}
                allowTransparency
                allow="encrypted-media"
                loading="lazy"
                className="w-full h-full border-none"
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReelSection;
