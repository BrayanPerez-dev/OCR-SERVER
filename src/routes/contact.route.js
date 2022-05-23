import { Router } from 'express';
import {
	createContact,
	getContact,
	getContacts,
	updateContact,
} from '../controllers/contact.controller';
import { verifyToken } from '../middlewares/authJwt';

const router = Router();

router.post('/', verifyToken, createContact);
router.get('/:id', verifyToken, getContact);
router.get('/all/:id', verifyToken, getContacts);
router.put('/:id', verifyToken, updateContact);

export default router;
