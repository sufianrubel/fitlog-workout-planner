import WorkoutCard from "@/components/workout/WorkoutCard";
import { Dumbbell } from "lucide-react";

export default function WorkoutGrid({ workouts }) {
  return (
    <section id="library" aria-labelledby="library-title" className="scroll-mt-6">
      <div className="mb-7">
        <h2 id="library-title" className="text-3xl font-bold uppercase sm:text-4xl">
          The Library
        </h2>
        <p className="mt-1 text-sm text-foreground-subtle sm:text-base">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {workouts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout, index) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              eager={index < 6}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-surface px-4 py-14 text-center">
          <Dumbbell aria-hidden="true" className="mx-auto size-10 text-primary" />
          <h3 className="mt-5 text-2xl font-bold uppercase">No workouts available</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-foreground-subtle">
            The library is empty right now. Please check back later.
          </p>
        </div>
      )}
    </section>
  );
}
