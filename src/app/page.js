//home
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"

export default function Home() {
  return (
    <div className="flex flex-col">
      <main className="flex flex-col justify-between w-full">
          <HeroSection />
          <StatsSection />
      </main>
    </div>
  );
}
