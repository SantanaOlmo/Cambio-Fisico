import { EntryFormData } from '../types/entry';

export type FormErrors = Record<string, string>;

const RATING_FIELDS: Array<keyof EntryFormData> = [
  'sleep_quality',
  'bloating',
  'energy',
  'hunger',
  'mood',
];

export function validateEntry(data: Partial<EntryFormData>): FormErrors {
  const errors: FormErrors = {};

  if (!data.date) {
    errors.date = 'La fecha es obligatoria';
  }

  if (data.weight != null && (data.weight < 20 || data.weight > 350)) {
    errors.weight = 'Peso inválido (20–350 kg)';
  }

  if (data.sleep_hours != null && (data.sleep_hours < 0 || data.sleep_hours > 24)) {
    errors.sleep_hours = 'Horas de sueño inválidas (0–24)';
  }

  for (const field of RATING_FIELDS) {
    const val = data[field] as number | null | undefined;
    if (val != null && (val < 1 || val > 5)) {
      errors[field] = 'Debe estar entre 1 y 5';
    }
  }

  if (data.steps != null && data.steps < 0) {
    errors.steps = 'Los pasos no pueden ser negativos';
  }

  if (data.water_liters != null && data.water_liters < 0) {
    errors.water_liters = 'El agua no puede ser negativa';
  }

  return errors;
}
