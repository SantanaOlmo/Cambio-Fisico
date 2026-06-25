import path from 'path';

// process.cwd() is the backend/ directory when running `npm run dev` from backend/
export const DATA_DIR = path.resolve(process.cwd(), '../data');
export const DB_PATH = path.join(DATA_DIR, 'fitness.sqlite');
export const PHOTOS_DIR = path.join(DATA_DIR, 'photos');
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
export const INITIAL_WEIGHT_KG = 76.5;
