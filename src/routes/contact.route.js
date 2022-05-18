import { Router } from 'express';
import {
	createContact,
	deleteContact,
	getContact,
	getContacts,
	updateContact,
} from '../controllers/contact.controller';

const router = Router();

router.post('/', createContact);
router.get('/:id', getContact);
router.get('/', getContacts);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;
