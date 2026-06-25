import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/icons';
import { api, ApiError } from '../api/client';
import { useToastContext } from '../contexts/ToastContext';
import { EntryForm } from '../components/entries/EntryForm';

export function NewEntryPage() {
  const navigate = useNavigate();
  const { toast } = useToastContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await api.postFormData('/entries', formData);
      toast.success('Entrada creada correctamente');
      navigate('/historial');
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        toast.error('Ya existe una entrada para esa fecha');
      } else {
        toast.error(err instanceof ApiError ? err.message : 'Error al guardar la entrada');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="btn-ghost flex items-center gap-1.5"
          aria-label="Volver"
        >
          <Icon name="arrow-left" className="w-4 h-4" />
          Volver
        </button>
        <div>
          <h1 className="page-title">Nueva entrada</h1>
          <p className="text-slate-500 text-sm">
            {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      <EntryForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Guardar entrada"
      />
    </div>
  );
}
