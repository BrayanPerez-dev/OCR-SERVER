import { Router } from 'express';
import { getAllTypeContact } from '../controllers/typecontact.controller';

const router = Router();

router.get('/', getAllTypeContact);

export default router;
