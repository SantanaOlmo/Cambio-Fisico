import { CreateEntryDto } from '../types/entry';

export interface ValidationError {
  field: string;
  message: string;
}

const RATING_FIELDS: Array<keyof CreateEntryDto> = [
  'sleep_quality',
  'bloating',
  'energy',
  'hunger',
  'mood',
];

export function validateEntry(data: Partial<CreateEntryDto>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.date) {
    errors.push({ field: 'date', message: 'La fecha es obligatoria' });
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    errors.push({ field: 'date', message: 'Formato de fecha inválido (YYYY-MM-DD)' });
  }

  if (data.weight != null && (data.weight < 20 || data.weight > 350)) {
    errors.push({ field: 'weight', message: 'Peso inválido (20–350 kg)' });
  }

  if (data.sleep_hours != null && (data.sleep_hours < 0 || data.sleep_hours > 24)) {
    errors.push({ field: 'sleep_hours', message: 'Horas de sueño inválidas (0–24)' });
  }

  for (const field of RATING_FIELDS) {
    const val = data[field] as number | null | undefined;
    if (val != null && (val < 1 || val > 5)) {
      errors.push({ field, message: `${field} debe estar entre 1 y 5` });
    }
  }

  if (data.steps != null && data.steps < 0) {
    errors.push({ field: 'steps', message: 'Los pasos no pueden ser negativos' });
  }

  if (data.water_liters != null && data.water_liters < 0) {
    errors.push({ field: 'water_liters', message: 'El agua no puede ser negativa' });
  }

  return errors;
}
