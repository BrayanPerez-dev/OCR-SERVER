import { Router } from 'express';
import {
	createCompany,
	deleteCompany,
	getAllCompanys,
	getCompany,
	updateCompany,
	getCompanyContacts,
	getCompanyAllData,
} from '../controllers/company.controller';

const router = Router();

router.post('/', createCompany);
router.get('/', getAllCompanys);
router.get('/:id', getCompany);
router.delete('/:id', deleteCompany);
router.put('/:id', updateCompany);
router.get('/:id/data', getCompanyAllData);
router.get('/:id/contacts', getCompanyContacts);
export default router;
