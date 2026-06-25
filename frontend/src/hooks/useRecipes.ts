import { useState, useCallback } from 'react';
import { Recipe } from '../types/recipe';
import { api, ApiError } from '../api/client';

interface UseRecipesReturn {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useRecipes(): UseRecipesReturn {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.get<Recipe[]>('/recipes');
      setRecipes(data);
      setFetched(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Error al cargar recetas');
    } finally {
      setLoading(false);
    }
  }, []);

  // Lazy-load on first use
  if (!fetched && !loading) {
    fetch();
  }

  return { recipes, loading, error, refetch: fetch };
}
