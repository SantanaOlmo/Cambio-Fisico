export interface Recipe {
  id: number;
  name: string;
  slug: string;
  content: string; // Markdown content
  tags: string;    // Comma-separated tags
  created_at: string;
  updated_at: string;
}

export type CreateRecipeDto = Pick<Recipe, 'name' | 'slug' | 'content' | 'tags'>;
export type UpdateRecipeDto = Partial<CreateRecipeDto>;

/** Converts a recipe name to a URL/hashtag-safe slug */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^a-z0-9]+/g, '-')     // non-alphanumeric → hyphen
    .replace(/^-+|-+$/g, '')          // trim leading/trailing hyphens
    .slice(0, 80);                    // max length
}
