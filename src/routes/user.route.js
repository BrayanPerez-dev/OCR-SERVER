import { Router } from 'express';
import {
	createUser,
	updateUser,
	getUser,
	getUsers,
	enableUser,
	updateCredentials,
} from '../controllers/user.controller';
import { isAdmin, verifyToken } from '../middlewares/authJwt';

const router = Router();

router.post('/', [verifyToken, isAdmin], createUser);
router.put('/:id', verifyToken, updateUser);
router.get('/:id', verifyToken, getUser);
router.get('/all/:id', verifyToken, getUsers);
router.patch('/enable/:id', [verifyToken, isAdmin], enableUser);
router.patch('/:id', verifyToken, updateCredentials);
export default router;
