export interface Entry {
  id: number;
  date: string;
  weight: number | null;
  sleep_hours: number | null;
  sleep_quality: number | null;
  steps: number | null;
  workout_type: string | null;
  workout_duration: number | null;
  cardio_done: number | null;
  /** @deprecated Use meal_* fields */
  food_description: string | null;
  carbs_amount: number | null;
  water_liters: number | null;
  meal_breakfast: string | null;
  meal_lunch: string | null;
  meal_dinner: string | null;
  meal_other: string | null;
  bloating: number | null;
  energy: number | null;
  hunger: number | null;
  mood: number | null;
  notes: string | null;
  photo_path: string | null;
  created_at: string;
  updated_at: string;
}

export type EntryFormData = Omit<Entry, 'id' | 'created_at' | 'updated_at'>;

export const WORKOUT_TYPES = [
  'Gimnasio',
  'Cardio',
  'Caminata',
  'Mixto',
  'Calistenia',
  'Yoga / Movilidad',
  'Padel',
  'Fútbol',
  'Ciclismo',
  'Natación',
  'Descanso',
  'Otro',
] as const;

export type WorkoutType = (typeof WORKOUT_TYPES)[number];

export const INITIAL_WEIGHT = 76.5;
export const GOAL_DAYS = 90;
