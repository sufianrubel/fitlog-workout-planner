"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { toast } from "react-toastify";
import ExerciseRow from "@/components/plan/ExerciseRow";
import PlanEmptyState from "@/components/plan/PlanEmptyState";
import PlanSummary from "@/components/plan/PlanSummary";
import PlanTabs from "@/components/plan/PlanTabs";
import SortControl from "@/components/plan/SortControl";
import { usePlan } from "@/context/PlanContext";

function subscribeToHydration() {
  return () => {};
}

export default function MyPlanClient({ initialTab = "today" }) {
  const {
    plan,
    saved,
    completedIds,
    maxDailyExercises,
    markDone,
    removeFromPlan,
    removeFromSaved,
  } = usePlan();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [sortBy, setSortBy] = useState("duration");
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

  const activeWorkouts = activeTab === "today" ? plan : saved;
  const sortedWorkouts = useMemo(
    () =>
      [...activeWorkouts].sort((a, b) =>
        sortBy === "rating" ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy],
      ),
    [activeWorkouts, sortBy],
  );

  function handleDone(workout) {
    markDone(workout.id);
    toast.success(`${workout.name} marked as done.`);
  }

  function handleRemove(workout) {
    if (activeTab === "today") removeFromPlan(workout.id);
    else removeFromSaved(workout.id);

    toast.info(
      `${workout.name} removed from ${activeTab === "today" ? "today’s plan" : "saved workouts"}.`,
    );
  }

  return (
    <>
      <section aria-labelledby="my-plan-title">
        <h1 id="my-plan-title" className="text-4xl font-bold uppercase sm:text-5xl">
          My Plan
        </h1>
        <p className="mt-3 text-base text-foreground-subtle sm:text-lg">
          Cap of {maxDailyExercises} lifts for today. Finish them, then load more.
        </p>
        {plan.length >= maxDailyExercises && (
          <p className="mt-2 text-sm font-medium text-primary" role="status">
            Today’s plan is full. Complete or remove an exercise before adding another.
          </p>
        )}
        <div className="mt-8">
          <PlanSummary plan={plan} />
        </div>
      </section>

      <section className="mt-10" aria-label="Plan exercises">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <PlanTabs activeTab={activeTab} onChange={setActiveTab} />
          <SortControl value={sortBy} onChange={setSortBy} />
        </div>

        <div
          id={`${activeTab}-panel`}
          role="tabpanel"
          aria-labelledby={`${activeTab}-tab`}
          className="mt-7 space-y-4"
        >
          {!isHydrated ? (
            <div className="rounded-2xl border border-border bg-surface px-4 py-16 text-center" role="status">
              <p className="animate-pulse text-sm font-medium text-foreground-subtle">
                Loading workouts…
              </p>
            </div>
          ) : sortedWorkouts.length > 0 ? (
            sortedWorkouts.map((workout) => (
              <ExerciseRow
                key={workout.id}
                workout={workout}
                completed={completedIds.includes(workout.id)}
                showDoneAction={activeTab === "today"}
                onDone={() => handleDone(workout)}
                onRemove={() => handleRemove(workout)}
              />
            ))
          ) : (
            <PlanEmptyState />
          )}
        </div>
      </section>
    </>
  );
}
