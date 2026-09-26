import Image from "next/image";
import Link from "next/link";

const navigation = [
  { label: "Workouts", href: "#workout-library", active: true },
  { label: "My Plan", href: "/my-plan" },
];

export default function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          aria-label="FitLog home"
        >
          <Image src="/logo.png" alt="" width={28} height={28} priority />
          <span className="font-heading text-xl font-bold uppercase tracking-wide">
            FitLog
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="order-3 w-full sm:order-0 sm:w-auto">
          <ul className="flex items-center justify-center gap-2 text-sm font-semibold text-foreground-subtle">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={`block rounded-full px-4 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    item.active
                      ? "bg-accent-green-deep text-primary"
                      : "hover:bg-surface hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 text-xs font-semibold text-foreground-subtle sm:text-sm">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-md hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Plan
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-background">
              0
            </span>
          </Link>
          <Link
            href="/my-plan#saved"
            className="flex items-center gap-2 rounded-md hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Saved
            <span className="flex size-5 items-center justify-center rounded-full border border-border text-xs">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
