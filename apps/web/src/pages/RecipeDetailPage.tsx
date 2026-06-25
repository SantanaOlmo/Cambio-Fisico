import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../components/icons';
import { api } from '../api/client';
import { useToastContext } from '../contexts/ToastContext';
import { Recipe } from '../types/recipe';
import { MarkdownRenderer } from '../components/recipes/MarkdownRenderer';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { formatDate } from '../utils/formatters';

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToastContext();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      if (!id) return;
      try {
        setIsLoading(true);
        const data = await api.get<Recipe>(`/recipes/${id}`);
        setRecipe(data);
      } catch (err) {
        toast.error('Error al cargar la receta');
        navigate('/recetas');
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecipe();
  }, [id, navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-40">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!recipe) return null;

  const tags = recipe.tags
    ? recipe.tags.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/recetas"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 font-medium transition-colors"
        >
          <Icon name="arrow-left" className="w-3.5 h-3.5" />
          Volver al recetario
        </Link>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            to={`/recetas/${recipe.id}/editar`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-all"
          >
            <Icon name="pencil" className="w-3.5 h-3.5" />
            Editar
          </Link>
        </div>
      </div>

      {/* Header Info */}
      <div className="card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center">
            <Icon name="chef-hat" className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">{recipe.name}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-1.5">
              <div className="flex items-center gap-1">
                <Icon name="hash" className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700/50">
                  {recipe.slug}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Icon name="calendar" className="w-3.5 h-3.5" />
                <span>Creado el {formatDate(recipe.created_at.split('T')[0])}</span>
              </div>
            </div>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-slate-800/80 text-slate-400 border border-slate-700/60 px-2.5 py-1 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Recipe markdown content */}
      <div className="card p-6 md:p-8">
        <MarkdownRenderer content={recipe.content} />
      </div>
    </div>
  );
}
