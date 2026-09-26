"use client";

import { Bookmark, CalendarPlus } from "lucide-react";
import { toast } from "react-toastify";
import { usePlan } from "@/context/PlanContext";

export default function WorkoutActions({ workout }) {
  const { plan, maxDailyExercises, addToPlan, saveWorkout } = usePlan();
  const isAlreadyPlanned = plan.some((item) => item.id === workout.id);
  const isPlanFull = plan.length >= maxDailyExercises;
  const isAddDisabled = isAlreadyPlanned || isPlanFull;

  function handleAdd() {
    const result = addToPlan(workout);

    if (result.ok) {
      toast.success(`${workout.name} added to today’s plan.`);
    } else if (result.reason === "limit") {
      toast.warning("Today’s plan is full. Remove a workout before adding another.");
    } else {
      toast.info(`${workout.name} is already in today’s plan.`);
    }
  }

  function handleSave() {
    if (saveWorkout(workout)) {
      toast.success(`${workout.name} saved for later.`);
    } else {
      toast.info(`${workout.name} is already saved.`);
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={handleAdd}
        disabled={isAddDisabled}
        title={
          isAlreadyPlanned
            ? "This workout is already in today's plan."
            : isPlanFull
              ? "Today's plan is full."
              : undefined
        }
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-background transition-colors hover:bg-primary-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-not-allowed disabled:bg-surface-alt disabled:text-foreground-subtle"
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
  );
}
