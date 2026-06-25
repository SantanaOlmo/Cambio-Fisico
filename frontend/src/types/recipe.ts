export interface Recipe {
  id: number;
  name: string;
  slug: string;
  content: string;
  tags: string;
  created_at: string;
  updated_at: string;
}

export type RecipeFormData = Pick<Recipe, 'name' | 'slug' | 'content' | 'tags'>;

/** Converts a recipe name to a hashtag-safe slug (mirrors backend logic) */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/**
 * Returns true if a recipe matches a hashtag search query.
 * Matching strategy:
 *   - "name" contains query (case-insensitive)
 *   - "slug" contains query
 *   - "slug without hyphens" contains query (allows "#arrozc" → "arroz-con-curry")
 *   - "tags" contains query
 */
export function recipeMatchesQuery(recipe: Recipe, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  const slugFlat = recipe.slug.replace(/-/g, '');
  return (
    recipe.name.toLowerCase().includes(q) ||
    recipe.slug.includes(q) ||
    slugFlat.includes(q) ||
    recipe.tags.toLowerCase().includes(q)
  );
}
