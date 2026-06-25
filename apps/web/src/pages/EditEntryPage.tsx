import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../components/icons';
import { api, ApiError } from '../api/client';
import { useToastContext } from '../contexts/ToastContext';
import { Entry } from '../types/entry';
import { EntryForm } from '../components/entries/EntryForm';
import { PageLoader } from '../components/ui/LoadingSpinner';

export function EditEntryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToastContext();
  const [entry, setEntry] = useState<Entry | null>(null);
  const [loadingEntry, setLoadingEntry] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.get<Entry>(`/entries/${id}`);
        setEntry(data);
      } catch {
        toast.error('No se pudo cargar la entrada');
        navigate('/historial');
      } finally {
        setLoadingEntry(false);
      }
    };
    load();
  }, [id, navigate, toast]);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await api.putFormData(`/entries/${id}`, formData);
      toast.success('Entrada actualizada correctamente');
      navigate(`/entradas/${id}`);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'Error al actualizar la entrada');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingEntry) return <PageLoader />;
  if (!entry) return null;

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
          <h1 className="page-title">Editar entrada</h1>
          <p className="text-slate-500 text-sm">{entry.date}</p>
        </div>
      </div>

      <EntryForm
        initialData={entry}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        submitLabel="Actualizar entrada"
      />
    </div>
  );
}
