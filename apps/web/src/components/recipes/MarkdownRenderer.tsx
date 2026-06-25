import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import { useRecipes } from '../../hooks/useRecipes';
import { recipeMatchesQuery } from '../../types/recipe';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div
      className={`
        prose prose-invert prose-sm max-w-none
        prose-headings:text-slate-100 prose-headings:font-semibold
        prose-p:text-slate-300 prose-p:leading-relaxed
        prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-slate-200
        prose-code:text-emerald-300 prose-code:bg-slate-900/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-slate-900/60 prose-pre:border prose-pre:border-slate-700
        prose-blockquote:border-emerald-500/40 prose-blockquote:text-slate-400
        prose-li:text-slate-300
        prose-hr:border-slate-700
        prose-th:text-slate-300 prose-td:text-slate-400
        ${className}
      `}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

/**
 * Renders meal text converting #recipe-slug into clickable links to recipe detail.
 */
interface MealTextProps {
  text: string | null;
}

export function MealText({ text }: MealTextProps) {
  const { recipes } = useRecipes();

  if (!text) return <span className="text-slate-600">—</span>;

  // Split by case-insensitive, Spanish-friendly #word tokens
  const parts = text.split(/(#[a-z0-9-ñáéíóúü]+)/gi);

  return (
    <span className="leading-relaxed">
      {parts.map((part, i) => {
        if (part.startsWith('#')) {
          const slug = part.slice(1);
          const recipe = recipes.find((r) => r.slug.toLowerCase() === slug.toLowerCase());
          const displayName = slug.replace(/-/g, ' ');
          if (recipe) {
            return (
              <Link
                key={i}
                to={`/recetas/${recipe.id}`}
                className="inline-flex items-center bg-slate-800/80 border border-slate-700/60 rounded px-1.5 py-0.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors mx-0.5"
                title={recipe.name}
              >
                {displayName}
              </Link>
            );
          }
          // Unknown hashtag — render as styled tag (identical shape, different color, no link)
          return (
            <span
              key={i}
              className="inline-flex items-center bg-slate-800/80 border border-slate-700/60 rounded px-1.5 py-0.5 text-xs font-medium text-slate-300 mx-0.5"
            >
              {displayName}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

