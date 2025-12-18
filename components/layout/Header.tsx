"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import Button from "@/components/ui/Button"

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Minute Cryptic
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/solve"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Solve
            </Link>
            <Link
              href="/guide"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Guide
            </Link>
            <Link
              href="/us"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </Link>
            {session?.user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-3">
            {status === "loading" ? (
              <div className="h-10 w-20 bg-gray-200 animate-pulse rounded" />
            ) : session ? (
              <>
                <span className="text-sm text-gray-600 hidden sm:inline">
                  {session.user?.name || session.user?.email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
