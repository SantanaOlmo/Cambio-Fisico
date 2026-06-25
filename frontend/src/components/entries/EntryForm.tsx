import { LoadingSpinner } from '../ui/LoadingSpinner';
import { EntryFormData } from '../../types/entry';
import { useEntryForm } from '../../hooks/useEntryForm';
import { BasicInfoSection } from './BasicInfoSection';
import { SleepSection } from './SleepSection';
import { ActivitySection } from './ActivitySection';
import { NutritionSection } from './NutritionSection';
import { WellbeingSection } from './WellbeingSection';
import { NotesPhotoSection } from './NotesPhotoSection';

interface EntryFormProps {
  initialData?: Partial<EntryFormData>;
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading: boolean;
  submitLabel?: string;
}

export function EntryForm({
  initialData,
  onSubmit,
  isLoading,
  submitLabel = 'Guardar entrada',
}: EntryFormProps) {
  const { formData, setField, photo, setPhoto, errors, validate, buildFormData } =
    useEntryForm(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(buildFormData());
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <BasicInfoSection formData={formData} setField={setField} errors={errors} />
      <SleepSection formData={formData} setField={setField} errors={errors} />
      <ActivitySection formData={formData} setField={setField} errors={errors} />
      <NutritionSection formData={formData} setField={setField} errors={errors} />
      <WellbeingSection formData={formData} setField={setField} errors={errors} />
      <NotesPhotoSection
        formData={formData}
        setField={setField}
        photo={photo}
        setPhoto={setPhoto}
      />

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          id="entry-form-submit"
          disabled={isLoading}
          className="btn-primary flex items-center gap-2 min-w-40 justify-center"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" />
              Guardando...
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}
