import * as recipeRepository from '../repositories/recipeRepository';
import { createError } from '../middleware/errorHandler';
import { Recipe, CreateRecipeDto, generateSlug } from '../types/recipe';

function parseRecipeFields(raw: Record<string, unknown>): CreateRecipeDto {
  const name = String(raw.name ?? '').trim();
  const content = String(raw.content ?? '');
  const tags = String(raw.tags ?? '').trim();

  const slug = raw.slug ? String(raw.slug).trim() : generateSlug(name);

  return { name, slug, content, tags };
}

export function getAllRecipes(): Recipe[] {
  return recipeRepository.findAll();
}

export function getRecipeById(id: number): Recipe {
  const recipe = recipeRepository.findById(id);
  if (!recipe) throw createError('Receta no encontrada', 404);
  return recipe;
}

export function searchRecipes(query: string): Recipe[] {
  if (!query.trim()) return recipeRepository.findAll();
  return recipeRepository.search(query);
}

export function createRecipe(raw: Record<string, unknown>): Recipe {
  const data = parseRecipeFields(raw);

  if (!data.name) {
    const err = createError('El nombre de la receta es obligatorio', 400);
    throw err;
  }

  const existing = recipeRepository.findBySlug(data.slug);
  if (existing) {
    // Auto-suffix the slug to avoid collision
    data.slug = `${data.slug}-${Date.now()}`;
  }

  return recipeRepository.create(data);
}

export function updateRecipe(
  id: number,
  raw: Record<string, unknown>,
): Recipe {
  const recipe = recipeRepository.findById(id);
  if (!recipe) throw createError('Receta no encontrada', 404);

  const data = parseRecipeFields({ ...recipe, ...raw });

  // Check slug collision only if slug changed
  if (data.slug !== recipe.slug) {
    const conflict = recipeRepository.findBySlug(data.slug);
    if (conflict && conflict.id !== id) {
      data.slug = `${data.slug}-${Date.now()}`;
    }
  }

  return recipeRepository.update(id, data)!;
}

export function deleteRecipe(id: number): void {
  const recipe = recipeRepository.findById(id);
  if (!recipe) throw createError('Receta no encontrada', 404);
  recipeRepository.remove(id);
}
