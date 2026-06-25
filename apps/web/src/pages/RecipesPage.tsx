import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/icons';
import { useRecipes } from '../hooks/useRecipes';
import { RecipeCard } from '../components/recipes/RecipeCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export function RecipesPage() {
  const { recipes, loading, error } = useRecipes();
  const [search, setSearch] = useState('');

  const filtered = recipes.filter((recipe) => {
    const term = search.toLowerCase();
    return (
      recipe.name.toLowerCase().includes(term) ||
      recipe.slug.toLowerCase().includes(term) ||
      recipe.tags.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
            <Icon name="chef-hat" className="w-5 h-5" />
            <span>Recetario</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Recetas</h1>
          <p className="text-sm text-slate-400">
            Administra tus comidas saludables y vincúlalas a tus entradas usando hashtags.
          </p>
        </div>

        <Link
          to="/recetas/nueva"
          className="btn-primary flex items-center gap-2 justify-center py-3 px-5"
        >
          <Icon name="plus" className="w-4 h-4" />
          Añadir Receta
        </Link>
      </div>

      {/* Search and empty state container */}
      <div className="flex flex-col gap-5">
        <div className="relative">
          <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar recetas por nombre, tag o slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-11 py-3"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className="text-center py-12 card border-red-500/20 bg-red-500/5">
            <p className="text-red-400 font-medium mb-2">Error al cargar las recetas</p>
            <p className="text-sm text-slate-500">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 card bg-slate-800/20 border-slate-700/40">
            <Icon name="chef-hat" className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-semibold">No se encontraron recetas</p>
            <p className="text-sm text-slate-500 mt-1">
              {recipes.length === 0
                ? 'Empieza por crear tu primera receta saludable.'
                : 'Intenta buscar con otros términos.'}
            </p>
            {recipes.length === 0 && (
              <Link
                to="/recetas/nueva"
                className="btn-primary inline-flex items-center gap-2 mt-4 py-2 px-4 text-sm"
              >
                <Icon name="plus" className="w-4 h-4" />
                Crear receta
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
