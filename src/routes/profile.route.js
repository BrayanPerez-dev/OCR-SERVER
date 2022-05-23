import { Router } from 'express';
import {
	createProfile,
	getAllProfiles,
	getProfile,
	updateProfile,
} from '../controllers/profile.controller';
import { isSuperAdmin, verifyToken } from '../middlewares/authJwt';

const router = Router();

router.post('/', [verifyToken, isSuperAdmin], createProfile);
router.get('/', verifyToken, getAllProfiles);
router.get('/:id', verifyToken, getProfile);
router.put('/:id', [verifyToken, isSuperAdmin], updateProfile);

export default router;
