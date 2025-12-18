import Link from "next/link"
import Button from "@/components/ui/Button"
import Container from "@/components/layout/Container"

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <Container className="py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Minute Cryptic
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Your daily cryptic crossword puzzle challenge
          </p>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            Sharpen your mind with a new cryptic clue every day.
            A thoughtful gift for puzzle lovers.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/solve">
              <Button size="lg">Solve Today's Puzzle</Button>
            </Link>
            <Link href="/guide">
              <Button variant="secondary" size="lg">Learn How</Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🧩</div>
            <h3 className="text-xl font-semibold mb-2">Daily Challenge</h3>
            <p className="text-gray-600">
              A new cryptic clue every day to test your solving skills
            </p>
          </div>

          <div className="text-center p-6">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold mb-2">Learn & Improve</h3>
            <p className="text-gray-600">
              Explanations help you understand the wordplay behind each clue
            </p>
          </div>

          <div className="text-center p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              See how you improve over time and build your solving streak
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Ready to get started?
          </p>
          <Link href="/register">
            <Button size="lg">Create Free Account</Button>
          </Link>
        </div>
      </Container>
    </div>
  )
}
