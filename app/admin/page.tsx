"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Container from "@/components/layout/Container"
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import Spinner from "@/components/ui/Spinner"
import { useToast } from "@/components/ui/Toast"

interface PuzzleWithStats {
  id: string
  clue: string
  answer: string
  difficulty: number
  publishDate: string
  isActive: boolean
  _count: {
    solutions: number
  }
}

export default function AdminPage() {
  const { showToast } = useToast()
  const [puzzles, setPuzzles] = useState<PuzzleWithStats[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPuzzles()
  }, [])

  const fetchPuzzles = async () => {
    try {
      const res = await fetch("/api/admin/puzzles")
      const data = await res.json()

      if (res.ok) {
        setPuzzles(data.puzzles)
      } else {
        showToast(data.error || "Failed to load puzzles", "error")
      }
    } catch (error) {
      showToast("Failed to load puzzles", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this puzzle?")) return

    try {
      const res = await fetch(`/api/admin/puzzles?id=${id}`, {
        method: "DELETE"
      })

      if (res.ok) {
        showToast("Puzzle deleted successfully", "success")
        fetchPuzzles()
      } else {
        const data = await res.json()
        showToast(data.error || "Failed to delete puzzle", "error")
      }
    } catch (error) {
      showToast("Failed to delete puzzle", "error")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <Container>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Link href="/admin/puzzles/new">
            <Button>Add New Puzzle</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Puzzles</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Spinner size="lg" />
              </div>
            ) : puzzles.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No puzzles yet. Create your first one!
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Clue</th>
                      <th className="text-left py-3 px-4">Answer</th>
                      <th className="text-center py-3 px-4">Difficulty</th>
                      <th className="text-center py-3 px-4">Solves</th>
                      <th className="text-center py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {puzzles.map((puzzle) => (
                      <tr key={puzzle.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">
                          {formatDate(puzzle.publishDate)}
                        </td>
                        <td className="py-3 px-4 text-sm max-w-xs truncate">
                          {puzzle.clue}
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          {puzzle.answer}
                        </td>
                        <td className="py-3 px-4 text-center text-sm">
                          {"★".repeat(puzzle.difficulty)}
                        </td>
                        <td className="py-3 px-4 text-center text-sm">
                          {puzzle._count.solutions}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              puzzle.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {puzzle.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(puzzle.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
