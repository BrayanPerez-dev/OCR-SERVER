import { Router } from 'express';
import {
	createTypeContact,
	getAllTypeContact,
	getTypeContact,
	updateTypeContact,
} from '../controllers/typecontact.controller';
import { isSuperAdmin, verifyToken } from '../middlewares/authJwt';

const router = Router();

router.post('/', [verifyToken, isSuperAdmin], createTypeContact);
router.get('/', verifyToken, getAllTypeContact);
router.get('/:id', verifyToken, getTypeContact);
router.put('/:id', [verifyToken, isSuperAdmin], updateTypeContact);

export default router;
