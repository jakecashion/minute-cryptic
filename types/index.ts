import { User, Puzzle, Solution } from "@prisma/client"

export type { User, Puzzle, Solution }

// Extended types
export interface PuzzleWithoutAnswer extends Omit<Puzzle, "answer"> {}

export interface UserStats {
  totalSolved: number
  currentStreak: number
  lastSolvedDate?: Date
}

export interface DailyPuzzleData {
  puzzle: PuzzleWithoutAnswer
  userSolution?: Solution
  stats?: UserStats
}
