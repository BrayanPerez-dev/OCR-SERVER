import { Router } from 'express';
import {
	deleteBlinkId,
	getBlinkId,
	getBlinkIds,
} from '../controllers/blinkid.controller';
import { createLog } from '../controllers/log.controller';

const router = Router();

router.post('/', createLog);
router.get('/:id', getBlinkId);
router.get('/:id', getBlinkIds);
router.get('/:id', deleteBlinkId);

export default router;
