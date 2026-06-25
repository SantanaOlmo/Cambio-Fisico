import { Entry, CreateEntryDto } from '../types/entry';
import { queryAll, queryOne, execute, lastInsertRowid } from '../db/helpers';

const COLUMNS = `
  id, date, weight, sleep_hours, sleep_quality, steps,
  workout_type, workout_duration, cardio_done,
  food_description, carbs_amount, water_liters,
  meal_breakfast, meal_lunch, meal_dinner, meal_other,
  bloating, energy, hunger, mood,
  notes, photo_path, created_at, updated_at
`;

export function findAll(): Entry[] {
  return queryAll<Entry>(`SELECT ${COLUMNS} FROM entries ORDER BY date DESC`);
}

export function findById(id: number): Entry | undefined {
  return queryOne<Entry>(`SELECT ${COLUMNS} FROM entries WHERE id = ?`, [id]);
}

export function findByDate(date: string): Entry | undefined {
  return queryOne<Entry>(`SELECT ${COLUMNS} FROM entries WHERE date = ?`, [date]);
}

export function create(data: CreateEntryDto): Entry {
  const now = new Date().toISOString();

  execute(
    `INSERT INTO entries (
      date, weight, sleep_hours, sleep_quality, steps,
      workout_type, workout_duration, cardio_done,
      food_description, carbs_amount, water_liters,
      meal_breakfast, meal_lunch, meal_dinner, meal_other,
      bloating, energy, hunger, mood,
      notes, photo_path, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.date,
      data.weight,
      data.sleep_hours,
      data.sleep_quality,
      data.steps,
      data.workout_type,
      data.workout_duration,
      data.cardio_done,
      data.food_description,
      data.carbs_amount,
      data.water_liters,
      data.meal_breakfast,
      data.meal_lunch,
      data.meal_dinner,
      data.meal_other,
      data.bloating,
      data.energy,
      data.hunger,
      data.mood,
      data.notes,
      data.photo_path,
      now,
      now,
    ],
  );

  return findById(lastInsertRowid())!;
}

export function update(id: number, data: Partial<CreateEntryDto>): Entry | undefined {
  const existing = findById(id);
  if (!existing) return undefined;

  const merged = { ...existing, ...data };
  const now = new Date().toISOString();

  execute(
    `UPDATE entries SET
      date = ?, weight = ?, sleep_hours = ?, sleep_quality = ?, steps = ?,
      workout_type = ?, workout_duration = ?, cardio_done = ?,
      food_description = ?, carbs_amount = ?, water_liters = ?,
      meal_breakfast = ?, meal_lunch = ?, meal_dinner = ?, meal_other = ?,
      bloating = ?, energy = ?, hunger = ?,
      mood = ?, notes = ?, photo_path = ?, updated_at = ?
    WHERE id = ?`,
    [
      merged.date,
      merged.weight,
      merged.sleep_hours,
      merged.sleep_quality,
      merged.steps,
      merged.workout_type,
      merged.workout_duration,
      merged.cardio_done,
      merged.food_description,
      merged.carbs_amount,
      merged.water_liters,
      merged.meal_breakfast,
      merged.meal_lunch,
      merged.meal_dinner,
      merged.meal_other,
      merged.bloating,
      merged.energy,
      merged.hunger,
      merged.mood,
      merged.notes,
      merged.photo_path,
      now,
      id,
    ],
  );

  return findById(id);
}

export function remove(id: number): boolean {
  return execute('DELETE FROM entries WHERE id = ?', [id]) > 0;
}
