import { Router } from 'express';
import {
	createUser,
	updateUser,
	deleteUser,
	getUser,
} from '../controllers/user.controller';
import {
	isAdminCompany,
	isManagerCompany,
	verifyToken,
} from '../middlewares/authJwt';

const router = Router();

router.post('/', [verifyToken, isAdminCompany, isManagerCompany], createUser);
router.put('/:id', verifyToken, updateUser);
router.delete(
	'/:id',
	[verifyToken, isAdminCompany, isManagerCompany],
	deleteUser
);
router.get('/:id', verifyToken, getUser);

export default router;
