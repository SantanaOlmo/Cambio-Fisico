import { useState } from 'react';
import { Icon } from '../components/icons';
import { useEntries } from '../hooks/useEntries';
import { api } from '../api/client';
import { formatDate, formatWeight } from '../utils/formatters';
import { PageLoader } from '../components/ui/LoadingSpinner';

export function GalleryPage() {
  const { entries, loading } = useEntries();
  const [selected, setSelected] = useState<string | null>(null);

  const withPhotos = entries.filter((e) => e.photo_path);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Galería de fotos</h1>
        <p className="text-slate-500 text-sm mt-1">
          {withPhotos.length} foto{withPhotos.length !== 1 ? 's' : ''} de progreso
        </p>
      </div>

      {withPhotos.length === 0 ? (
        <div className="card p-16 text-center">
          <Icon name="image" className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <h3 className="text-slate-400 font-semibold mb-2">Sin fotos todavía</h3>
          <p className="text-slate-500 text-sm">
            Añade una foto al crear o editar una entrada diaria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {withPhotos.map((entry) => (
            <button
              key={entry.id}
              id={`gallery-photo-${entry.id}`}
              onClick={() => setSelected(entry.photo_path!)}
              className="group relative card overflow-hidden aspect-square card-hover focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              aria-label={`Ver foto del ${formatDate(entry.date)}`}
            >
              <img
                src={api.photoUrl(entry.photo_path!)}
                alt={`Progreso ${entry.date}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-semibold">{formatDate(entry.date)}</p>
                  {entry.weight && (
                    <p className="text-emerald-300 text-xs">{formatWeight(entry.weight)}</p>
                  )}
                </div>
                <Icon name="zoom-in" className="absolute top-2 right-2 w-4 h-4 text-white/80" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>
          <img
            src={api.photoUrl(selected)}
            alt="Foto de progreso ampliada"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
