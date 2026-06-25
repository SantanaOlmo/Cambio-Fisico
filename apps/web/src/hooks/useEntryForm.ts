import { useState, useCallback } from 'react';
import { EntryFormData } from '../types/entry';
import { validateEntry, FormErrors } from '../utils/validators';

const DEFAULT_FORM: EntryFormData = {
  date: new Date().toISOString().split('T')[0],
  weight: null,
  sleep_hours: null,
  sleep_quality: null,
  steps: null,
  workout_type: null,
  workout_duration: null,
  cardio_done: null,
  food_description: null,
  carbs_amount: null,
  water_liters: null,
  meal_breakfast: null,
  meal_lunch: null,
  meal_dinner: null,
  meal_other: null,
  bloating: null,
  energy: null,
  hunger: null,
  mood: null,
  notes: null,
  photo_path: null,
};

export function useEntryForm(initialData?: Partial<EntryFormData>) {
  const [formData, setFormData] = useState<EntryFormData>({
    ...DEFAULT_FORM,
    ...initialData,
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const setField = useCallback(
    <K extends keyof EntryFormData>(field: K, value: EntryFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [],
  );

  const resetForm = useCallback(() => {
    setFormData({ ...DEFAULT_FORM, ...initialData });
    setPhoto(null);
    setErrors({});
  }, [initialData]);

  const validate = useCallback((): boolean => {
    const newErrors = validateEntry(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const buildFormData = useCallback((): FormData => {
    const fd = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        fd.append(key, String(value));
      }
    });

    if (photo) {
      fd.append('photo', photo);
    }

    return fd;
  }, [formData, photo]);

  return {
    formData,
    setField,
    photo,
    setPhoto,
    errors,
    validate,
    buildFormData,
    resetForm,
  };
}
