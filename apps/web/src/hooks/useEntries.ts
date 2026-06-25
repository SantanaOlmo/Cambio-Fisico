import { useState, useEffect, useCallback } from 'react';
import { Entry } from '../types/entry';
import { api, ApiError } from '../api/client';

export function useEntries() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.get<Entry[]>('/entries');
      setEntries(data);
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Error al cargar las entradas';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return { entries, loading, error, refetch: fetchEntries };
}
