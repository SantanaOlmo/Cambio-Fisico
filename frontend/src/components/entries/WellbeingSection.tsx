import { Icon } from '../icons';
import { EntryFormData } from '../../types/entry';
import { FormErrors } from '../../utils/validators';
import { FormSection } from './FormSection';
import { FormField } from '../ui/FormField';
import { RatingInput } from '../ui/RatingInput';

const BLOATING_LABELS = ['Nada', 'Leve', 'Moderada', 'Notable', 'Mucha'] as const;
const ENERGY_LABELS   = ['Sin energía', 'Poca', 'Normal', 'Buena', 'Excelente'] as const;
const HUNGER_LABELS   = ['Sin hambre', 'Poca', 'Normal', 'Bastante', 'Mucha'] as const;
const MOOD_LABELS     = ['Muy mal', 'Mal', 'Normal', 'Bien', 'Excelente'] as const;

interface WellbeingSectionProps {
  formData: EntryFormData;
  setField: <K extends keyof EntryFormData>(field: K, value: EntryFormData[K]) => void;
  errors: FormErrors;
}

export function WellbeingSection({ formData, setField, errors }: WellbeingSectionProps) {
  return (
    <FormSection title="Bienestar" icon={<Icon name="heart" className="w-4 h-4" />}>
      <FormField label="Hinchazón abdominal" error={errors.bloating}>
        <RatingInput
          id="bloating"
          value={formData.bloating}
          onChange={(v) => setField('bloating', v)}
          labels={BLOATING_LABELS}
        />
      </FormField>

      <FormField label="Energía del día" error={errors.energy}>
        <RatingInput
          id="energy"
          value={formData.energy}
          onChange={(v) => setField('energy', v)}
          labels={ENERGY_LABELS}
        />
      </FormField>

      <FormField label="Hambre" error={errors.hunger}>
        <RatingInput
          id="hunger"
          value={formData.hunger}
          onChange={(v) => setField('hunger', v)}
          labels={HUNGER_LABELS}
        />
      </FormField>

      <FormField label="Estado de ánimo" error={errors.mood}>
        <RatingInput
          id="mood"
          value={formData.mood}
          onChange={(v) => setField('mood', v)}
          labels={MOOD_LABELS}
        />
      </FormField>
    </FormSection>
  );
}
