import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function PlanEmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface px-4 py-14 text-center">
      <Dumbbell aria-hidden="true" className="mx-auto size-10 text-primary" />
      <h3 className="mt-5 text-2xl font-bold uppercase">Nothing here yet</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-foreground-subtle">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-bold uppercase text-background hover:bg-primary-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        Go to workouts
      </Link>
    </div>
  );
}
