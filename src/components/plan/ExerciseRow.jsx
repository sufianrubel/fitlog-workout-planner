"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock3, Flame, Star, X } from "lucide-react";

export default function ExerciseRow({
  workout,
  completed = false,
  showDoneAction = false,
  onDone,
  onRemove,
}) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-surface-soft sm:w-40">
            <Image
              src={workout.image}
              alt={`${workout.name} workout illustration`}
              fill
              sizes="(min-width: 640px) 160px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <h3 className="text-xl font-bold uppercase sm:text-2xl">{workout.name}</h3>
            <p className="mt-1 text-sm text-foreground-subtle">{workout.equipment}</p>
            <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-foreground-muted">
              <div className="flex items-center gap-1.5">
                <Clock3 aria-hidden="true" className="size-4 text-primary" />
                <dt className="sr-only">Duration</dt>
                <dd>{workout.duration} min</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame aria-hidden="true" className="size-4 text-primary" />
                <dt className="sr-only">Calories</dt>
                <dd>{workout.caloriesBurned} kcal</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <Star aria-hidden="true" className="size-4 text-primary" />
                <dt className="sr-only">Rating</dt>
                <dd>{workout.rating}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          <Link
            href={`/workouts/${workout.id}`}
            className="rounded-full border border-border-strong px-5 py-2.5 text-center text-sm font-medium transition-colors hover:border-foreground-muted hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            View Details
          </Link>

          {showDoneAction && (
            <button
              type="button"
              onClick={onDone}
              disabled={completed}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-background transition-colors hover:bg-primary-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-default disabled:bg-surface-alt disabled:text-foreground-subtle"
            >
              <Check aria-hidden="true" className="size-4" />
              {completed ? "Completed" : "Mark as Done"}
            </button>
          )}

          <button
            type="button"
            onClick={onRemove}
            className="rounded-full p-2.5 text-foreground-subtle transition-colors hover:bg-surface-soft hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={`Remove ${workout.name}`}
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>
    </article>
  );
}
