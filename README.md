# FitLog — Workout Library & Planner

FitLog is a responsive workout discovery and planning application built with Next.js. It lets users browse a workout library, view detailed exercise instructions, build a five-workout daily plan, and save workouts for later. Plan data is stored locally so it survives page reloads.

## Links

- Repository: [github.com/sufianrubel/fitlog-workout-planner](https://github.com/sufianrubel/fitlog-workout-planner)
- Live site: Not deployed yet

## Key features

- Server-rendered workout library populated from the FitLog API.
- Dynamic `/workouts/[id]` pages with specifications and instructions.
- Today’s Plan with a maximum of five workouts.
- Saved workout collection with live navbar counters.
- Persistent Plan, Saved, and completion state using `localStorage`.
- Live exercise, duration, and calorie totals.
- Sorting by duration, calories, or rating.
- Search by workout name or muscle-group tag.
- Mark as Done and removal actions with toast feedback.
- Responsive layouts for mobile, tablet, and desktop screens.
- Loading, empty, API error, and custom 404 states.

## Technologies

- Next.js 16 with the App Router
- React 19 and JavaScript
- Tailwind CSS 4
- DaisyUI
- React Context API
- React Toastify
- Lucide React icons

## Routes

| Route | Description |
| --- | --- |
| `/` | Workout library and hero section |
| `/workouts/[id]` | Dynamic workout details |
| `/my-plan` | Today’s Plan, Saved workouts, metrics, and sorting |

## API

FitLog uses the assignment API configured through `NEXT_PUBLIC_API_URL`:

```env
NEXT_PUBLIC_API_URL=https://api.api-store.workers.dev
```

- Workout list: `GET /api/fitlog`
- Workout details: `GET /api/fitlog/:id`

API responses are validated before rendering and successful requests are revalidated every five minutes.

## Local development

```bash
git clone https://github.com/sufianrubel/fitlog-workout-planner.git
cd fitlog-workout-planner
npm install
```

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_API_URL=https://api.api-store.workers.dev
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build |
| `npm start` | Run the production build |

## Persistence

FitLog stores planned, saved, and completed workout data in the browser’s `localStorage`. No account or external database is required.

## Assignment

Created for Programming Hero Assignment 6: B14-A6 Fit Log.
