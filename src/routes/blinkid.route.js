import { Router } from 'express';
import {
	createBlinkId,
	deleteBlinkId,
	getBlinkId,
	getBlinkIds,
} from '../controllers/blinkid.controller';

const router = Router();

router.post('/', createBlinkId);
router.get('/:id', getBlinkId);
router.get('/:id', getBlinkIds);
router.delete('/:id', deleteBlinkId);

export default router;
