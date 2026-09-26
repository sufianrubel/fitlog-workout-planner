import "server-only";
import { cache } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.abcz.workers.dev";

export class FitlogApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = "FitlogApiError";
    this.status = status;
  }
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function hasValidId(value) {
  return (
    (typeof value === "number" && Number.isInteger(value) && value > 0) ||
    (typeof value === "string" && /^\d+$/.test(value) && Number(value) > 0)
  );
}

function hasValidSummary(workout) {
  return (
    workout !== null &&
    typeof workout === "object" &&
    hasValidId(workout.id) &&
    isNonEmptyString(workout.name) &&
    isNonEmptyString(workout.image) &&
    Array.isArray(workout.muscleGroups) &&
    workout.muscleGroups.length > 0 &&
    workout.muscleGroups.every(isNonEmptyString) &&
    isNonEmptyString(workout.equipment) &&
    isFiniteNumber(workout.duration) &&
    isFiniteNumber(workout.caloriesBurned) &&
    isFiniteNumber(workout.rating)
  );
}

function normalizeWorkout(workout) {
  return { ...workout, id: Number(workout.id) };
}

function hasValidDetails(workout) {
  return (
    hasValidSummary(workout) &&
    isNonEmptyString(workout.description) &&
    isNonEmptyString(workout.difficulty) &&
    isFiniteNumber(workout.sets) &&
    (isNonEmptyString(workout.reps) || isFiniteNumber(workout.reps)) &&
    Array.isArray(workout.instructions) &&
    workout.instructions.length > 0 &&
    workout.instructions.every(isNonEmptyString)
  );
}

async function request(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new FitlogApiError(
      response.status === 404
        ? "Workout not found."
        : "The workout service is unavailable.",
      response.status,
    );
  }

  try {
    return await response.json();
  } catch {
    throw new FitlogApiError("The workout service returned invalid JSON.", 502);
  }
}

function getListPayload(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.workouts)) return payload.workouts;
  return null;
}

function getDetailPayload(payload) {
  return payload?.data ?? payload?.workout ?? payload;
}

export async function getWorkouts() {
  const payload = await request("/api/fitlog");
  const workouts = getListPayload(payload);

  if (!workouts || !workouts.every(hasValidSummary)) {
    throw new FitlogApiError("The workout list has an invalid format.", 502);
  }

  return workouts.map(normalizeWorkout);
}

export const getWorkout = cache(async function getWorkout(id) {
  const payload = await request(`/api/fitlog/${encodeURIComponent(id)}`);
  const workout = getDetailPayload(payload);

  if (!hasValidDetails(workout)) {
    throw new FitlogApiError("The workout details have an invalid format.", 502);
  }

  return normalizeWorkout(workout);
});
