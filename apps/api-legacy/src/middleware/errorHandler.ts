import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  errors?: Array<{ field: string; message: string }>;
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const statusCode = err.statusCode ?? 500;
  const message = statusCode === 500 ? 'Error interno del servidor' : err.message;

  console.error(`[ERROR ${statusCode}] ${err.message}`);
  if (statusCode === 500) console.error(err.stack);

  res.status(statusCode).json({
    error: message,
    ...(err.errors && { errors: err.errors }),
  });
}

export function createError(message: string, statusCode: number): AppError {
  const err: AppError = new Error(message);
  err.statusCode = statusCode;
  return err;
}
