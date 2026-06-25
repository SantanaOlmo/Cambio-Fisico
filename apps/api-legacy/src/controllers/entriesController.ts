import { Request, Response, NextFunction } from 'express';
import * as entryService from '../services/entryService';

export function getAll(_req: Request, res: Response, next: NextFunction): void {
  try {
    res.json(entryService.getAllEntries());
  } catch (err) {
    next(err);
  }
}

export function getById(req: Request, res: Response, next: NextFunction): void {
  try {
    res.json(entryService.getEntryById(Number(req.params.id)));
  } catch (err) {
    next(err);
  }
}

export function create(req: Request, res: Response, next: NextFunction): void {
  try {
    const photoFilename = req.file?.filename;
    const entry = entryService.createEntry({ ...req.body, photo_path: photoFilename ?? req.body.photo_path ?? null });
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
}

export function update(req: Request, res: Response, next: NextFunction): void {
  try {
    const id = Number(req.params.id);
    const newPhotoFilename = req.file?.filename;
    res.json(entryService.updateEntry(id, req.body, newPhotoFilename));
  } catch (err) {
    next(err);
  }
}

export function remove(req: Request, res: Response, next: NextFunction): void {
  try {
    entryService.deleteEntry(Number(req.params.id));
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
