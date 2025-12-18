import Container from "@/components/layout/Container"
import Card, { CardContent } from "@/components/ui/Card"

export default function AboutPage() {
  return (
    <Container>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Minute Cryptic</h1>

        <div className="space-y-6">
          <Card>
            <CardContent className="py-6">
              <h2 className="text-2xl font-semibold mb-4">A Gift for Puzzle Lovers</h2>
              <p className="text-gray-700 mb-4">
                Minute Cryptic was created as a thoughtful gift for a small group of cryptic
                crossword enthusiasts. This isn't a commercial platform - it's a labor of love
                designed to bring daily puzzle-solving joy to a close-knit community.
              </p>
              <p className="text-gray-700">
                Every day, a new cryptic clue appears, challenging solvers to think creatively
                and decode the wordplay. Whether you're a seasoned cryptic veteran or just
                starting your journey, there's something here for everyone.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-6">
              <h2 className="text-2xl font-semibold mb-4">What Makes It Special</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Daily puzzles:</strong> A fresh cryptic clue every day to keep your mind sharp</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Learn as you solve:</strong> Explanations help you understand the wordplay</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Track your progress:</strong> See how many puzzles you've solved</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Small community:</strong> Built for quality over quantity</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-6">
              <h2 className="text-2xl font-semibold mb-4">The Philosophy</h2>
              <p className="text-gray-700 mb-4">
                Cryptic crosswords are more than just puzzles - they're a unique form of wordplay
                that combines logic, lateral thinking, and a love of language. Each clue is a
                miniature brain teaser, rewarding solvers with that wonderful "aha!" moment when
                the answer clicks into place.
              </p>
              <p className="text-gray-700">
                This platform is designed to make that daily moment of discovery accessible and
                enjoyable, without the pressure of competition or complex features. Just you,
                the clue, and the satisfaction of solving it.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-6">
              <h2 className="text-2xl font-semibold mb-4">Built With</h2>
              <p className="text-gray-700 mb-4">
                This site was built using modern web technologies:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Next.js & React</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Prisma & SQLite</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Created with care for a small community of puzzle enthusiasts.
              </p>
            </CardContent>
          </Card>

          <div className="text-center py-8">
            <p className="text-gray-600 italic">
              "The joy is in the solving, not just the solution."
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}
