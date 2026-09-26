"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { workouts } from "@/constants/workouts";

const MAX_DAILY_EXERCISES = 5;
const EMPTY_IDS = [];
const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";
const COMPLETED_KEY = "fitlog-completed";
const STORE_EVENT = "fitlog-store-change";

const PlanContext = createContext(null);
const cache = new Map();

function readIds(key) {
  if (typeof window === "undefined") return EMPTY_IDS;

  const rawValue = window.localStorage.getItem(key) ?? "[]";
  const cachedValue = cache.get(key);

  if (cachedValue?.rawValue === rawValue) return cachedValue.ids;

  try {
    const parsedValue = JSON.parse(rawValue);
    const ids = Array.isArray(parsedValue)
      ? parsedValue
          .map((item) => (typeof item === "object" ? item.id : item))
          .filter((id) => Number.isInteger(Number(id)))
          .map(Number)
      : EMPTY_IDS;

    cache.set(key, { rawValue, ids });
    return ids;
  } catch {
    cache.set(key, { rawValue, ids: EMPTY_IDS });
    return EMPTY_IDS;
  }
}

function writeIds(key, ids) {
  window.localStorage.setItem(key, JSON.stringify(ids));
  window.dispatchEvent(new Event(STORE_EVENT));
}

function subscribe(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(STORE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(STORE_EVENT, callback);
  };
}

function useStoredIds(key) {
  const getSnapshot = useCallback(() => readIds(key), [key]);
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_IDS);
}

function resolveWorkouts(ids) {
  return ids
    .map((id) => workouts.find((workout) => workout.id === id))
    .filter(Boolean);
}

export function PlanProvider({ children }) {
  const planIds = useStoredIds(PLAN_KEY);
  const savedIds = useStoredIds(SAVED_KEY);
  const completedIds = useStoredIds(COMPLETED_KEY);

  const plan = useMemo(() => resolveWorkouts(planIds), [planIds]);
  const saved = useMemo(() => resolveWorkouts(savedIds), [savedIds]);

  const addToPlan = useCallback(
    (workoutId) => {
      if (planIds.includes(workoutId)) return { ok: false, reason: "duplicate" };
      if (planIds.length >= MAX_DAILY_EXERCISES) {
        return { ok: false, reason: "limit" };
      }

      writeIds(PLAN_KEY, [...planIds, workoutId]);
      return { ok: true };
    },
    [planIds],
  );

  const saveWorkout = useCallback(
    (workoutId) => {
      if (savedIds.includes(workoutId)) return false;
      writeIds(SAVED_KEY, [...savedIds, workoutId]);
      return true;
    },
    [savedIds],
  );

  const removeFromPlan = useCallback(
    (workoutId) => {
      writeIds(
        PLAN_KEY,
        planIds.filter((id) => id !== workoutId),
      );
      writeIds(
        COMPLETED_KEY,
        completedIds.filter((id) => id !== workoutId),
      );
    },
    [completedIds, planIds],
  );

  const removeFromSaved = useCallback(
    (workoutId) => {
      writeIds(
        SAVED_KEY,
        savedIds.filter((id) => id !== workoutId),
      );
    },
    [savedIds],
  );

  const markDone = useCallback(
    (workoutId) => {
      if (!completedIds.includes(workoutId)) {
        writeIds(COMPLETED_KEY, [...completedIds, workoutId]);
      }
    },
    [completedIds],
  );

  const value = useMemo(
    () => ({
      plan,
      saved,
      completedIds,
      maxDailyExercises: MAX_DAILY_EXERCISES,
      addToPlan,
      saveWorkout,
      removeFromPlan,
      removeFromSaved,
      markDone,
    }),
    [
      addToPlan,
      completedIds,
      markDone,
      plan,
      removeFromPlan,
      removeFromSaved,
      saveWorkout,
      saved,
    ],
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }

  return context;
}
