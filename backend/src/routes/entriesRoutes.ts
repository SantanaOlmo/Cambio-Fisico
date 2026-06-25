import { Router } from 'express';
import * as entriesController from '../controllers/entriesController';
import { photoUpload } from '../multerConfig';

const router = Router();

router.get('/', entriesController.getAll);
router.get('/:id', entriesController.getById);
router.post('/', photoUpload.single('photo'), entriesController.create);
router.put('/:id', photoUpload.single('photo'), entriesController.update);
router.delete('/:id', entriesController.remove);

export default router;
