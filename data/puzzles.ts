export interface Puzzle {
  id: string
  date: string // YYYY-MM-DD format
  clue: string
  answer: string
  explanation: string
  difficulty: number
}

export const puzzles: Puzzle[] = [
  {
    id: "puzzle-001",
    date: "2025-12-25",
    clue: "Perhaps peace offering confused with danger to italian locals? (5,6)",
    answer: "OLIVEGARDEN",
    explanation: "PEACE (peace offering) + DANGER (danger) confused (anagram indicator) = OLIVE GARDEN (Italian locals)",
    difficulty: 2
  },
  {
    id: "puzzle-002",
    date: "2025-12-26",
    clue: "Perhaps peace offering confused with danger to italian locals? (5,6)",
    answer: "OLIVEGARDEN",
    explanation: "PEACE (peace offering) + DANGER (danger) confused (anagram indicator) = OLIVE GARDEN (Italian locals)",
    difficulty: 2
  }
]

// Helper function to get today's puzzle
export function getTodaysPuzzle(): Puzzle | null {
  const today = new Date().toISOString().split('T')[0]
  return puzzles.find(p => p.date === today) || null
}

// Helper function to get puzzle by date
export function getPuzzleByDate(date: string): Puzzle | null {
  return puzzles.find(p => p.date === date) || null
}
