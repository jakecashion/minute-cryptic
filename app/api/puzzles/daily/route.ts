import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    // Get today's date at midnight
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Find today's puzzle
    const puzzle = await prisma.puzzle.findFirst({
      where: {
        publishDate: today,
        isActive: true
      }
    })

    if (!puzzle) {
      return NextResponse.json(
        { error: "No puzzle available for today" },
        { status: 404 }
      )
    }

    // If user is logged in, check if they've already solved it
    let userSolution = null
    if (session?.user?.id) {
      userSolution = await prisma.solution.findUnique({
        where: {
          userId_puzzleId: {
            userId: session.user.id,
            puzzleId: puzzle.id
          }
        }
      })
    }

    // Don't send the answer to the client unless they've already solved it
    const { answer, ...safePuzzle } = puzzle

    return NextResponse.json({
      puzzle: safePuzzle,
      userSolution,
      hasSolved: !!userSolution
    })
  } catch (error) {
    console.error("Error fetching daily puzzle:", error)
    return NextResponse.json(
      { error: "Failed to fetch puzzle" },
      { status: 500 }
    )
  }
}
