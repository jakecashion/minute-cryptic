import Container from "@/components/layout/Container"
import DailyGame from "@/components/game/DailyGame"

export default function SolvePage() {
  return (
    <Container>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Daily Puzzle</h1>
        <DailyGame />
      </div>
    </Container>
  )
}
