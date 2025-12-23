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
        <div className="w-full p-6 bg-white border-4 border-black rounded-2xl shadow-neobrutalist">
          <div className="flex flex-col gap-4">
            <h2 className="w-full text-center font-sans font-extrabold text-2xl leading-8">
              Today's clue
            </h2>

            <div className="w-full min-h-[64px] flex items-center justify-center">
              <p className="text-center font-serif font-normal text-2xl leading-8">
                Perhaps peace offering confused with danger to italian locals? (5,6)
              </p>
            </div>

            <div className="w-full pt-4">
              <Link href="/solve" className="block">
                <button className="min-h-[48px] font-bold focus:outline-none flex items-center justify-center font-serif border-[3px] border-black rounded-full transition-all duration-300 active:opacity-50 hover:scale-105 shadow-[3px_3px_0px_0px_black] bg-brand-purple w-auto mx-auto px-14">
                  <div className="relative min-w-0 flex">
                    <p className="text-black text-center -translate-y-[2px] p-[0.14em] text-xl">
                      play
                    </p>
                  </div>
                </button>
              </Link>
            </div>

            <p className="w-full min-h-[20px] text-center font-sans font-normal text-sm leading-5">
              23 December, 2025 · By Member: Jack Porter
            </p>
          </div>
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
