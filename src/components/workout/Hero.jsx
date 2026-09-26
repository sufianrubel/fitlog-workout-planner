import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="grid items-center gap-8 px-6 py-10 sm:px-10 md:grid-cols-5 md:py-14 lg:px-14">
        <div className="md:col-span-3">
          <p className="mb-5 text-xs font-extrabold uppercase tracking-widest text-primary sm:text-sm">
            Workout library
          </p>
          <h1
            id="hero-title"
            className="max-w-3xl text-4xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl"
          >
            Train with intent. Log every set.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-foreground-subtle sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <Link
            href="#workout-library"
            className="mt-7 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-extrabold uppercase text-background transition-colors hover:bg-primary-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Browse workouts
          </Link>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-xs md:col-span-2 md:max-w-sm">
          <Image
            src="/banner.png"
            alt="An anatomical illustration demonstrating an arm curl exercise"
            fill
            loading="eager"
            sizes="(min-width: 768px) 35vw, 80vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
