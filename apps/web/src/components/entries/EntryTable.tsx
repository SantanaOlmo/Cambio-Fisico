import { useNavigate } from 'react-router-dom';
import { Icon } from '../icons';
import { Entry } from '../../types/entry';
import { formatDate, formatWeight, formatSleep, formatDuration } from '../../utils/formatters';

interface EntryTableProps {
  entries: Entry[];
  onDelete: (id: number) => void;
}

interface EnergyDotsProps {
  value: number | null;
}

function EnergyDots({ value }: EnergyDotsProps) {
  if (value == null) return <span className="text-slate-600">—</span>;
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          className={`w-2 h-2 rounded-full transition-colors ${
            n <= value ? 'bg-emerald-400' : 'bg-slate-700'
          }`}
        />
      ))}
    </div>
  );
}

export function EntryTable({ entries, onDelete }: EntryTableProps) {
  const navigate = useNavigate();

  if (entries.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500">
        <p className="text-lg mb-2">Sin entradas todavía</p>
        <p className="text-sm">Crea tu primera entrada del día.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700/50">
            <th className="table-header">Fecha</th>
            <th className="table-header">Peso</th>
            <th className="table-header">Sueño</th>
            <th className="table-header">Entreno</th>
            <th className="table-header">Duración</th>
            <th className="table-header">Energía</th>
            <th className="table-header text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {entries.map((entry) => (
            <tr key={entry.id} className="hover:bg-slate-800/30 transition-colors group">
              <td className="table-cell font-medium text-slate-200">{formatDate(entry.date)}</td>
              <td className="table-cell">{formatWeight(entry.weight)}</td>
              <td className="table-cell">{formatSleep(entry.sleep_hours)}</td>
              <td className="table-cell">
                {entry.workout_type ? (
                  <span className="badge-emerald">{entry.workout_type}</span>
                ) : (
                  <span className="text-slate-600">—</span>
                )}
              </td>
              <td className="table-cell">{formatDuration(entry.workout_duration)}</td>
              <td className="table-cell">
                <EnergyDots value={entry.energy} />
              </td>
              <td className="table-cell text-right">
                <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    id={`view-entry-${entry.id}`}
                    onClick={() => navigate(`/entradas/${entry.id}`)}
                    className="btn-ghost p-1.5"
                    title="Ver detalle"
                    aria-label="Ver entrada"
                  >
                    <Icon name="eye" className="w-3.5 h-3.5" />
                  </button>
                  <button
                    id={`edit-entry-${entry.id}`}
                    onClick={() => navigate(`/entradas/${entry.id}/editar`)}
                    className="btn-ghost p-1.5"
                    title="Editar"
                    aria-label="Editar entrada"
                  >
                    <Icon name="pencil" className="w-3.5 h-3.5" />
                  </button>
                  <button
                    id={`delete-entry-${entry.id}`}
                    onClick={() => onDelete(entry.id)}
                    className="btn-ghost p-1.5 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                    title="Borrar"
                    aria-label="Borrar entrada"
                  >
                    <Icon name="trash-2" className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
