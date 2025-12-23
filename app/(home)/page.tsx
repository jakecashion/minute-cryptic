import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4">
      <div className="max-w-sm w-full text-center space-y-8">

        {/* Main Brand Area */}
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-brand-dark transform -rotate-1">
            Abbie<br/>Cryptic
          </h1>
          <p className="text-xl font-serif italic text-gray-800">
            One clue. One minute. Every day.
          </p>
        </div>

        {/* The "Daily" Card */}
        <div className="bg-white border-4 border-black rounded-[2.5rem] p-6 shadow-neobrutalist transform transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-200">
            <span className="font-bold text-gray-400 uppercase tracking-wider text-xs">Daily Puzzle</span>
            <span className="font-bold text-brand-dark bg-gray-100 px-3 py-1 rounded-full text-xs">Dec 23</span>
          </div>

          <h2 className="text-2xl font-serif font-bold text-brand-dark mb-6 leading-relaxed">
            Ready to solve today's hidden meaning?
          </h2>

          <Link href="/solve" className="block">
            <button className="w-full bg-brand-purple border-2 border-black text-black font-black text-xl py-4 rounded-xl shadow-neobrutalist-sm hover:shadow-neobrutalist hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all active:shadow-none active:translate-x-0 active:translate-y-0">
              PLAY NOW
            </button>
          </Link>
        </div>

        {/* Footer Links */}
        <div className="flex gap-6 justify-center text-brand-dark font-bold text-sm uppercase tracking-widest opacity-60">
          <Link href="/guide" className="hover:opacity-100 transition-opacity border-b-2 border-transparent hover:border-brand-dark">How to play</Link>
          <Link href="/us" className="hover:opacity-100 transition-opacity border-b-2 border-transparent hover:border-brand-dark">About Us</Link>
        </div>
      </div>
    </div>
  )
}
