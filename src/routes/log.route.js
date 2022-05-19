import { Router } from 'express';

import {
	createLog,
	getLog,
	getLogs,
	deleteLog,
} from '../controllers/log.controller';

const router = Router();

router.post('/', createLog);
router.get('/:id', getLog);
router.get('/:id', getLogs);
router.get('/:id', deleteLog);

export default router;
