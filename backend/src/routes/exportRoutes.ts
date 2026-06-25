import { Router } from 'express';
import * as exportController from '../controllers/exportController';

const router = Router();

router.get('/json', exportController.exportJson);
router.get('/csv', exportController.exportCsv);

export default router;
