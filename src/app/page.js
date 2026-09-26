import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Hero from "@/components/workout/Hero";
import WorkoutGrid from "@/components/workout/WorkoutGrid";
import { getWorkouts } from "@/lib/api";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl space-y-16 px-4 py-8 sm:py-10 lg:space-y-20 lg:py-12">
          <Hero />
          <WorkoutGrid workouts={workouts} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
