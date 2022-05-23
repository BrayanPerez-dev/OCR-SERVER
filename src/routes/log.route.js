import { Router } from 'express';
import { createLog, getLog, getLogs } from '../controllers/log.controller';
import { verifyToken } from '../middlewares/authJwt';

const router = Router();

router.post('/', verifyToken, createLog);
router.get('/:id', verifyToken, getLog);
router.get('/all/:id', verifyToken, getLogs);

export default router;
