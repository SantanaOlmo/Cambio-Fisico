import * as entryRepository from '../repositories/entryRepository';
import * as photoService from './photoService';
import { validateEntry } from '../validators/entryValidator';
import { createError } from '../middleware/errorHandler';
import { Entry, CreateEntryDto } from '../types/entry';

// Parses raw multipart/form-data body (all strings) into typed DTO fields
function parseEntryFields(raw: Record<string, unknown>): CreateEntryDto {
  const nullOrNum = (v: unknown): number | null => {
    if (v == null || v === '' || v === 'null') return null;
    const n = Number(v);
    return isNaN(n) ? null : n;
  };
  const nullOrStr = (v: unknown): string | null => {
    if (v == null || v === '' || v === 'null') return null;
    return String(v).trim() || null;
  };
  const parseBool = (v: unknown): number | null => {
    if (v == null || v === '' || v === 'null') return null;
    return v === 'true' || v === '1' || v === true || v === 1 ? 1 : 0;
  };

  return {
    date: String(raw.date ?? ''),
    weight: nullOrNum(raw.weight),
    sleep_hours: nullOrNum(raw.sleep_hours),
    sleep_quality: nullOrNum(raw.sleep_quality),
    steps: nullOrNum(raw.steps),
    workout_type: nullOrStr(raw.workout_type),
    workout_duration: nullOrNum(raw.workout_duration),
    cardio_done: parseBool(raw.cardio_done),
    food_description: nullOrStr(raw.food_description),
    carbs_amount: nullOrNum(raw.carbs_amount),
    water_liters: nullOrNum(raw.water_liters),
    meal_breakfast: nullOrStr(raw.meal_breakfast),
    meal_lunch: nullOrStr(raw.meal_lunch),
    meal_dinner: nullOrStr(raw.meal_dinner),
    meal_other: nullOrStr(raw.meal_other),
    bloating: nullOrNum(raw.bloating),
    energy: nullOrNum(raw.energy),
    hunger: nullOrNum(raw.hunger),
    mood: nullOrNum(raw.mood),
    notes: nullOrStr(raw.notes),
    photo_path: nullOrStr(raw.photo_path),
  };
}

export function getAllEntries(): Entry[] {
  return entryRepository.findAll();
}

export function getEntryById(id: number): Entry {
  const entry = entryRepository.findById(id);
  if (!entry) throw createError('Entrada no encontrada', 404);
  return entry;
}

export function createEntry(raw: Record<string, unknown>): Entry {
  const data = parseEntryFields(raw);

  const errors = validateEntry(data);
  if (errors.length > 0) {
    const err = createError('Datos de entrada inválidos', 400);
    err.errors = errors;
    throw err;
  }

  const existing = entryRepository.findByDate(data.date);
  if (existing) throw createError(`Ya existe una entrada para la fecha ${data.date}`, 409);

  return entryRepository.create(data);
}

export function updateEntry(
  id: number,
  raw: Record<string, unknown>,
  newPhotoFilename?: string,
): Entry {
  const existing = entryRepository.findById(id);
  if (!existing) throw createError('Entrada no encontrada', 404);

  const data = parseEntryFields({ ...existing, ...raw });

  if (newPhotoFilename) {
    // Delete old photo from disk if replacing
    if (existing.photo_path && existing.photo_path !== newPhotoFilename) {
      photoService.deletePhoto(existing.photo_path);
    }
    data.photo_path = newPhotoFilename;
  }

  const errors = validateEntry(data);
  if (errors.length > 0) {
    const err = createError('Datos de entrada inválidos', 400);
    err.errors = errors;
    throw err;
  }

  return entryRepository.update(id, data)!;
}

export function deleteEntry(id: number): void {
  const entry = entryRepository.findById(id);
  if (!entry) throw createError('Entrada no encontrada', 404);

  if (entry.photo_path) {
    photoService.deletePhoto(entry.photo_path);
  }

  entryRepository.remove(id);
}
