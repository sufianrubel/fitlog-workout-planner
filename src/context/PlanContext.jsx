"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

const MAX_DAILY_EXERCISES = 5;
const EMPTY_ARRAY = [];
const EMPTY_SERIALIZED_ARRAY = "[]";
const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";
const COMPLETED_KEY = "fitlog-completed";
const STORE_EVENT = "fitlog-store-change";

const PlanContext = createContext(null);

function parseStoredArray(rawValue) {
  try {
    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue : EMPTY_ARRAY;
  } catch {
    return EMPTY_ARRAY;
  }
}

function getEmptySnapshot() {
  return EMPTY_SERIALIZED_ARRAY;
}

function writeStoredArray(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
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

function useStoredArray(key) {
  const getSnapshot = useCallback(
    () => window.localStorage.getItem(key) ?? EMPTY_SERIALIZED_ARRAY,
    [key],
  );
  const rawValue = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getEmptySnapshot,
  );

  return useMemo(() => parseStoredArray(rawValue), [rawValue]);
}

export function PlanProvider({ children }) {
  const storedPlan = useStoredArray(PLAN_KEY);
  const storedSaved = useStoredArray(SAVED_KEY);
  const storedCompletedIds = useStoredArray(COMPLETED_KEY);
  const plan = useMemo(
    () => storedPlan.filter((item) => item && typeof item === "object"),
    [storedPlan],
  );
  const saved = useMemo(
    () => storedSaved.filter((item) => item && typeof item === "object"),
    [storedSaved],
  );
  const completedIds = useMemo(
    () => storedCompletedIds.map(Number).filter(Number.isInteger),
    [storedCompletedIds],
  );

  const addToPlan = useCallback(
    (workout) => {
      if (plan.some((item) => item.id === workout.id)) {
        return { ok: false, reason: "duplicate" };
      }
      if (plan.length >= MAX_DAILY_EXERCISES) {
        return { ok: false, reason: "limit" };
      }

      writeStoredArray(PLAN_KEY, [...plan, workout]);
      return { ok: true };
    },
    [plan],
  );

  const saveWorkout = useCallback(
    (workout) => {
      if (saved.some((item) => item.id === workout.id)) return false;
      writeStoredArray(SAVED_KEY, [...saved, workout]);
      return true;
    },
    [saved],
  );

  const removeFromPlan = useCallback(
    (workoutId) => {
      writeStoredArray(
        PLAN_KEY,
        plan.filter((workout) => workout.id !== workoutId),
      );
      writeStoredArray(
        COMPLETED_KEY,
        completedIds.filter((id) => id !== workoutId),
      );
    },
    [completedIds, plan],
  );

  const removeFromSaved = useCallback(
    (workoutId) => {
      writeStoredArray(
        SAVED_KEY,
        saved.filter((workout) => workout.id !== workoutId),
      );
    },
    [saved],
  );

  const markDone = useCallback(
    (workoutId) => {
      if (!completedIds.includes(workoutId)) {
        writeStoredArray(COMPLETED_KEY, [...completedIds, workoutId]);
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
