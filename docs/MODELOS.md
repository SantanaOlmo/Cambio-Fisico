# Modelos de Datos

Esta sección describe el esquema de base de datos SQLite y las interfaces de TypeScript de CambioFísico.

---

## 1. Tabla `entries` (Entradas diarias)

Almacena el registro diario del proceso físico del usuario.

### Esquema SQL

```sql
CREATE TABLE IF NOT EXISTS entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT UNIQUE NOT NULL,
  weight REAL,
  sleep_hours REAL,
  sleep_quality INTEGER,
  steps INTEGER, -- Deprecado / Oculto en interfaz
  workout_type TEXT,
  workout_duration INTEGER,
  cardio_done INTEGER,
  food_description TEXT, -- Deprecado / Oculto en interfaz
  carbs_amount REAL, -- Deprecado / Oculto en interfaz
  water_liters REAL, -- Deprecado / Oculto en interfaz
  meal_breakfast TEXT,
  meal_lunch TEXT,
  meal_dinner TEXT,
  meal_other TEXT,
  bloating INTEGER,
  energy INTEGER,
  hunger INTEGER,
  mood INTEGER,
  notes TEXT,
  photo_path TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

### Interfaz TypeScript (`frontend/src/types/entry.ts`)

```typescript
export interface Entry {
  id: number;
  date: string;
  weight: number | null;
  sleep_hours: number | null;
  sleep_quality: number | null;
  steps: number | null;
  workout_type: string | null;
  workout_duration: number | null;
  cardio_done: number | null;
  food_description: string | null;
  carbs_amount: number | null;
  water_liters: number | null;
  meal_breakfast: string | null;
  meal_lunch: string | null;
  meal_dinner: string | null;
  meal_other: string | null;
  bloating: number | null;
  energy: number | null;
  hunger: number | null;
  mood: number | null;
  notes: string | null;
  photo_path: string | null;
  created_at: string;
  updated_at: string;
}

export type EntryFormData = Omit<Entry, 'id' | 'created_at' | 'updated_at'>;
```

---

## 2. Tabla `recipes` (Recetas)

Almacena las recetas en formato Markdown vinculadas por slugs únicos.

### Esquema SQL

```sql
CREATE TABLE IF NOT EXISTS recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  tags TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

### Interfaz TypeScript (`frontend/src/types/recipe.ts`)

```typescript
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
```
