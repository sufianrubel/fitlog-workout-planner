import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import WorkoutActions from "@/components/workout/WorkoutActions";
import { FitlogApiError, getWorkout } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Workout Details | FitLog",
  description: "View workout specifications and step-by-step instructions.",
};

export default async function WorkoutDetailsPage({ params }) {
  const { id } = await params;

  if (!id || !/^\d+$/.test(id)) notFound();

  let workout;
  try {
    workout = await getWorkout(id);
  } catch (error) {
    if (error instanceof FitlogApiError && error.status === 404) notFound();
    throw error;
  }

  const stats = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-2 md:items-start lg:gap-14 lg:py-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-soft">
            <Image
              src={workout.image}
              alt={`${workout.name} workout illustration`}
              fill
              priority
              sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <section aria-labelledby="workout-title">
            <h1 id="workout-title" className="text-4xl font-bold uppercase leading-tight sm:text-5xl">
              {workout.name}
            </h1>
            <p className="mt-4 text-base leading-7 text-foreground-subtle sm:text-lg">
              {workout.description}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Target muscle groups">
              {workout.muscleGroups.map((group) => (
                <li key={group} className="rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-background">
                  {group}
                </li>
              ))}
            </ul>

            <dl className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface px-4 sm:px-7">
              {stats.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-5 border-b border-border py-4 last:border-b-0">
                  <dt className="text-xs font-bold uppercase tracking-wider text-foreground-subtle sm:text-sm">{label}</dt>
                  <dd className="text-right text-sm text-foreground-muted sm:text-base">{value}</dd>
                </div>
              ))}
            </dl>

            <section className="mt-8" aria-labelledby="instructions-title">
              <h2 id="instructions-title" className="text-2xl font-bold uppercase">Instructions</h2>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-foreground-muted sm:text-base">
                {workout.instructions.map((instruction) => (
                  <li key={instruction} className="pl-1">{instruction}</li>
                ))}
              </ol>
            </section>

            <div className="mt-8">
              <WorkoutActions workout={workout} />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
