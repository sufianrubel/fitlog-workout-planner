fitlog-workout-planner/
├── app/
│   ├── layout.js
│   ├── page.js                      # Home ("/")
│   ├── loading.js                   # global loading UI
│   ├── error.js                     # global error boundary
│   ├── not-found.js                 # custom 404
│   ├── globals.css
│   │
│   ├── workouts/
│   │   ├── page.js                  # "/workouts" - list
│   │   ├── loading.js
│   │   ├── new/
│   │   │   └── page.js              # "/workouts/new"
│   │   └── [id]/
│   │       ├── page.js              # "/workouts/[id]"
│   │       └── loading.js
│   │
│   ├── exercises/
│   │   ├── page.js
│   │   └── [id]/
│   │       └── page.js
│   │
│   ├── progress/
│   │   └── page.js
│   │
│   └── profile/
│       └── page.js
│
├── components/
│   ├── ui/                          # dumb, reusable, no business logic
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   ├── Spinner.jsx
│   │   └── EmptyState.jsx
│   │
│   ├── layout/
│   │   ├── BottomNav.jsx
│   │   ├── Header.jsx
│   │   └── PageContainer.jsx
│   │
│   └── workout/                     # feature-specific ("smart") components
│       ├── WorkoutCard.jsx
│       ├── WorkoutForm.jsx
│       ├── ExerciseCard.jsx
│       ├── ProgressChart.jsx
│       └── Timer.jsx
│
├── services/                        # API layer - সব external call এখানে isolate
│   └── fitlogService.js             # getAll, getById, create, update, remove
│
├── hooks/
│   ├── useWorkouts.js               # data fetching + state (service call করে)
│   ├── useWorkout.js                # single item fetch
│   └── useTimer.js
│
├── lib/
│   ├── fetcher.js                   # base fetch wrapper (baseURL, error handling)
│   └── utils.js                     # formatTime, calculateCalories, cn() ইত্যাদি
│
├── constants/
│   └── categories.js                # strength, cardio, yoga ইত্যাদি static data
│
├── public/
│   ├── image/
│   │   ├── exercises/
│   │   └── avatars/
│   └── favicon.ico
│
├── .env.local                       # NEXT_PUBLIC_API_URL=https://api.abcz.workers.dev
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.js
├── jsconfig.json
└── package.json