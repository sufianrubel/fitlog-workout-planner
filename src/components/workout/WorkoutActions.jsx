"use client";

import { useState } from "react";
import { Bookmark, CalendarPlus } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function WorkoutActions({ workout }) {
  const { addToPlan, saveWorkout } = usePlan();
  const [message, setMessage] = useState("");

  function handleAdd() {
    const result = addToPlan(workout);
    setMessage(
      result.ok
        ? `${workout.name} added to today’s plan.`
        : result.reason === "limit"
          ? "Today’s plan is full."
          : `${workout.name} is already in today’s plan.`,
    );
  }

  function handleSave() {
    setMessage(
      saveWorkout(workout)
        ? `${workout.name} saved for later.`
        : `${workout.name} is already saved.`,
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-background transition-colors hover:bg-primary-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <CalendarPlus aria-hidden="true" className="size-5" />
          Add to today&apos;s plan
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-strong px-5 py-3 text-sm font-medium transition-colors hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <Bookmark aria-hidden="true" className="size-5" />
          Save for later
        </button>
      </div>
      <p className="mt-3 min-h-5 text-sm text-foreground-subtle" role="status">
        {message}
      </p>
    </div>
  );
}
