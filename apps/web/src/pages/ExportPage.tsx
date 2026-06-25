import React from 'react';
import { Icon } from '../components/icons';
import { api } from '../api/client';
import { useEntries } from '../hooks/useEntries';
import { useToastContext } from '../contexts/ToastContext';

interface ExportCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  color: string;
}

function ExportCard({ icon, title, description, actionLabel, onAction, color }: ExportCardProps) {
  return (
    <div className="card p-6 flex flex-col gap-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-slate-200 mb-1">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <button onClick={onAction} className="btn-primary flex items-center gap-2 justify-center">
        <Icon name="download" className="w-4 h-4" />
        {actionLabel}
      </button>
    </div>
  );
}

export function ExportPage() {
  const { entries } = useEntries();
  const { toast } = useToastContext();

  const triggerDownload = (format: 'csv' | 'json') => {
    if (entries.length === 0) {
      toast.warning('No hay entradas para exportar');
      return;
    }
    const url = api.exportUrl(format);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cambiofisico-export.${format}`;
    link.click();
    toast.success(`Exportando ${format.toUpperCase()}…`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="page-title">Exportar datos</h1>
        <p className="text-slate-500 text-sm mt-1">
          Descarga todas tus entradas en el formato que prefieras.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ExportCard
          icon={<Icon name="file-spreadsheet" className="w-6 h-6 text-emerald-400" />}
          title="Exportar CSV"
          description="Compatible con Excel, Google Sheets y cualquier hoja de cálculo. Incluye BOM para UTF-8."
          actionLabel="Descargar CSV"
          onAction={() => triggerDownload('csv')}
          color="bg-emerald-500/10 border border-emerald-500/20"
        />
        <ExportCard
          icon={<Icon name="file-json" className="w-6 h-6 text-blue-400" />}
          title="Exportar JSON"
          description="Formato estructurado con todos los campos. Útil para análisis o importar en otras herramientas."
          actionLabel="Descargar JSON"
          onAction={() => triggerDownload('json')}
          color="bg-blue-500/10 border border-blue-500/20"
        />
        <div className="card p-6 flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-amber-500/10 border border-amber-500/20">
            <Icon name="hard-drive" className="w-6 h-6 text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-200 mb-1">Backup manual</h3>
            <p className="text-sm text-slate-500">
              Copia la carpeta <code className="text-amber-400 bg-slate-800 px-1 py-0.5 rounded text-xs">/data/</code> del proyecto. Contiene la base de datos SQLite y todas las fotos.
            </p>
          </div>
          <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-3 text-xs text-slate-400 font-mono">
            CambioFisico/data/
            <br />
            ├── fitness.sqlite
            <br />
            └── photos/
          </div>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-semibold text-slate-300 mb-3">Resumen de datos</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-slate-100">{entries.length}</p>
            <p className="text-xs text-slate-500 mt-1">Entradas totales</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-100">
              {entries.filter((e) => e.photo_path).length}
            </p>
            <p className="text-xs text-slate-500 mt-1">Fotos de progreso</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-100">
              {entries.filter((e) => e.workout_type && e.workout_type !== 'Descanso').length}
            </p>
            <p className="text-xs text-slate-500 mt-1">Entrenamientos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
