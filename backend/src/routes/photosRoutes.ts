import { Router } from 'express';
import * as photosController from '../controllers/photosController';

const router = Router();

// GET /api/photos/:filename — serve a stored photo
router.get('/:filename', photosController.servePhoto);

export default router;
