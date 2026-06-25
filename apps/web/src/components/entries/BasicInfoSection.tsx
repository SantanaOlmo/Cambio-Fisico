import { Icon } from '../icons';
import { EntryFormData } from '../../types/entry';
import { FormErrors } from '../../utils/validators';
import { FormSection } from './FormSection';
import { FormField } from '../ui/FormField';

interface BasicInfoSectionProps {
  formData: EntryFormData;
  setField: <K extends keyof EntryFormData>(field: K, value: EntryFormData[K]) => void;
  errors: FormErrors;
}

export function BasicInfoSection({ formData, setField, errors }: BasicInfoSectionProps) {
  return (
    <FormSection title="Información básica" icon={<Icon name="calendar" className="w-4 h-4" />}>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Fecha" htmlFor="date" error={errors.date} required>
          <input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setField('date', e.target.value)}
            className="input-field"
            max={new Date().toISOString().split('T')[0]}
          />
        </FormField>

        <FormField
          label="Peso"
          htmlFor="weight"
          error={errors.weight}
          hint="Kilogramos"
        >
          <div className="relative">
            <input
              id="weight"
              type="number"
              step="0.1"
              min="20"
              max="350"
              value={formData.weight ?? ''}
              onChange={(e) =>
                setField('weight', e.target.value ? parseFloat(e.target.value) : null)
              }
              placeholder="76.5"
              className="input-field pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
              kg
            </span>
          </div>
        </FormField>
      </div>
    </FormSection>
  );
}
