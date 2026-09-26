import { ChevronDown } from "lucide-react";

export default function SortControl({ value, onChange }) {
  return (
    <label className="flex items-center gap-3 text-sm text-foreground-subtle">
      <span>Sort By</span>
      <span className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="appearance-none rounded-xl border border-border bg-surface py-2.5 pl-4 pr-10 font-medium text-foreground outline-none transition-colors hover:border-border-strong focus:border-primary"
        >
          <option value="duration">Duration</option>
          <option value="caloriesBurned">Calories</option>
          <option value="rating">Rating</option>
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2"
        />
      </span>
    </label>
  );
}
