import Container from "@/components/layout/Container"
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

export default function GuidePage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Guide to Cryptic Crosswords</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What is a Cryptic Clue?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                A cryptic clue is a word puzzle where the clue text contains both a definition
                and wordplay that leads to the answer. Each clue has two parts:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Definition:</strong> A straightforward meaning of the answer (usually at the start or end)</li>
                <li><strong>Wordplay:</strong> A clever way to construct or hint at the answer using puns, anagrams, or other techniques</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Clue Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">1. Anagrams</h3>
                <p className="text-gray-700 mb-2">
                  Look for indicator words like "confused," "mixed," "strange," "broken"
                </p>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-mono text-sm">
                    <strong>Example:</strong> "Carthorse (anag.) = orchestra"
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">2. Hidden Words</h3>
                <p className="text-gray-700 mb-2">
                  The answer is hidden within the clue. Look for "in," "within," "some"
                </p>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-mono text-sm">
                    <strong>Example:</strong> "Some <u>recent</u>ertainment = cent"
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">3. Reversals</h3>
                <p className="text-gray-700 mb-2">
                  Read backwards. Look for "back," "returns," "going west"
                </p>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-mono text-sm">
                    <strong>Example:</strong> "Trap going west = part"
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">4. Homophones</h3>
                <p className="text-gray-700 mb-2">
                  Sounds like another word. Look for "heard," "sounds like," "on the radio"
                </p>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-mono text-sm">
                    <strong>Example:</strong> "Flower we hear = flour"
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">5. Double Definitions</h3>
                <p className="text-gray-700 mb-2">
                  Two different meanings of the same word
                </p>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-mono text-sm">
                    <strong>Example:</strong> "Flower in a river = rose"
                  </p>
                  <p className="text-xs text-gray-600 mt-1">(flower = something that flows, rose = past tense of rise)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Solving</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Read the clue carefully - every word matters</li>
                <li>Look for indicator words that signal the clue type</li>
                <li>Try to separate the definition from the wordplay</li>
                <li>Consider abbreviations (Dr, St, etc.)</li>
                <li>Think about multiple meanings of words</li>
                <li>Don't give up - sometimes the answer comes in a flash of insight!</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Practice Makes Perfect</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                The more cryptic clues you solve, the better you'll get at recognizing patterns
                and indicator words. Start with our daily puzzles and watch your skills improve!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
