import { Router } from 'express';
import {
	createUser,
	updateUser,
	getUser,
} from '../controllers/user.controller';
import { isAdmin, verifyToken } from '../middlewares/authJwt';

const router = Router();

router.post('/', [verifyToken, isAdmin], createUser);
router.put('/:id', verifyToken, updateUser);
router.get('/:id', verifyToken, getUser);

export default router;
