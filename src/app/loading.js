import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WorkoutPageSkeleton from "@/components/workout/WorkoutPageSkeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <WorkoutPageSkeleton />
      </main>
      <Footer />
    </div>
  );
}
