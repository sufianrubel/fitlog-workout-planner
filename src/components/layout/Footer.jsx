import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-8 text-center sm:flex-row sm:text-left">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          aria-label="FitLog home"
        >
          <Image src="/logo.png" alt="" width={22} height={22} />
          <span className="font-heading font-bold uppercase tracking-wide">FitLog</span>
        </Link>
        <p className="text-xs text-foreground-subtle sm:text-sm">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
