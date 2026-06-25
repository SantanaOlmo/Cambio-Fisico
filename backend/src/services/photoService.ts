import fs from 'fs';
import path from 'path';
import { PHOTOS_DIR } from '../config';

export function deletePhoto(filename: string): void {
  // Accept both full path or just filename
  const base = path.basename(filename);
  const fullPath = path.join(PHOTOS_DIR, base);

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
}

export function photoExists(filename: string): boolean {
  return fs.existsSync(path.join(PHOTOS_DIR, path.basename(filename)));
}
