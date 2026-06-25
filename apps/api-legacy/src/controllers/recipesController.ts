import { Request, Response, NextFunction } from 'express';
import * as recipeService from '../services/recipeService';

export function getAll(req: Request, res: Response, next: NextFunction): void {
  try {
    const { q } = req.query;
    if (q && typeof q === 'string') {
      res.json(recipeService.searchRecipes(q));
    } else {
      res.json(recipeService.getAllRecipes());
    }
  } catch (err) {
    next(err);
  }
}

export function getById(req: Request, res: Response, next: NextFunction): void {
  try {
    res.json(recipeService.getRecipeById(Number(req.params.id)));
  } catch (err) {
    next(err);
  }
}

export function create(req: Request, res: Response, next: NextFunction): void {
  try {
    res.status(201).json(recipeService.createRecipe(req.body));
  } catch (err) {
    next(err);
  }
}

export function update(req: Request, res: Response, next: NextFunction): void {
  try {
    res.json(recipeService.updateRecipe(Number(req.params.id), req.body));
  } catch (err) {
    next(err);
  }
}

export function remove(req: Request, res: Response, next: NextFunction): void {
  try {
    recipeService.deleteRecipe(Number(req.params.id));
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
