const summaryItems = [
  { key: "exercises", label: "Exercises" },
  { key: "minutes", label: "Minutes" },
  { key: "calories", label: "Calories" },
];

export default function PlanSummary({ plan }) {
  const summary = plan.reduce(
    (totals, workout) => ({
      exercises: totals.exercises + 1,
      minutes: totals.minutes + workout.duration,
      calories: totals.calories + workout.caloriesBurned,
    }),
    { exercises: 0, minutes: 0, calories: 0 },
  );

  return (
    <dl className="grid rounded-2xl border border-border bg-surface px-4 py-7 sm:grid-cols-3 sm:py-9">
      {summaryItems.map((item, index) => (
        <div
          key={item.key}
          className={`py-4 sm:px-8 sm:py-0 ${
            index > 0 ? "border-t border-border sm:border-l sm:border-t-0" : ""
          }`}
        >
          <dt className="text-sm text-foreground-subtle">{item.label}</dt>
          <dd
            className={`mt-2 font-heading text-4xl font-bold sm:text-5xl ${
              item.key === "exercises" ? "text-primary" : "text-foreground"
            }`}
          >
            {summary[item.key]}
          </dd>
        </div>
      ))}
    </dl>
  );
}
