export interface Entry {
  id: number;
  date: string;
  weight: number | null;
  sleep_hours: number | null;
  sleep_quality: number | null;
  steps: number | null;
  workout_type: string | null;
  workout_duration: number | null;
  cardio_done: number | null; // SQLite INTEGER: 0 | 1
  /** @deprecated Use meal_* fields instead */
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

export type CreateEntryDto = Omit<Entry, 'id' | 'created_at' | 'updated_at'>;
export type UpdateEntryDto = Partial<CreateEntryDto>;
