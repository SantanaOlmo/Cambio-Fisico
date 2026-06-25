import * as entryRepository from '../repositories/entryRepository';
import { Entry } from '../types/entry';

function entryToCsvRow(entry: Entry): string {
  const escape = (v: string | null) => `"${(v ?? '').replace(/"/g, '""')}"`;

  return [
    entry.id,
    entry.date,
    entry.weight ?? '',
    entry.sleep_hours ?? '',
    entry.sleep_quality ?? '',
    entry.steps ?? '',
    entry.workout_type ?? '',
    entry.workout_duration ?? '',
    entry.cardio_done ?? '',
    escape(entry.food_description),
    entry.carbs_amount ?? '',
    entry.water_liters ?? '',
    entry.bloating ?? '',
    entry.energy ?? '',
    entry.hunger ?? '',
    entry.mood ?? '',
    escape(entry.notes),
    entry.photo_path ?? '',
    entry.created_at,
    entry.updated_at,
  ].join(',');
}

const CSV_HEADERS =
  'id,date,weight,sleep_hours,sleep_quality,steps,workout_type,workout_duration,' +
  'cardio_done,food_description,carbs_amount,water_liters,bloating,energy,hunger,' +
  'mood,notes,photo_path,created_at,updated_at';

export function exportToCsv(): string {
  const entries = entryRepository.findAll();
  const rows = entries.map(entryToCsvRow);
  // BOM prefix for Excel compatibility with UTF-8
  return '\uFEFF' + [CSV_HEADERS, ...rows].join('\r\n');
}

export function exportToJson(): Record<string, unknown> {
  const entries = entryRepository.findAll();
  return {
    exportedAt: new Date().toISOString(),
    totalEntries: entries.length,
    entries,
  };
}
