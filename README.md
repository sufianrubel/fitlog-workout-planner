# Fit Log — Workout Library & Planner

Fit Log is a responsive workout discovery and planning app built with Next.js. Browse exercises, read detailed instructions, add workouts to today's plan, and keep favorites in a saved list.

> **Project status:** Update this README to match the features you have completed before submitting the assignment.

## Live site

Add your deployed URL here after deployment.

## Features

- Browse workouts loaded from the assignment API.
- Open a dedicated details page for each workout.
- Add workouts to today's plan.
- Save workouts to revisit later.
- Review planned and saved workouts on the My Plan page.
- Receive toast feedback after plan and save actions.
- Use the site on mobile, tablet, and desktop screens.
- See helpful loading, empty, and error states.

## Technologies

- Next.js (App Router)
- React and JavaScript
- Tailwind CSS
- Context API for shared plan state
- Sonner for toast notifications
- Lucide React for icons

## Getting started

```bash
git clone https://github.com/sufianrubel/fitlog-workout-planner.git
cd fitlog-workout-planner
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

```bash
npm run dev    # Start the development server
npm run build  # Create a production build
npm run start  # Run the production build
npm run lint   # Check the code with ESLint
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Workout library |
| `/workouts/[id]` | Workout details |
| `/my-plan` | Today's plan and saved workouts |

## Data source

Workout information comes from the API supplied in the [assignment requirements](https://github.com/ProgrammingHero1/B14-A6-Fit-Log). Add the exact API endpoint and attribution here once implemented.

## Deployment checklist

- Check the home page and API data.
- Open a workout details page and reload its URL.
- Add, save, and remove workouts; check `/my-plan`.
- Test the layout on a mobile screen.
- Check for broken images and browser console errors.

## Assignment

Created for Programming Hero Assignment 6 (B14-A6-Fit-Log).
