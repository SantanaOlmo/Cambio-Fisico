// All requests use relative /api paths — Vite proxies them to localhost:3001 in dev
const API_BASE = '/api';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly errors?: Array<{ field: string; message: string }>,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({ error: 'Error desconocido' }));
    throw new ApiError(response.status, body.error ?? 'Error del servidor', body.errors);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const api = {
  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`);
    return handleResponse<T>(res);
  },

  async postFormData<T>(path: string, formData: FormData): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      body: formData,
    });
    return handleResponse<T>(res);
  },

  async post<T>(path: string, data: unknown): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<T>(res);
  },

  async putFormData<T>(path: string, formData: FormData): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'PUT',
      body: formData,
    });
    return handleResponse<T>(res);
  },

  async put<T>(path: string, data: unknown): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<T>(res);
  },

  async delete(path: string): Promise<void> {
    const res = await fetch(`${API_BASE}${path}`, { method: 'DELETE' });
    return handleResponse<void>(res);
  },

  photoUrl(filename: string): string {
    return `${API_BASE}/photos/${encodeURIComponent(filename)}`;
  },

  exportUrl(format: 'csv' | 'json'): string {
    return `${API_BASE}/export/${format}`;
  },
};
