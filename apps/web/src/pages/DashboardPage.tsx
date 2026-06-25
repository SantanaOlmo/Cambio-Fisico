import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../components/icons';
import { useEntries } from '../hooks/useEntries';
import { useRecipes } from '../hooks/useRecipes';
import { useToastContext } from '../contexts/ToastContext';
import { api } from '../api/client';
import { computeStats } from '../utils/statsComputer';
import { formatWeight, formatWeightDiff, formatSleep, labels } from '../utils/formatters';
import { GOAL_DAYS } from '../types/entry';
import { StatsCard } from '../components/dashboard/StatsCard';
import { MetricChart } from '../components/dashboard/MetricChart';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { PageLoader } from '../components/ui/LoadingSpinner';

export function DashboardPage() {
  const { entries, loading, refetch } = useEntries();
  const { toast } = useToastContext();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { recipes } = useRecipes();
  const stats = computeStats(entries);

  const hashtagRanking = useMemo(() => {
    const counts: Record<string, number> = {};
    const regex = /(#[a-z0-9-ñáéíóúü]+)/gi;

    entries.forEach((entry) => {
      ['meal_breakfast', 'meal_lunch', 'meal_dinner', 'meal_other'].forEach((key) => {
        const val = entry[key as keyof typeof entry];
        if (typeof val === 'string') {
          regex.lastIndex = 0;
          let match;
          while ((match = regex.exec(val)) !== null) {
            const slug = match[0].slice(1).toLowerCase();
            if (slug) {
              counts[slug] = (counts[slug] || 0) + 1;
            }
          }
        }
      });
    });

    // Map to array and sort
    return Object.entries(counts)
      .map(([slug, count]) => {
        const recipe = recipes.find((r) => r.slug.toLowerCase() === slug.toLowerCase());
        return {
          slug,
          count,
          displayName: slug.replace(/-/g, ' '),
          recipeId: recipe?.id,
          isRecipe: !!recipe,
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // top 5
  }, [entries, recipes]);

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
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            Recomposición corporal · {GOAL_DAYS} días
          </p>
        </div>
        <button
          id="new-entry-btn"
          onClick={() => navigate('/nueva-entrada')}
          className="btn-primary flex items-center gap-2"
        >
          <Icon name="zap" className="w-4 h-4" />
          Nueva entrada
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Peso inicial"
          value={formatWeight(stats.initialWeight)}
          icon={<Icon name="scale" className="w-4 h-4" />}
          color="blue"
          subtitle="Tu punto de partida"
        />
        <StatsCard
          label="Peso actual"
          value={stats.currentWeight != null ? formatWeight(stats.currentWeight) : '—'}
          icon={<Icon name="scale" className="w-4 h-4" />}
          color="emerald"
          trend={
            stats.weightDiff != null
              ? { value: stats.weightDiff, positiveIsGood: false }
              : undefined
          }
          subtitle={
            stats.weightDiff != null
              ? `${formatWeightDiff(stats.weightDiff)} desde el inicio`
              : undefined
          }
        />
        <StatsCard
          label="Días registrados"
          value={stats.daysRegistered}
          unit={`/ ${GOAL_DAYS}`}
          icon={<Icon name="calendar" className="w-4 h-4" />}
          color="blue"
          subtitle={`${Math.round((stats.daysRegistered / GOAL_DAYS) * 100)}% del reto`}
        />
        <StatsCard
          label="Racha actual"
          value={stats.currentStreak}
          unit="días"
          icon={<Icon name="flame" className="w-4 h-4" />}
          color="orange"
          subtitle="Días consecutivos"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          label="Entrenamientos"
          value={stats.workoutsCompleted}
          icon={<Icon name="dumbbell" className="w-4 h-4" />}
          color="purple"
          subtitle="No descanso"
        />
        <StatsCard
          label="Media de sueño"
          value={stats.avgSleep != null ? formatSleep(stats.avgSleep) : '—'}
          icon={<Icon name="moon" className="w-4 h-4" />}
          color="blue"
          subtitle="Horas por noche"
        />
        <StatsCard
          label="Hinchazón (última)"
          value={stats.lastBloating != null ? labels.bloating(stats.lastBloating) : '—'}
          icon={<Icon name="droplets" className="w-4 h-4" />}
          color={
            stats.lastBloating == null
              ? 'blue'
              : stats.lastBloating <= 2
                ? 'emerald'
                : stats.lastBloating <= 3
                  ? 'amber'
                  : 'rose'
          }
          subtitle="Estado digestivo"
        />
      </div>

      {/* Nutrición y Recetas (Ranking de Hashtags) */}
      {entries.length > 0 && hashtagRanking.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-slate-300">Frecuencia de Comidas</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Icon name="utensils" className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200">Platos más repetidos</h3>
                    <p className="text-slate-500 text-xs mt-0.5">Ranking de tus comidas según frecuencia de hashtags</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-slate-400">
                  Top {hashtagRanking.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {hashtagRanking.map((item, idx) => {
                  const maxCount = hashtagRanking[0].count;
                  const percentage = Math.round((item.count / maxCount) * 100);

                  return (
                    <div 
                      key={item.slug} 
                      className="relative flex items-center justify-between p-3 bg-slate-900/40 border border-slate-800/60 rounded-xl overflow-hidden group"
                    >
                      {/* Subtle Background Progress Bar */}
                      <div 
                        style={{ width: `${percentage}%` }}
                        className="absolute inset-y-0 left-0 bg-slate-800/35 transition-all duration-500"
                      />

                      {/* Content */}
                      <div className="relative flex items-center gap-3 min-w-0">
                        <span className="text-sm font-bold text-slate-500 w-4 select-none">
                          {idx + 1}
                        </span>
                        {item.isRecipe ? (
                          <Link
                            to={`/recetas/${item.recipeId}`}
                            className="inline-flex items-center bg-slate-800/90 border border-slate-700/80 rounded px-2.5 py-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors truncate"
                          >
                            {item.displayName}
                          </Link>
                        ) : (
                          <span className="inline-flex items-center bg-slate-800/90 border border-slate-700/80 rounded px-2.5 py-1 text-xs font-semibold text-slate-300 truncate">
                            {item.displayName}
                          </span>
                        )}
                      </div>

                      <div className="relative text-xs font-semibold text-slate-400 flex items-center gap-1 flex-shrink-0">
                        <span>{item.count}</span>
                        <span className="text-slate-600 font-normal">{item.count === 1 ? 'vez' : 'veces'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Motivational Nutrition Advice Card */}
            <div className="card p-6 flex flex-col justify-between bg-emerald-500/[0.01] border-emerald-500/10">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Icon name="flame" className="w-5 h-5 animate-pulse" />
                </div>
                <h3 className="text-sm font-semibold text-slate-200">Consistencia Nutricional</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Repetir comidas saludables y tus recetas guardadas te ayuda a mantener el déficit calórico o superávit de forma automática y controlada, disminuyendo la toma de decisiones diaria.
                </p>
              </div>
              <p className="text-[10px] text-emerald-400/70 font-bold tracking-wider uppercase mt-4">
                Consejo de Recomposición
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Charts */}
      {entries.length > 0 && (
        <>
          <h2 className="text-base font-semibold text-slate-300">Evolución</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricChart entries={entries} metric="weight" label="Peso (kg)" unit=" kg" type="area" color="#10b981" />
            <MetricChart entries={entries} metric="sleep_hours" label="Sueño (h)" unit="h" type="area" color="#3b82f6" />
            <MetricChart entries={entries} metric="energy" label="Energía (1-5)" color="#a855f7" />
            <MetricChart entries={entries} metric="mood" label="Ánimo (1-5)" color="#f59e0b" />
            <MetricChart entries={entries} metric="bloating" label="Hinchazón (1-5)" color="#ef4444" />
          </div>
        </>
      )}

      {entries.length === 0 && (
        <div className="card p-12 text-center">
          <Icon name="dumbbell" className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <h3 className="text-slate-400 font-semibold mb-2">¡Comienza tu seguimiento!</h3>
          <p className="text-slate-500 text-sm mb-6">
            Registra tu primera entrada para empezar a ver estadísticas y gráficas.
          </p>
          <button onClick={() => navigate('/nueva-entrada')} className="btn-primary">
            Crear primera entrada
          </button>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteId != null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Borrar entrada"
        message="¿Seguro que quieres borrar esta entrada? Esta acción también borrará la foto de progreso si la hay."
        confirmLabel="Sí, borrar"
        isDestructive
      />
    </div>
  );
}
