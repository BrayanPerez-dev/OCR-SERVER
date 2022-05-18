import { Router } from 'express';
import { getAllProfiles } from '../controllers/profile.controller';

const router = Router();

router.get('/', getAllProfiles);

export default router;
