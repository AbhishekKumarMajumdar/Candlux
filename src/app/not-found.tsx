'use client'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center text-center px-6">
      {/* Galaxy-filled "Oops!" */}
      <h1
        className="text-[100px] font-extrabold text-transparent bg-clip-text"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1580149385271-3c5c7c14618e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        Oops!
      </h1>

      {/* 404 Heading */}
      <h2 className="text-2xl font-semibold text-gray-200 mt-4">404 - PAGE NOT FOUND</h2>

      {/* Explanation Text */}
      <p className="mt-2 text-gray-400 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      {/* Home Button */}
      <a
        href="/"
        className="mt-6 inline-block bg-yellow-400 text-black px-6 py-2 rounded-md font-medium hover:bg-yellow-300 transition"
      >
        Go Back Home
      </a>
    </div>
  )
}
