import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    // Get all active puzzles and find today's in JavaScript
    // This is more reliable with SQLite date handling
    const allPuzzles = await prisma.puzzle.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        publishDate: 'desc'
      }
    })

    // Get today's date string in YYYY-MM-DD format
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]

    // Find puzzle that matches today's date
    const puzzle = allPuzzles.find(p => {
      const puzzleDate = new Date(p.publishDate).toISOString().split('T')[0]
      return puzzleDate === todayStr
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
