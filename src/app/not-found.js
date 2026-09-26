import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl px-4 py-20 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">404</p>
          <h1 className="mt-3 text-4xl font-bold uppercase sm:text-5xl">Workout not found</h1>
          <p className="mx-auto mt-4 max-w-md text-foreground-subtle">
            That workout doesn&apos;t exist or is no longer available.
          </p>
          <Link href="/#workout-library" className="mt-7 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-bold uppercase text-background hover:bg-primary-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            Browse workouts
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
