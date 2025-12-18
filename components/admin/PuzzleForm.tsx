"use client"

import { useState } from "react"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"

interface PuzzleFormData {
  clue: string
  answer: string
  explanation: string
  difficulty: number
  publishDate: string
}

interface PuzzleFormProps {
  initialData?: Partial<PuzzleFormData>
  onSubmit: (data: PuzzleFormData) => Promise<void>
  submitLabel?: string
}

export default function PuzzleForm({ initialData, onSubmit, submitLabel = "Save" }: PuzzleFormProps) {
  const [formData, setFormData] = useState<PuzzleFormData>({
    clue: initialData?.clue || "",
    answer: initialData?.answer || "",
    explanation: initialData?.explanation || "",
    difficulty: initialData?.difficulty || 3,
    publishDate: initialData?.publishDate || ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.clue.trim()) {
      newErrors.clue = "Clue is required"
    }
    if (!formData.answer.trim()) {
      newErrors.answer = "Answer is required"
    }
    if (!formData.publishDate) {
      newErrors.publishDate = "Publish date is required"
    }
    if (formData.difficulty < 1 || formData.difficulty > 5) {
      newErrors.difficulty = "Difficulty must be between 1 and 5"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Clue"
        value={formData.clue}
        onChange={(e) => setFormData({ ...formData, clue: e.target.value })}
        error={errors.clue}
        placeholder="Enter the cryptic clue..."
        required
      />

      <Input
        label="Answer"
        value={formData.answer}
        onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
        error={errors.answer}
        placeholder="The correct answer"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Explanation (optional)
        </label>
        <textarea
          value={formData.explanation}
          onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
          placeholder="Explain how the clue works..."
          className="flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty (1-5)
          </label>
          <input
            type="number"
            min="1"
            max="5"
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: parseInt(e.target.value) })}
            className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          {errors.difficulty && (
            <p className="mt-1 text-sm text-red-600">{errors.difficulty}</p>
          )}
        </div>

        <Input
          label="Publish Date"
          type="date"
          value={formData.publishDate}
          onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
          error={errors.publishDate}
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
      >
        {submitLabel}
      </Button>
    </form>
  )
}
