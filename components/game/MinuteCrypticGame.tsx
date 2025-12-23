"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useToast } from "@/components/ui/Toast"
import { ArrowLeft, Info, Book } from "lucide-react"
import { useRouter } from "next/navigation"

interface Puzzle {
  id: string
  clue: string
  difficulty: number
  publishDate: string
  answer?: string
}

interface Solution {
  isCorrect: boolean
  userAnswer: string
}

export default function MinuteCrypticGame() {
  const { data: session } = useSession()
  const { showToast } = useToast()
  const router = useRouter()
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null)
  const [solution, setSolution] = useState<Solution | null>(null)
  const [currentLetters, setCurrentLetters] = useState<string[]>([])
  const [currentPosition, setCurrentPosition] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showExplanation, setShowExplanation] = useState(false)
  const [explanation, setExplanation] = useState<string | null>(null)
  const [hintsUsed, setHintsUsed] = useState(0)

  useEffect(() => {
    fetchPuzzle()
  }, [])

  const fetchPuzzle = async () => {
    try {
      const res = await fetch("/api/puzzles/daily")
      const data = await res.json()

      if (res.ok) {
        setPuzzle(data.puzzle)
        setSolution(data.userSolution)

        // Initialize letter array based on answer length from clue
        const match = data.puzzle.clue.match(/\((\d+)(?:,\s*(\d+))?\)/)
        if (match) {
          const length1 = parseInt(match[1])
          const length2 = match[2] ? parseInt(match[2]) : 0
          const totalLength = length1 + length2
          setCurrentLetters(new Array(totalLength).fill(''))
        }
      } else {
        showToast(data.error || "Failed to load puzzle", "error")
      }
    } catch (error) {
      showToast("Failed to load puzzle", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (letter: string) => {
    if (currentPosition < currentLetters.length) {
      const newLetters = [...currentLetters]
      newLetters[currentPosition] = letter
      setCurrentLetters(newLetters)
      setCurrentPosition(Math.min(currentPosition + 1, currentLetters.length - 1))
    }
  }

  const handleBackspace = () => {
    if (currentPosition > 0 || currentLetters[currentPosition]) {
      const newLetters = [...currentLetters]
      if (currentLetters[currentPosition]) {
        newLetters[currentPosition] = ''
      } else {
        newLetters[currentPosition - 1] = ''
        setCurrentPosition(currentPosition - 1)
      }
      setCurrentLetters(newLetters)
    }
  }

  const handleCheck = async () => {
    const answer = currentLetters.join('')

    if (!answer.trim() || answer.includes('')) {
      showToast("Please complete all letters", "error")
      return
    }

    try {
      if (!session) {
        const res = await fetch("/api/puzzles/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            puzzleId: puzzle?.id,
            answer: answer
          })
        })

        const data = await res.json()

        if (res.ok) {
          if (data.isCorrect) {
            showToast("Correct! Well done!", "success")
            setSolution({ isCorrect: true, userAnswer: answer })
            if (data.explanation) {
              setExplanation(data.explanation)
              setShowExplanation(true)
            }
          } else {
            showToast("Not quite right. Try again!", "error")
          }
        }
      }
    } catch (error) {
      showToast("Failed to check answer", "error")
    }
  }

  const handleHint = () => {
    if (hintsUsed < currentLetters.length) {
      // Simple hint: reveal next empty letter
      // In a full implementation, this would reveal actual letters from the answer
      setHintsUsed(hintsUsed + 1)
      showToast("Hint feature coming soon!", "info")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#B8C9E8] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    )
  }

  if (!puzzle) {
    return (
      <div className="min-h-screen bg-[#B8C9E8] flex items-center justify-center">
        <div className="text-white text-lg">No puzzle available for today</div>
      </div>
    )
  }

  const date = new Date(puzzle.publishDate)
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  // Parse clue to get word lengths
  const match = puzzle.clue.match(/\((\d+)(?:,\s*(\d+))?\)/)
  const word1Length = match ? parseInt(match[1]) : currentLetters.length
  const word2Length = match && match[2] ? parseInt(match[2]) : 0

  const keyboard = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ]

  return (
    <div className="min-h-screen bg-[#B8C9E8] pb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button
          onClick={() => router.push('/')}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </button>

        <div className="text-center">
          <div className="font-semibold text-gray-900">{formattedDate}</div>
          <div className="text-sm text-gray-700">By Member: Jack Porter</div>
        </div>

        <div className="flex gap-2">
          <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <Info className="w-6 h-6 text-gray-800" />
          </button>
          <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <Book className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>

      {/* Clue Card */}
      <div className="mx-4 mt-2 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <p className="text-xl md:text-2xl font-medium text-gray-900">
            {puzzle.clue}
          </p>
        </div>
      </div>

      {/* Letter Boxes */}
      <div className="flex flex-col items-center gap-3 mb-8">
        {word2Length > 0 ? (
          <>
            {/* First Word */}
            <div className="flex gap-1">
              {currentLetters.slice(0, word1Length).map((letter, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentPosition(idx)}
                  className={`w-10 h-10 md:w-12 md:h-12 border-2 border-black rounded flex items-center justify-center text-xl font-bold cursor-pointer transition-colors ${
                    idx === currentPosition ? 'bg-pink-300' : 'bg-white'
                  }`}
                >
                  {letter}
                </div>
              ))}
            </div>
            {/* Second Word */}
            <div className="flex gap-1">
              {currentLetters.slice(word1Length).map((letter, idx) => (
                <div
                  key={idx + word1Length}
                  onClick={() => setCurrentPosition(idx + word1Length)}
                  className={`w-10 h-10 md:w-12 md:h-12 border-2 border-black rounded flex items-center justify-center text-xl font-bold cursor-pointer transition-colors ${
                    idx + word1Length === currentPosition ? 'bg-pink-300' : 'bg-white'
                  }`}
                >
                  {letter}
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Single Word */
          <div className="flex gap-1">
            {currentLetters.map((letter, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentPosition(idx)}
                className={`w-10 h-10 md:w-12 md:h-12 border-2 border-black rounded flex items-center justify-center text-xl font-bold cursor-pointer transition-colors ${
                  idx === currentPosition ? 'bg-pink-300' : 'bg-white'
                }`}
              >
                {letter}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center items-center gap-2 mb-2">
        {currentLetters.map((letter, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${
              letter ? 'bg-gray-900' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      <div className="text-center italic text-gray-800 mb-8">par</div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={handleHint}
          className="px-8 py-3 bg-yellow-300 hover:bg-yellow-400 text-black font-bold italic rounded-full border-2 border-black transition-colors"
        >
          hints
        </button>
        <button
          onClick={handleCheck}
          className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold italic rounded-full border-2 border-black transition-colors"
        >
          check
        </button>
      </div>

      {/* Explanation (if solved) */}
      {showExplanation && explanation && (
        <div className="mx-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-lg mb-2">Explanation:</h3>
            <p className="text-gray-800">{explanation}</p>
          </div>
        </div>
      )}

      {/* Keyboard */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#B8C9E8] pb-safe">
        <div className="max-w-2xl mx-auto px-2 pb-4">
          {keyboard.map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-center gap-1 mb-1">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className="w-10 h-12 bg-white hover:bg-gray-100 rounded border border-gray-300 text-lg font-semibold transition-colors"
                >
                  {key}
                </button>
              ))}
              {rowIdx === 2 && (
                <button
                  onClick={handleBackspace}
                  className="w-10 h-12 bg-white hover:bg-gray-100 rounded border border-gray-300 flex items-center justify-center transition-colors"
                >
                  ⌫
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
