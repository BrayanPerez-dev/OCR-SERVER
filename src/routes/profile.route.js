import { Router } from 'express';
import {
	createProfile,
	getAllProfiles,
	getProfile,
	updateProfile,
} from '../controllers/profile.controller';

const router = Router();

router.post('/', createProfile);
router.get('/', getAllProfiles);
router.get('/:id', getProfile);
router.put('/:id', updateProfile);

export default router;
