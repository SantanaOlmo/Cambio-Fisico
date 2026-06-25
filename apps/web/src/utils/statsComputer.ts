import { Entry, INITIAL_WEIGHT } from '../types/entry';

export interface DashboardStats {
  initialWeight: number;
  currentWeight: number | null;
  weightDiff: number | null;
  daysRegistered: number;
  workoutsCompleted: number;
  avgSteps: number | null;
  avgSleep: number | null;
  lastBloating: number | null;
  currentStreak: number;
}

export function computeStats(entries: Entry[]): DashboardStats {
  if (entries.length === 0) {
    return {
      initialWeight: INITIAL_WEIGHT,
      currentWeight: null,
      weightDiff: null,
      daysRegistered: 0,
      workoutsCompleted: 0,
      avgSteps: null,
      avgSleep: null,
      lastBloating: null,
      currentStreak: 0,
    };
  }

  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  const latest = sorted[sorted.length - 1];

  const currentWeight = latest.weight;
  const workoutsCompleted = entries.filter(
    (e) => e.workout_type && e.workout_type !== 'Descanso',
  ).length;

  const stepsEntries = entries.filter((e) => e.steps != null);
  const avgSteps =
    stepsEntries.length > 0
      ? Math.round(stepsEntries.reduce((s, e) => s + e.steps!, 0) / stepsEntries.length)
      : null;

  const sleepEntries = entries.filter((e) => e.sleep_hours != null);
  const avgSleep =
    sleepEntries.length > 0
      ? Number(
          (sleepEntries.reduce((s, e) => s + e.sleep_hours!, 0) / sleepEntries.length).toFixed(1),
        )
      : null;

  const currentStreak = computeStreak(entries);

  return {
    initialWeight: INITIAL_WEIGHT,
    currentWeight,
    weightDiff:
      currentWeight != null ? Number((currentWeight - INITIAL_WEIGHT).toFixed(1)) : null,
    daysRegistered: entries.length,
    workoutsCompleted,
    avgSteps,
    avgSleep,
    lastBloating: latest.bloating,
    currentStreak,
  };
}

function computeStreak(entries: Entry[]): number {
  const dateSet = new Set(entries.map((e) => e.date));
  let streak = 0;
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);

  while (true) {
    const d = cursor.toISOString().split('T')[0];
    if (!dateSet.has(d)) break;
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}
