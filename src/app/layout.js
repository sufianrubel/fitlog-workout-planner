import { Inter, Oswald } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { PlanProvider } from "@/context/PlanContext";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Fit Log | Workout Planner",
  description:
    "Discover workouts, explore exercise details, and build your daily workout plan.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <PlanProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="dark"
          />
        </PlanProvider>
      </body>
    </html>
  );
}
