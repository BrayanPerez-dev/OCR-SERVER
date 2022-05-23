import { Router } from 'express';
import {
	createUser,
	updateUser,
	getUser,
	getUsers,
	enableUser,
} from '../controllers/user.controller';
import { isAdmin, verifyToken } from '../middlewares/authJwt';

const router = Router();

router.post('/', [verifyToken, isAdmin], createUser);
router.put('/:id', verifyToken, updateUser);
router.put('/enable/:id', [verifyToken, isAdmin], enableUser);
router.get('/:id', verifyToken, getUser);
router.get('/all/:id', verifyToken, getUsers);

export default router;
