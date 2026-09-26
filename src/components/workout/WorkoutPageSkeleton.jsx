export default function WorkoutPageSkeleton({ details = false }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:py-16" aria-label="Loading workouts" role="status">
      <span className="sr-only">Loading workouts...</span>
      {details ? (
        <div className="grid animate-pulse gap-10 md:grid-cols-2 lg:gap-14">
          <div className="aspect-[4/5] rounded-2xl bg-surface" />
          <div>
            <div className="h-12 w-3/4 rounded bg-surface" />
            <div className="mt-5 h-5 w-full rounded bg-surface" />
            <div className="mt-3 h-5 w-2/3 rounded bg-surface" />
            <div className="mt-8 h-80 rounded-2xl bg-surface" />
          </div>
        </div>
      ) : (
        <div className="animate-pulse">
          <div className="h-72 rounded-2xl bg-surface" />
          <div className="mt-14 h-10 w-52 rounded bg-surface" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="h-80 rounded-2xl bg-surface" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
