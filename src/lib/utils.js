export function matchesWorkoutSearch(workout, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return true;

  return (
    workout.name.toLowerCase().includes(normalizedQuery) ||
    workout.muscleGroups.some((group) =>
      group.toLowerCase().includes(normalizedQuery),
    )
  );
}
