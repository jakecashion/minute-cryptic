import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { validateAnswer } from "@/lib/puzzle-validator"

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { puzzleId, answer, timeSpent } = await request.json()

    if (!puzzleId || !answer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Get the puzzle with the correct answer
    const puzzle = await prisma.puzzle.findUnique({
      where: { id: puzzleId }
    })

    if (!puzzle) {
      return NextResponse.json(
        { error: "Puzzle not found" },
        { status: 404 }
      )
    }

    // Check if user has already submitted an answer for this puzzle
    const existingSolution = await prisma.solution.findUnique({
      where: {
        userId_puzzleId: {
          userId: session.user.id,
          puzzleId: puzzleId
        }
      }
    })

    if (existingSolution) {
      return NextResponse.json(
        { error: "You have already submitted an answer for this puzzle" },
        { status: 400 }
      )
    }

    // Validate the answer
    const isCorrect = validateAnswer(answer, puzzle.answer)

    // Save the solution
    const solution = await prisma.solution.create({
      data: {
        userId: session.user.id,
        puzzleId: puzzleId,
        userAnswer: answer,
        isCorrect,
        timeSpent: timeSpent || 0
      }
    })

    return NextResponse.json({
      isCorrect,
      solution,
      correctAnswer: isCorrect ? undefined : puzzle.answer,
      explanation: isCorrect ? puzzle.explanation : undefined
    })
  } catch (error) {
    console.error("Error submitting answer:", error)
    return NextResponse.json(
      { error: "Failed to submit answer" },
      { status: 500 }
    )
  }
}
