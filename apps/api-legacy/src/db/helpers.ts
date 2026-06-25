import { BindParams } from 'sql.js';
import { getDatabase, persist } from './database';

type BindValue = string | number | null | Uint8Array;

/**
 * Execute a SELECT query and return all matching rows as objects.
 */
export function queryAll<T extends object>(
  sql: string,
  params: BindValue[] = [],
): T[] {
  const db = getDatabase();
  const stmt = db.prepare(sql);
  const results: T[] = [];

  stmt.bind(params as BindParams);
  while (stmt.step()) {
    results.push(stmt.getAsObject() as T);
  }
  stmt.free();

  return results;
}

/**
 * Execute a SELECT query and return the first matching row, or undefined.
 */
export function queryOne<T extends object>(
  sql: string,
  params: BindValue[] = [],
): T | undefined {
  const db = getDatabase();
  const stmt = db.prepare(sql);

  stmt.bind(params as BindParams);
  const found = stmt.step();
  const result = found ? (stmt.getAsObject() as T) : undefined;
  stmt.free();

  return result;
}

let lastRowId = 0;

/**
 * Execute an INSERT, UPDATE or DELETE statement and persist to disk.
 * Returns the number of rows affected.
 */
export function execute(sql: string, params: BindValue[] = []): number {
  const db = getDatabase();
  db.run(sql, params as BindParams);
  const affected = db.getRowsModified();
  
  // Capture the last insert row ID before persist() resets it!
  const stmt = db.prepare('SELECT last_insert_rowid() AS id');
  stmt.step();
  const row = stmt.getAsObject() as { id: number };
  lastRowId = row.id;
  stmt.free();

  persist();
  return affected;
}

/**
 * Returns the rowid of the last INSERT operation.
 */
export function lastInsertRowid(): number {
  return lastRowId;
}
