import { Router } from 'express';
import {
	createScanData,
	getAllScanData,
	getScanData,
} from '../controllers/scandata.controller';
import { verifyToken } from '../middlewares/authJwt';

const router = Router();

router.post('/', verifyToken, createScanData);
router.get('/all/:id', verifyToken, getAllScanData);
router.get('/:id', verifyToken, getScanData);

export default router;
