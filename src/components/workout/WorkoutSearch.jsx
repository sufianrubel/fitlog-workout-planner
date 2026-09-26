"use client";

import { Search } from "lucide-react";

export default function WorkoutSearch({
  id,
  value,
  onChange,
  placeholder = "Search workouts",
}) {
  return (
    <label htmlFor={id} className="relative block w-full sm:w-64">
      <span className="sr-only">{placeholder}</span>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground-subtle"
      />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-foreground-subtle hover:border-border-strong focus:border-primary"
      />
    </label>
  );
}
