import initSqlJs, { Database, BindParams } from 'sql.js';
import fs from 'fs';
import path from 'path';
import { DB_PATH, PHOTOS_DIR, DATA_DIR } from '../config';
import { applySchema } from './schema';

export type { Database };

let db: Database | null = null;

function ensureDirectories(): void {
  for (const dir of [DATA_DIR, PHOTOS_DIR]) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Initializes the SQLite database using sql.js (pure WebAssembly — no native compilation).
 * Must be called once before any repository operations.
 */
export async function initializeDatabase(): Promise<void> {
  ensureDirectories();

  const SQL = await initSqlJs({
    // Point to the WASM file shipped alongside sql.js in node_modules
    locateFile: (file: string) =>
      path.join(path.dirname(require.resolve('sql.js')), file),
  });

  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run('PRAGMA foreign_keys = ON');
  applySchema(db);
  persist(); // write initial file to disk
}

export function getDatabase(): Database {
  if (!db) throw new Error('Base de datos no inicializada. Llama a initializeDatabase() primero.');
  return db;
}

/** Persist in-memory DB to disk. Call after every write operation. */
export function persist(): void {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

export function closeDatabase(): void {
  if (db) {
    persist();
    db.close();
    db = null;
  }
}
