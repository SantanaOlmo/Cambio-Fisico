import { Recipe, CreateRecipeDto, UpdateRecipeDto } from '../types/recipe';
import { queryAll, queryOne, execute, lastInsertRowid } from '../db/helpers';

const COLUMNS = 'id, name, slug, content, tags, created_at, updated_at';

export function findAll(): Recipe[] {
  return queryAll<Recipe>(`SELECT ${COLUMNS} FROM recipes ORDER BY name ASC`);
}

export function findById(id: number): Recipe | undefined {
  return queryOne<Recipe>(`SELECT ${COLUMNS} FROM recipes WHERE id = ?`, [id]);
}

export function findBySlug(slug: string): Recipe | undefined {
  return queryOne<Recipe>(`SELECT ${COLUMNS} FROM recipes WHERE slug = ?`, [slug]);
}

export function search(query: string): Recipe[] {
  const q = `%${query}%`;
  return queryAll<Recipe>(
    `SELECT ${COLUMNS} FROM recipes WHERE name LIKE ? OR slug LIKE ? OR tags LIKE ? ORDER BY name ASC`,
    [q, q, q],
  );
}

export function create(data: CreateRecipeDto): Recipe {
  const now = new Date().toISOString();
  execute(
    `INSERT INTO recipes (name, slug, content, tags, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [data.name, data.slug, data.content, data.tags, now, now],
  );
  return findById(lastInsertRowid())!;
}

export function update(id: number, data: UpdateRecipeDto): Recipe | undefined {
  const existing = findById(id);
  if (!existing) return undefined;

  const merged = { ...existing, ...data };
  const now = new Date().toISOString();

  execute(
    `UPDATE recipes SET name = ?, slug = ?, content = ?, tags = ?, updated_at = ? WHERE id = ?`,
    [merged.name, merged.slug, merged.content, merged.tags, now, id],
  );
  return findById(id);
}

export function remove(id: number): boolean {
  return execute('DELETE FROM recipes WHERE id = ?', [id]) > 0;
}
