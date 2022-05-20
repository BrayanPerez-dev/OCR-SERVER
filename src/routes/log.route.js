import { Router } from 'express';

import { createLog, getLog, getLogs } from '../controllers/log.controller';

const router = Router();

router.post('/', createLog);
router.get('/:id', getLog);
router.get('/all/:id', getLogs);

export default router;
