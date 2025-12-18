"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import Spinner from "@/components/ui/Spinner"
import { useToast } from "@/components/ui/Toast"

interface Puzzle {
  id: string
  clue: string
  difficulty: number
  publishDate: string
}

interface Solution {
  isCorrect: boolean
  userAnswer: string
}

export default function DailyGame() {
  const { data: session } = useSession()
  const { showToast } = useToast()
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null)
  const [solution, setSolution] = useState<Solution | null>(null)
  const [answer, setAnswer] = useState("")
  const [timeSpent, setTimeSpent] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [explanation, setExplanation] = useState<string | null>(null)

  useEffect(() => {
    fetchPuzzle()
  }, [])

  useEffect(() => {
    if (puzzle && !solution) {
      const interval = setInterval(() => {
        setTimeSpent(prev => prev + 1)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [puzzle, solution])

  const fetchPuzzle = async () => {
    try {
      const res = await fetch("/api/puzzles/daily")
      const data = await res.json()

      if (res.ok) {
        setPuzzle(data.puzzle)
        setSolution(data.userSolution)
      } else {
        showToast(data.error || "Failed to load puzzle", "error")
      }
    } catch (error) {
      showToast("Failed to load puzzle", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!answer.trim()) {
      showToast("Please enter an answer", "error")
      return
    }

    if (!session) {
      showToast("Please log in to submit answers", "error")
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch("/api/puzzles/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          puzzleId: puzzle?.id,
          answer: answer.trim(),
          timeSpent
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
      } else {
        showToast(data.error || "Failed to submit answer", "error")
      }
    } catch (error) {
      showToast("Failed to submit answer", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!puzzle) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500">No puzzle available for today</p>
        </CardContent>
      </Card>
    )
  }

  const difficultyStars = "★".repeat(puzzle.difficulty) + "☆".repeat(5 - puzzle.difficulty)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Cryptic Clue</CardTitle>
        <div className="text-sm text-gray-500">{difficultyStars}</div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* The Clue */}
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
            <p className="text-xl font-medium text-gray-900">{puzzle.clue}</p>
          </div>

          {/* Timer */}
          {!solution && (
            <div className="text-sm text-gray-500 text-center">
              Time: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
            </div>
          )}

          {/* Already Solved */}
          {solution?.isCorrect ? (
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-800 font-medium">✓ You solved this puzzle!</p>
                <p className="text-green-700 mt-1">Your answer: {solution.userAnswer}</p>
              </div>

              {showExplanation && explanation && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-medium text-gray-900 mb-2">Explanation:</p>
                  <p className="text-gray-700">{explanation}</p>
                </div>
              )}
            </div>
          ) : (
            /* Answer Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Your Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer..."
                disabled={!session || isSubmitting}
                autoFocus
              />

              {!session ? (
                <p className="text-sm text-gray-600 text-center">
                  Please log in to submit your answer
                </p>
              ) : (
                <Button
                  type="submit"
                  className="w-full"
                  isLoading={isSubmitting}
                  disabled={!answer.trim()}
                >
                  Submit Answer
                </Button>
              )}
            </form>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
