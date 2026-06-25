import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { PHOTOS_DIR } from '../config';

export function servePhoto(req: Request, res: Response, next: NextFunction): void {
  try {
    // Sanitize: strip any path traversal
    const filename = path.basename(req.params.filename);
    const filePath = path.join(PHOTOS_DIR, filename);

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ error: 'Foto no encontrada' });
      return;
    }

    res.sendFile(filePath);
  } catch (err) {
    next(err);
  }
}

export function uploadPhoto(req: Request, res: Response, next: NextFunction): void {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No se recibió ninguna foto' });
      return;
    }
    res.status(201).json({ filename: req.file.filename });
  } catch (err) {
    next(err);
  }
}
