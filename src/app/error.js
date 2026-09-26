"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import WorkoutErrorState from "@/components/workout/WorkoutErrorState";

export default function Error({ reset }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <WorkoutErrorState reset={reset} />
      </main>
      <Footer />
    </div>
  );
}
