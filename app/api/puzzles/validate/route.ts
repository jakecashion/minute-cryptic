import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { validateAnswer } from "@/lib/puzzle-validator"

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { puzzleId, answer } = await request.json()

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

    // Validate the answer
    const isCorrect = validateAnswer(answer, puzzle.answer)

    return NextResponse.json({
      isCorrect,
      explanation: isCorrect ? puzzle.explanation : undefined
    })
  } catch (error) {
    console.error("Error validating answer:", error)
    return NextResponse.json(
      { error: "Failed to validate answer" },
      { status: 500 }
    )
  }
}
