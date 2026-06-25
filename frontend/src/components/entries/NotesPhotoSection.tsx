import React, { useRef } from 'react';
import { Icon } from '../icons';
import { EntryFormData } from '../../types/entry';
import { FormSection } from './FormSection';
import { FormField } from '../ui/FormField';
import { api } from '../../api/client';

interface NotesPhotoSectionProps {
  formData: EntryFormData;
  setField: <K extends keyof EntryFormData>(field: K, value: EntryFormData[K]) => void;
  photo: File | null;
  setPhoto: (file: File | null) => void;
}

export function NotesPhotoSection({
  formData,
  setField,
  photo,
  setPhoto,
}: NotesPhotoSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previewUrl = photo
    ? URL.createObjectURL(photo)
    : formData.photo_path
      ? api.photoUrl(formData.photo_path)
      : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setPhoto(file);
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setField('photo_path', null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <FormSection title="Notas y foto" icon={<Icon name="file-text" className="w-4 h-4" />}>
      <FormField label="Notas libres" htmlFor="notes">
        <textarea
          id="notes"
          value={formData.notes ?? ''}
          onChange={(e) => setField('notes', e.target.value || null)}
          placeholder="Cómo me he sentido hoy, qué ha ido bien, qué mejorar..."
          rows={3}
          className="input-field resize-none"
        />
      </FormField>

      <FormField label="Foto de progreso">
        <div className="space-y-3">
          {previewUrl ? (
            <div className="relative inline-block">
              <img
                src={previewUrl}
                alt="Vista previa"
                className="w-32 h-32 object-cover rounded-xl border border-slate-700"
              />
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-400 text-white rounded-full flex items-center justify-center transition-colors shadow-md"
                aria-label="Eliminar foto"
              >
                <Icon name="x" className="w-3 h-3" />
              </button>
            </div>
          ) : null}

          <div>
            <input
              ref={fileInputRef}
              id="photo-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="photo-upload"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700/60 hover:bg-slate-700 border border-slate-600/50 rounded-xl text-sm text-slate-300 cursor-pointer transition-colors"
            >
              <Icon name="camera" className="w-4 h-4" />
              {previewUrl ? 'Cambiar foto' : 'Añadir foto'}
            </label>
            <p className="mt-1.5 text-xs text-slate-500">JPEG, PNG o WebP · máx. 10 MB</p>
          </div>
        </div>
      </FormField>
    </FormSection>
  );
}
