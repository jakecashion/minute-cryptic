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
    <div className="flex flex-col min-h-[calc(100vh-64px)] max-w-md mx-auto relative pb-safe">

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-4 pb-64 no-scrollbar">

        {/* The Clue - Centerpiece */}
        <div className="mb-12 text-center px-2">
          <p className="text-2xl md:text-3xl font-serif font-bold text-brand-dark leading-snug">
            {puzzle.clue}
          </p>
        </div>

        {/* Letter Boxes */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-8">
          {currentLetters.map((letter, idx) => {
            const isSelected = idx === currentPosition;
            // Add gap after first word if there are two words
            const isWordBreak = word2Length > 0 && idx === word1Length;
            return (
              <div
                key={idx}
                onClick={() => setCurrentPosition(idx)}
                className={`
                  w-11 h-12 md:w-12 md:h-14
                  border-2 ${isSelected ? 'border-black' : 'border-black/20'}
                  rounded-lg flex items-center justify-center
                  text-2xl font-bold font-sans transition-all duration-100
                  ${isSelected ? 'bg-brand-pink scale-110 z-10 shadow-neobrutalist-sm' : 'bg-white'}
                  ${letter ? 'text-black' : 'text-transparent'}
                  ${isWordBreak ? 'ml-3' : ''}
                `}
              >
                {letter}
              </div>
            )
          })}
        </div>

        {/* Action Buttons - Hints / Check */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={handleHint}
            className="px-6 py-2 bg-white hover:bg-gray-50 text-black font-bold text-sm rounded-lg border-2 border-black/10 transition-all active:scale-95"
          >
            HINT
          </button>
          <button
            onClick={handleCheck}
            className="px-8 py-2 bg-brand-yellow text-black font-black text-sm rounded-lg border-2 border-black shadow-neobrutalist-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:scale-95 transition-all"
          >
            CHECK
          </button>
        </div>
      </div>

      {/* Explanation (if solved) */}
      {showExplanation && explanation && (
        <div className="mx-4 mb-8">
          <div className="bg-brand-dark border-2 border-black rounded-2xl p-6 shadow-neobrutalist">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 bg-brand-yellow rounded-full"></div>
              <h3 className="font-black text-lg text-white">Explanation</h3>
            </div>
            <p className="text-gray-200 font-serif leading-relaxed">{explanation}</p>
          </div>
        </div>
      )}

      {/* Keyboard - Fixed to bottom */}
      <div className="bg-[#B8C9E8]/95 backdrop-blur-sm pt-2 pb-6 px-1">
        <div className="max-w-md mx-auto">
          {keyboard.map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-center gap-1 mb-1.5">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className="w-8 h-12 flex-1 bg-white rounded-[4px] shadow-[0_1px_0_rgba(0,0,0,0.1)] text-lg font-bold text-brand-dark active:bg-gray-200 active:scale-95 transition-all"
                >
                  {key}
                </button>
              ))}
              {rowIdx === 2 && (
                <button
                  onClick={handleBackspace}
                  className="w-10 flex items-center justify-center bg-black/10 rounded-[4px] shadow-[0_1px_0_rgba(0,0,0,0.1)] text-brand-dark font-bold active:bg-black/20 active:scale-95 transition-all"
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
