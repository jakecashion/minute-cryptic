/**
 * Validates if the user's answer matches the correct answer
 * Normalizes both answers by:
 * - Converting to lowercase
 * - Removing punctuation and special characters
 * - Trimming whitespace
 * - Collapsing multiple spaces to single space
 */
export function validateAnswer(userAnswer: string, correctAnswer: string): boolean {
  const normalize = (str: string): string =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, ' ')

  return normalize(userAnswer) === normalize(correctAnswer)
}
