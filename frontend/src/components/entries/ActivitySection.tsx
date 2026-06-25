import { Icon } from '../icons';
import { EntryFormData, WORKOUT_TYPES } from '../../types/entry';
import { FormErrors } from '../../utils/validators';
import { FormSection } from './FormSection';
import { FormField } from '../ui/FormField';
import { ComboboxInput } from '../ui/ComboboxInput';

interface ActivitySectionProps {
  formData: EntryFormData;
  setField: <K extends keyof EntryFormData>(field: K, value: EntryFormData[K]) => void;
  errors: FormErrors;
}

export function ActivitySection({ formData, setField, errors }: ActivitySectionProps) {
  return (
    <FormSection title="Actividad física" icon={<Icon name="dumbbell" className="w-4 h-4" />}>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Tipo de entrenamiento" htmlFor="workout_type">
          <ComboboxInput
            id="workout_type"
            value={formData.workout_type}
            onChange={(val) => setField('workout_type', val)}
            baseOptions={WORKOUT_TYPES}
            storageKey="workout_types"
            placeholder="Selecciona o escribe..."
          />
        </FormField>

        <FormField
          label="Duración"
          htmlFor="workout_duration"
          error={errors.workout_duration}
          hint="Minutos"
        >
          <div className="relative">
            <input
              id="workout_duration"
              type="number"
              min="0"
              max="600"
              value={formData.workout_duration ?? ''}
              onChange={(e) =>
                setField('workout_duration', e.target.value ? parseInt(e.target.value) : null)
              }
              placeholder="60"
              className="input-field pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
              min
            </span>
          </div>
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <FormField label="Cardio realizado">
          <div className="flex gap-3 pt-1">
            {[
              { label: 'Sí', value: 1 },
              { label: 'No', value: 0 },
            ].map(({ label, value }) => (
              <button
                key={value}
                type="button"
                onClick={() => setField('cardio_done', value)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 border ${
                  formData.cardio_done === value
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-slate-700/50 border-slate-600/40 text-slate-400 hover:text-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </FormField>
      </div>
    </FormSection>
  );
}
