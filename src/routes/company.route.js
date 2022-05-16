import { Router } from 'express';
import {
	createCompany,
	deleteCompany,
	getAllCompanys,
	getCompany,
	updateCompany,
	getCompanyBranchOffices,
	getCompanyContacts,
} from '../controllers/company.controller';

const router = Router();

router.post('/', createCompany);
router.get('/', getAllCompanys);
router.get('/:id', getCompany);
router.delete('/:id', deleteCompany);
router.put('/:id', updateCompany);
router.get('/:id/branchoffices', getCompanyBranchOffices);
router.get('/:id/contacts', getCompanyContacts);
export default router;
