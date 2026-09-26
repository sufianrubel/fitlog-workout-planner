"use client";

import { AlertTriangle } from "lucide-react";

export default function WorkoutErrorState({ reset }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 text-center">
      <AlertTriangle aria-hidden="true" className="mx-auto size-10 text-primary" />
      <h1 className="mt-5 text-3xl font-bold uppercase">Couldn&apos;t load workouts</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-foreground-subtle">
        The workout service didn&apos;t return usable data. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-bold uppercase text-background hover:bg-primary-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        Try again
      </button>
    </div>
  );
}
