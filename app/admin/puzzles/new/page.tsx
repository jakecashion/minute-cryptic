"use client"

import { useRouter } from "next/navigation"
import Container from "@/components/layout/Container"
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import PuzzleForm from "@/components/admin/PuzzleForm"
import { useToast } from "@/components/ui/Toast"

export default function NewPuzzlePage() {
  const router = useRouter()
  const { showToast } = useToast()

  const handleSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/admin/puzzles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })

      const result = await res.json()

      if (res.ok) {
        showToast("Puzzle created successfully!", "success")
        router.push("/admin")
      } else {
        showToast(result.error || "Failed to create puzzle", "error")
      }
    } catch (error) {
      showToast("Failed to create puzzle", "error")
    }
  }

  return (
    <Container>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create New Puzzle</CardTitle>
          </CardHeader>
          <CardContent>
            <PuzzleForm onSubmit={handleSubmit} submitLabel="Create Puzzle" />
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
