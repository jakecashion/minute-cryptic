import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

// Get all puzzles (admin only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const puzzles = await prisma.puzzle.findMany({
      orderBy: { publishDate: "desc" },
      include: {
        _count: {
          select: { solutions: true }
        }
      }
    })

    return NextResponse.json({ puzzles })
  } catch (error) {
    console.error("Error fetching puzzles:", error)
    return NextResponse.json(
      { error: "Failed to fetch puzzles" },
      { status: 500 }
    )
  }
}

// Create new puzzle (admin only)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { clue, answer, explanation, difficulty, publishDate } = await request.json()

    if (!clue || !answer || !publishDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Parse the date and set to midnight
    const date = new Date(publishDate)
    date.setHours(0, 0, 0, 0)

    // Check if puzzle already exists for this date
    const existing = await prisma.puzzle.findUnique({
      where: { publishDate: date }
    })

    if (existing) {
      return NextResponse.json(
        { error: "A puzzle already exists for this date" },
        { status: 400 }
      )
    }

    const puzzle = await prisma.puzzle.create({
      data: {
        clue,
        answer,
        explanation,
        difficulty: difficulty || 1,
        publishDate: date,
        isActive: true
      }
    })

    return NextResponse.json({ puzzle }, { status: 201 })
  } catch (error) {
    console.error("Error creating puzzle:", error)
    return NextResponse.json(
      { error: "Failed to create puzzle" },
      { status: 500 }
    )
  }
}

// Update puzzle (admin only)
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id, clue, answer, explanation, difficulty, isActive } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: "Puzzle ID is required" },
        { status: 400 }
      )
    }

    const puzzle = await prisma.puzzle.update({
      where: { id },
      data: {
        clue,
        answer,
        explanation,
        difficulty,
        isActive
      }
    })

    return NextResponse.json({ puzzle })
  } catch (error) {
    console.error("Error updating puzzle:", error)
    return NextResponse.json(
      { error: "Failed to update puzzle" },
      { status: 500 }
    )
  }
}

// Delete puzzle (admin only)
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Puzzle ID is required" },
        { status: 400 }
      )
    }

    await prisma.puzzle.delete({
      where: { id }
    })

    return NextResponse.json({ message: "Puzzle deleted successfully" })
  } catch (error) {
    console.error("Error deleting puzzle:", error)
    return NextResponse.json(
      { error: "Failed to delete puzzle" },
      { status: 500 }
    )
  }
}
