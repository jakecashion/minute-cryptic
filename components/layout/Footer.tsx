import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Abbie Cryptic. Built with ❤️
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/guide" className="text-gray-600 hover:text-blue-600">
              Guide
            </Link>
            <Link href="/us" className="text-gray-600 hover:text-blue-600">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
