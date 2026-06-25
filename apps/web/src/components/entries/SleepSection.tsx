import { Icon } from '../icons';
import { EntryFormData } from '../../types/entry';
import { FormErrors } from '../../utils/validators';
import { FormSection } from './FormSection';
import { FormField } from '../ui/FormField';
import { RatingInput } from '../ui/RatingInput';

const SLEEP_QUALITY_LABELS = ['Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente'] as const;

interface SleepSectionProps {
  formData: EntryFormData;
  setField: <K extends keyof EntryFormData>(field: K, value: EntryFormData[K]) => void;
  errors: FormErrors;
}

export function SleepSection({ formData, setField, errors }: SleepSectionProps) {
  return (
    <FormSection title="Sueño" icon={<Icon name="moon" className="w-4 h-4" />}>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Horas de sueño" htmlFor="sleep_hours" error={errors.sleep_hours}>
          <div className="relative">
            <input
              id="sleep_hours"
              type="number"
              step="0.5"
              min="0"
              max="24"
              value={formData.sleep_hours ?? ''}
              onChange={(e) =>
                setField('sleep_hours', e.target.value ? parseFloat(e.target.value) : null)
              }
              placeholder="7.5"
              className="input-field pr-8"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
              h
            </span>
          </div>
        </FormField>
      </div>

      <FormField label="Calidad del sueño" error={errors.sleep_quality}>
        <RatingInput
          id="sleep_quality"
          value={formData.sleep_quality}
          onChange={(v) => setField('sleep_quality', v)}
          labels={SLEEP_QUALITY_LABELS}
        />
      </FormField>
    </FormSection>
  );
}
