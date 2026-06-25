import { Database } from 'sql.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function addColumnSafe(db: Database, table: string, column: string, definition: string): void {
  try {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  } catch {
    // Column already exists — safe to ignore in SQLite
  }
}

// ---------------------------------------------------------------------------
// Entries table
// ---------------------------------------------------------------------------
function applyEntriesSchema(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS entries (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,
      date             TEXT    UNIQUE NOT NULL,
      weight           REAL,
      sleep_hours      REAL,
      sleep_quality    INTEGER,
      steps            INTEGER,
      workout_type     TEXT,
      workout_duration INTEGER,
      cardio_done      INTEGER DEFAULT 0,
      food_description TEXT,
      carbs_amount     REAL,
      water_liters     REAL,
      bloating         INTEGER,
      energy           INTEGER,
      hunger           INTEGER,
      mood             INTEGER,
      notes            TEXT,
      photo_path       TEXT,
      created_at       TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_entries_date ON entries(date);
  `);

  // ── Migrations: add new columns to existing databases ──────────────────
  addColumnSafe(db, 'entries', 'meal_breakfast', 'TEXT');
  addColumnSafe(db, 'entries', 'meal_lunch',     'TEXT');
  addColumnSafe(db, 'entries', 'meal_dinner',    'TEXT');
  addColumnSafe(db, 'entries', 'meal_other',     'TEXT');
}

// ---------------------------------------------------------------------------
// Recipes table
// ---------------------------------------------------------------------------
function applyRecipesSchema(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT NOT NULL,
      slug       TEXT NOT NULL UNIQUE,
      content    TEXT NOT NULL DEFAULT '',
      tags       TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_recipes_slug ON recipes(slug);
  `);
}

// ---------------------------------------------------------------------------
// Public
// ---------------------------------------------------------------------------
export function applySchema(db: Database): void {
  applyEntriesSchema(db);
  applyRecipesSchema(db);
}
