import { Request, Response, NextFunction } from 'express';
import * as exportService from '../services/exportService';

export function exportJson(_req: Request, res: Response, next: NextFunction): void {
  try {
    const data = exportService.exportToJson();
    res.setHeader('Content-Disposition', 'attachment; filename="cambiofisico-export.json"');
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export function exportCsv(_req: Request, res: Response, next: NextFunction): void {
  try {
    const csv = exportService.exportToCsv();
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="cambiofisico-export.csv"');
    res.send(csv);
  } catch (err) {
    next(err);
  }
}
