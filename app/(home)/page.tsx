import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#B8C9E8] flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo/Title */}
        <h1 className="text-6xl md:text-7xl font-bold mb-4 text-gray-900">
          Abbie Cryptic
        </h1>

        <p className="text-xl md:text-2xl text-gray-800 mb-12 italic">
          One clue. One minute. Every day.
        </p>

        {/* Today's Clue Preview Card */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Today's clue
          </h2>
          <p className="text-gray-600 mb-8">
            A new cryptic crossword clue awaits you
          </p>

          {/* Play Button */}
          <Link href="/solve">
            <button className="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-bold text-xl py-4 px-8 rounded-full border-2 border-black transition-all hover:scale-105 shadow-lg">
              PLAY
            </button>
          </Link>
        </div>

        {/* Secondary Links */}
        <div className="flex gap-6 justify-center text-gray-800">
          <Link href="/guide" className="hover:text-gray-600 transition-colors font-medium">
            How to play
          </Link>
          <span className="text-gray-600">•</span>
          <Link href="/us" className="hover:text-gray-600 transition-colors font-medium">
            About
          </Link>
        </div>
      </div>
    </div>
  )
}
