import { Router } from 'express';
import {
	createScanData,
	getAllScanData,
	getScanData,
} from '../controllers/scandata.controller';

const router = Router();

router.post('/', createScanData);
router.get('/log/data/:id', getAllScanData);
router.get('/:id', getScanData);

export default router;
