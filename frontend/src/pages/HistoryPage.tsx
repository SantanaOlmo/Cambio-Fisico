import { useState } from 'react';
import { Icon } from '../components/icons';
import { useEntries } from '../hooks/useEntries';
import { useToastContext } from '../contexts/ToastContext';
import { api } from '../api/client';
import { EntryTable } from '../components/entries/EntryTable';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { PageLoader } from '../components/ui/LoadingSpinner';

export function HistoryPage() {
  const { entries, loading, refetch } = useEntries();
  const { toast } = useToastContext();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = entries.filter((e) =>
    e.date.includes(search) ||
    (e.workout_type ?? '').toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async () => {
    if (deleteId == null) return;
    try {
      await api.delete(`/entries/${deleteId}`);
      toast.success('Entrada eliminada');
      refetch();
    } catch {
      toast.error('Error al eliminar la entrada');
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Historial</h1>
          <p className="text-slate-500 text-sm mt-1">{entries.length} entradas registradas</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          id="history-search"
          type="text"
          placeholder="Buscar por fecha o entreno…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-9"
        />
      </div>

      <div className="card">
        <EntryTable entries={filtered} onDelete={(id) => setDeleteId(id)} />
      </div>

      <ConfirmDialog
        isOpen={deleteId != null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Borrar entrada"
        message="¿Borrar esta entrada? Si tiene foto asociada, también se eliminará del disco."
        confirmLabel="Sí, borrar"
        isDestructive
      />
    </div>
  );
}
