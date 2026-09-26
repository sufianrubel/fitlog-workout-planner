"use client";

import { useMemo, useState } from "react";
import ExerciseRow from "@/components/plan/ExerciseRow";
import PlanEmptyState from "@/components/plan/PlanEmptyState";
import PlanSummary from "@/components/plan/PlanSummary";
import PlanTabs from "@/components/plan/PlanTabs";
import SortControl from "@/components/plan/SortControl";
import { usePlan } from "@/context/PlanContext";

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
  const [statusMessage, setStatusMessage] = useState("");

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
    setStatusMessage(`${workout.name} marked as done.`);
  }

  function handleRemove(workout) {
    if (activeTab === "today") removeFromPlan(workout.id);
    else removeFromSaved(workout.id);

    setStatusMessage(
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

        <p className="sr-only" aria-live="polite">
          {statusMessage}
        </p>

        <div
          id={`${activeTab}-panel`}
          role="tabpanel"
          aria-labelledby={`${activeTab}-tab`}
          className="mt-7 space-y-4"
        >
          {sortedWorkouts.length > 0 ? (
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
            <PlanEmptyState activeTab={activeTab} />
          )}
        </div>
      </section>
    </>
  );
}
