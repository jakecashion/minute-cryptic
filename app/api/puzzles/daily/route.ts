import { NextResponse } from "next/server"
import { getTodaysPuzzle } from "@/data/puzzles"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const puzzle = getTodaysPuzzle()

    if (!puzzle) {
      return NextResponse.json(
        { error: "No puzzle available for today" },
        { status: 404 }
      )
    }

    // Don't send the answer to the client
    const { answer, ...safePuzzle } = puzzle

    return NextResponse.json({
      puzzle: safePuzzle,
      hasSolved: false
    })
  } catch (error) {
    console.error("Error fetching daily puzzle:", error)
    return NextResponse.json(
      { error: "Failed to fetch puzzle" },
      { status: 500 }
    )
  }
}
