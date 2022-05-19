import { Router } from 'express';
import {
	createScanData,
	deleteScanData,
	getAllScanData,
	getScanData,
} from '../controllers/scandata.controller';

const router = Router();

router.post('/', createScanData);
router.get('/:id', getScanData);
router.get('/:id', getAllScanData);
router.delete('/:id', deleteScanData);

export default router;
