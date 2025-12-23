"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { Menu } from "lucide-react"

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 bg-[#B8C9E8]/80 backdrop-blur-md border-b border-black/5">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-xl font-black tracking-tighter text-brand-dark">
          Abbie Cryptic
        </Link>

        {/* Simple Menu Trigger (or Auth) */}
        <div className="flex items-center gap-4">
          {session?.user?.role === "ADMIN" && (
            <Link href="/admin" className="text-sm font-bold text-brand-dark hover:opacity-70">
              Admin
            </Link>
          )}
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <Menu className="w-6 h-6 text-brand-dark" />
          </button>
        </div>
      </div>
    </header>
  )
}
