import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout, eager = false }) {
  const { name, image, muscleGroups, equipment, duration, caloriesBurned, rating } =
  workout;

  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      aria-label={`View ${name} workout details`}
    >
      <article>
        <div className="relative aspect-video overflow-hidden bg-surface-soft">
          <Image
            src={image}
            alt={`${name} workout illustration`}
            fill
            loading={eager ? "eager" : "lazy"}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <ul className="mb-4 flex flex-wrap gap-2" aria-label="Target muscle groups">
            {muscleGroups.map((group) => (
              <li
                key={group}
                className="rounded-full bg-primary px-3 py-1 text-xs font-extrabold uppercase leading-none text-background"
              >
                {group}
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-bold uppercase leading-tight">{name}</h3>
          <p className="mt-1 text-sm text-foreground-subtle">{equipment}</p>

          <dl className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-xs text-foreground-subtle">
            <div className="flex items-center gap-1.5">
              <Clock3 aria-hidden="true" className="size-4" />
              <dt className="sr-only">Duration</dt>
              <dd>{duration} min</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame aria-hidden="true" className="size-4" />
              <dt className="sr-only">Calories</dt>
              <dd>{caloriesBurned} kcal</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <Star aria-hidden="true" className="size-4" />
              <dt className="sr-only">Rating</dt>
              <dd>{rating}</dd>
            </div>
          </dl>
        </div>
      </article>
    </Link>
  );
}
