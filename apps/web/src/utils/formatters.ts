export function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

export function formatDateLong(dateStr: string): string {
  if (!dateStr) return '—';
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatWeight(kg: number | null): string {
  if (kg == null) return '—';
  return `${kg.toFixed(1)} kg`;
}

export function formatWeightDiff(diff: number | null): string {
  if (diff == null) return '—';
  const sign = diff > 0 ? '+' : '';
  return `${sign}${diff.toFixed(1)} kg`;
}

export function formatSleep(hours: number | null): string {
  if (hours == null) return '—';
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function formatSteps(steps: number | null): string {
  if (steps == null) return '—';
  return steps.toLocaleString('es-ES');
}

export function formatDuration(minutes: number | null): string {
  if (minutes == null) return '—';
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

export function formatNumber(n: number | null, decimals = 1): string {
  if (n == null) return '—';
  return n.toFixed(decimals);
}

const BLOATING_LABELS = ['Sin hinchazón', 'Leve', 'Moderada', 'Notable', 'Muy hinchado'];
const ENERGY_LABELS = ['Sin energía', 'Poca', 'Normal', 'Buena', 'Excelente'];
const MOOD_LABELS = ['Muy mal', 'Mal', 'Normal', 'Bien', 'Excelente'];
const HUNGER_LABELS = ['Sin hambre', 'Poca', 'Normal', 'Bastante', 'Mucha'];
const SLEEP_QUALITY_LABELS = ['Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente'];

function ratingLabel(val: number | null, labels: string[]): string {
  if (val == null) return '—';
  return labels[val - 1] ?? '—';
}

export const labels = {
  bloating: (v: number | null) => ratingLabel(v, BLOATING_LABELS),
  energy: (v: number | null) => ratingLabel(v, ENERGY_LABELS),
  mood: (v: number | null) => ratingLabel(v, MOOD_LABELS),
  hunger: (v: number | null) => ratingLabel(v, HUNGER_LABELS),
  sleepQuality: (v: number | null) => ratingLabel(v, SLEEP_QUALITY_LABELS),
};
