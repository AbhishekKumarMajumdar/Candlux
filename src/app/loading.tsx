export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>

        {/* Message */}
        <p className="text-lg text-gray-300">Preparing your candlelight experience...</p>
      </div>
    </div>
  )
}
