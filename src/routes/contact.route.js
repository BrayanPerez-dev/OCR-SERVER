import { Router } from 'express';
import {
	createContact,
	getContact,
	getContacts,
	updateContact,
} from '../controllers/contact.controller';

const router = Router();

router.post('/', createContact);
router.get('/:id', getContact);
router.get('/', getContacts);
router.put('/:id', updateContact);

export default router;
