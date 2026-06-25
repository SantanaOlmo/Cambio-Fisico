import { Link } from 'react-router-dom';
import { Icon } from '../icons';
import { Recipe } from '../../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const tags = recipe.tags
    ? recipe.tags.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  // Show first ~200 chars of content as preview
  const preview = recipe.content
    .replace(/#{1,6}\s+/g, '') // remove headers
    .replace(/[*_`]/g, '')     // remove markdown marks
    .slice(0, 160)
    .trim();

  return (
    <div className="card card-hover p-5 flex flex-col gap-3 group">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold text-slate-100 text-lg truncate flex-1">{recipe.name}</h3>

        <Link
          to={`/recetas/${recipe.id}/editar`}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-700 transition-all"
          aria-label="Editar receta"
          onClick={(e) => e.stopPropagation()}
        >
          <Icon name="pencil" className="w-3.5 h-3.5" />
        </Link>
      </div>

      {preview && (
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{preview}</p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-slate-700/60 text-slate-400 border border-slate-600/40 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-end mt-auto pt-2 border-t border-slate-700/40">
        <Link
          to={`/recetas/${recipe.id}`}
          className="text-xs text-emerald-500 hover:text-emerald-400 font-medium transition-colors"
        >
          Ver receta →
        </Link>
      </div>
    </div>
  );
}
