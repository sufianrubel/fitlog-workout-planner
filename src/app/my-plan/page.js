import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MyPlanClient from "@/components/plan/MyPlanClient";

export const metadata = {
  title: "My Plan | FitLog",
  description: "Review today’s workouts and exercises saved for later.",
};

export default async function MyPlanPage({ searchParams }) {
  const params = await searchParams;
  const initialTab = params?.tab === "saved" ? "saved" : "today";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14 lg:py-16">
          <MyPlanClient key={initialTab} initialTab={initialTab} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
