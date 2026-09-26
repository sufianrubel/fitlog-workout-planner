const tabs = [
  { id: "today", label: "Today’s Plan" },
  { id: "saved", label: "Saved" },
];

export default function PlanTabs({ activeTab, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Workout collections"
      className="inline-flex rounded-xl border border-border bg-surface p-1"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          id={`${tab.id}-tab`}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`${tab.id}-panel`}
          onClick={() => onChange(tab.id)}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-6 ${
            activeTab === tab.id
              ? "bg-surface-alt text-foreground"
              : "text-foreground-subtle hover:text-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
