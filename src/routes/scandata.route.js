import { Router } from 'express';
import {
	createScanData,
	deleteScanData,
	getAllScanData,
	getScanData,
} from '../controllers/scandata.controller';

const router = Router();

router.post('/', createScanData);
router.get('/log/data/:id', getAllScanData);
router.get('/:id', getScanData);
router.delete('/:id', deleteScanData);

export default router;
