import { Router } from 'express';
import {
	createTypeContact,
	getAllTypeContact,
	getTypeContact,
	updateTypeContact,
} from '../controllers/typecontact.controller';

const router = Router();

router.post('/', createTypeContact);
router.get('/', getAllTypeContact);
router.get('/:id', getTypeContact);
router.put('/:id', updateTypeContact);

export default router;
