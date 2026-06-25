> [!WARNING]
> ## Esquema heredado — no representa el modelo futuro del producto
>
> Este documento describe la persistencia actual de la aplicación web heredada.
>
> Es útil para mantener, migrar o comprender el código existente, pero no debe utilizarse como fuente de verdad para diseñar el dominio futuro de CambioFísico.
>
> El modelo futuro deberá surgir de casos de uso reales, del modelo mental del producto y de decisiones técnicas registradas mediante ADRs.
>
> En particular, la tabla `entries` no implica que una experiencia humana deba modelarse como una entrada diaria única ni que todos los registros deban completarse mediante un formulario diario.

# Esquema heredado de la aplicación web

Este documento describe el esquema SQLite y las interfaces TypeScript utilizados actualmente por la aplicación web heredada de CambioFísico.

Su objetivo es facilitar el mantenimiento, la depuración, la exportación o una futura migración de esos datos.

No define el modelo de dominio futuro de la aplicación móvil ni debe utilizarse para decidir nuevas entidades, tablas o flujos de producto.

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
  steps INTEGER,
  workout_type TEXT,
  workout_duration INTEGER,
  cardio_done INTEGER,
  food_description TEXT,
  carbs_amount REAL,
  water_liters REAL,
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

---

## Limitaciones conocidas del esquema heredado

- La tabla `entries` agrupa múltiples áreas de vida en una sola fila diaria.
- La restricción de fecha única dificulta representar varias experiencias independientes el mismo día.
- Las comidas se almacenan bajo una estructura fija de desayuno, comida, cena y otros.
- El esquema mezcla datos observables, percepciones personales y notas libres dentro de la misma entidad.
- Las recetas son entidades independientes y todavía no representan relaciones explícitamente de preparación, uso o valoración dentro de una experiencia.
- El modelo se conserva por compatibilidad con la aplicación web actual; no debe extenderse automáticamente como base de la aplicación móvil.
- **Campos obsoletos:** Los campos `steps`, `food_description`, `carbs_amount` y `water_liters` en la tabla `entries` pertenecen a versiones iniciales del prototipo, están en desuso y permanecen ocultos en la interfaz de usuario de la web actual.

---

## Uso permitido de este documento

Este documento puede consultarse para:

- mantener la aplicación web existente;
- comprender consultas, exportaciones o migraciones actuales;
- identificar datos que deben preservarse en una futura migración;
- detectar limitaciones del sistema heredado.

No debe utilizarse para:

- diseñar el modelo de dominio futuro;
- decidir el esquema SQLite de la aplicación móvil;
- asumir que el registro debe organizarse por días;
- crear formularios diarios obligatorios;
- extender campos nuevos en `entries` sin una necesidad explícitota de mantenimiento.
