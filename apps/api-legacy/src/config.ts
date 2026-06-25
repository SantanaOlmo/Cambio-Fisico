import path from 'path';
import fs from 'fs';

function findDataDir(): string {
  // Resolve paths relative to __dirname (src/) or process.cwd() (package root)
  const devDataPath = path.resolve(__dirname, '../../../data');
  const distDataPath = path.resolve(__dirname, '../../../../data');
  const cwdDataPath = path.resolve(process.cwd(), '../../data');
  const legacyDataPath = path.resolve(process.cwd(), '../data');

  if (fs.existsSync(devDataPath)) return devDataPath;
  if (fs.existsSync(distDataPath)) return distDataPath;
  if (fs.existsSync(cwdDataPath)) return cwdDataPath;
  return legacyDataPath;
}

export const DATA_DIR = findDataDir();
export const DB_PATH = path.join(DATA_DIR, 'fitness.sqlite');
export const PHOTOS_DIR = path.join(DATA_DIR, 'photos');
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
export const INITIAL_WEIGHT_KG = 76.5;

