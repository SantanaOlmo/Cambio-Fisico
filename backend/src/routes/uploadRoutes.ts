import { Router } from 'express';
import * as photosController from '../controllers/photosController';
import { photoUpload } from '../multerConfig';

const router = Router();

// POST /api/uploads/photo — standalone photo upload (returns filename)
router.post('/photo', photoUpload.single('photo'), photosController.uploadPhoto);

export default router;
