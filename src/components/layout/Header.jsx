"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const navigation = [
  {
    label: "Workout",
    href: "/#library",
    isActive: (pathname) => pathname === "/" || pathname.startsWith("/workouts"),
  },
  {
    label: "My Plan",
    href: "/my-plan",
    isActive: (pathname) => pathname === "/my-plan",
  },
];

export default function Header() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-4 px-4 py-4 md:grid-cols-[1fr_auto_1fr]">
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

        <nav aria-label="Primary navigation" className="order-3 col-span-2 md:order-none md:col-span-1">
          <ul className="flex items-center justify-center gap-2 text-sm font-semibold text-foreground-subtle">
            {navigation.map((item) => {
              const isActive = item.isActive(pathname);

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`block rounded-full px-4 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      isActive
                        ? "bg-accent-green-deep text-primary"
                        : "hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-4 text-xs font-semibold text-foreground-subtle sm:text-sm">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-md hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Plan
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-background">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 rounded-md hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Saved
            <span className="flex size-5 items-center justify-center rounded-full border border-border text-xs">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
