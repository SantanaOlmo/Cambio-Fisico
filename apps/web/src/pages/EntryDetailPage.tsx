import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../components/icons';
import { api } from '../api/client';
import { useToastContext } from '../contexts/ToastContext';
import { Entry } from '../types/entry';
import {
  formatDateLong,
  formatWeight,
  formatSleep,
  formatSteps,
  formatDuration,
  labels,
} from '../utils/formatters';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { PageLoader } from '../components/ui/LoadingSpinner';

import { MealText } from '../components/recipes/MarkdownRenderer';

interface DetailRowProps { label: string; value: string | null }
function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-slate-800/60 last:border-0">
      <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</span>
      <span className="text-sm text-slate-200 text-right max-w-xs">{value ?? '—'}</span>
    </div>
  );
}

interface RatingRowProps { label: string; value: number | null; labelFn: (v: number | null) => string }
function RatingRow({ label, value, labelFn }: RatingRowProps) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-800/60 last:border-0">
      <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</span>
      <div className="flex items-center gap-2">
        {value != null && (
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(n => (
              <div key={n} className={`w-2 h-2 rounded-full ${n <= value ? 'bg-emerald-400' : 'bg-slate-700'}`} />
            ))}
          </div>
        )}
        <span className="text-sm text-slate-200">{labelFn(value)}</span>
      </div>
    </div>
  );
}

export function EntryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToastContext();
  const [entry, setEntry] = useState<Entry | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    api.get<Entry>(`/entries/${id}`)
      .then(setEntry)
      .catch(() => { toast.error('Entrada no encontrada'); navigate('/historial'); })
      .finally(() => setLoading(false));
  }, [id, navigate, toast]);

  const handleDelete = async () => {
    try {
      await api.delete(`/entries/${id}`);
      toast.success('Entrada eliminada');
      navigate('/historial');
    } catch {
      toast.error('Error al eliminar');
    }
  };

  if (loading) return <PageLoader />;
  if (!entry) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="btn-ghost flex items-center gap-1.5">
          <Icon name="arrow-left" className="w-4 h-4" /> Volver
        </button>
        <div className="flex gap-2">
          <Link to={`/entradas/${id}/editar`} className="btn-secondary flex items-center gap-1.5 text-sm py-2">
            <Icon name="pencil" className="w-3.5 h-3.5" /> Editar
          </Link>
          <button onClick={() => setConfirmDelete(true)} className="btn-danger flex items-center gap-1.5 text-sm py-2">
            <Icon name="trash-2" className="w-3.5 h-3.5" /> Borrar
          </button>
        </div>
      </div>

      <div>
        <h1 className="page-title">{formatDateLong(entry.date)}</h1>
      </div>

      {entry.photo_path && (
        <div className="card overflow-hidden">
          <img
            src={api.photoUrl(entry.photo_path)}
            alt={`Foto de progreso ${entry.date}`}
            className="w-full max-h-80 object-cover"
          />
        </div>
      )}

      <div className="card p-5 space-y-0">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Básicos</p>
        <DetailRow label="Peso" value={formatWeight(entry.weight)} />
      </div>

      <div className="card p-5 space-y-0">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Sueño</p>
        <DetailRow label="Horas" value={formatSleep(entry.sleep_hours)} />
        <RatingRow label="Calidad" value={entry.sleep_quality} labelFn={labels.sleepQuality} />
      </div>

      <div className="card p-5 space-y-0">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Actividad</p>
        <DetailRow label="Tipo" value={entry.workout_type} />
        <DetailRow label="Duración" value={formatDuration(entry.workout_duration)} />
        <DetailRow label="Cardio" value={entry.cardio_done === 1 ? 'Sí' : entry.cardio_done === 0 ? 'No' : null} />
      </div>

      <div className="card p-5 space-y-0">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Nutrición</p>
        <div className="flex flex-col gap-1 py-1">
          <div className="flex justify-between py-2 border-b border-slate-800/60 last:border-0">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Desayuno</span>
            <span className="text-sm text-slate-200 text-right max-w-xs"><MealText text={entry.meal_breakfast} /></span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-800/60 last:border-0">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Almuerzo</span>
            <span className="text-sm text-slate-200 text-right max-w-xs"><MealText text={entry.meal_lunch} /></span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-800/60 last:border-0">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Cena</span>
            <span className="text-sm text-slate-200 text-right max-w-xs"><MealText text={entry.meal_dinner} /></span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-800/60 last:border-0">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Otro / Snacks</span>
            <span className="text-sm text-slate-200 text-right max-w-xs"><MealText text={entry.meal_other} /></span>
          </div>
        </div>
      </div>

      <div className="card p-5 space-y-0">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Bienestar</p>
        <RatingRow label="Hinchazón" value={entry.bloating} labelFn={labels.bloating} />
        <RatingRow label="Energía" value={entry.energy} labelFn={labels.energy} />
        <RatingRow label="Hambre" value={entry.hunger} labelFn={labels.hunger} />
        <RatingRow label="Ánimo" value={entry.mood} labelFn={labels.mood} />
      </div>

      {entry.notes && (
        <div className="card p-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Notas</p>
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{entry.notes}</p>
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
        title="Borrar entrada"
        message="¿Borrar esta entrada permanentemente? Si tiene foto, también se eliminará del disco."
        confirmLabel="Sí, borrar"
        isDestructive
      />
    </div>
  );
}
