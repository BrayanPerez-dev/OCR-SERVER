import { Router } from 'express';
import {
	createCompany,
	deleteCompany,
	getAllCompanys,
	getCompany,
	updatedCompany,
} from '../controllers/company.controller';

const router = Router();

router.post('/', createCompany);
router.get('/', getAllCompanys);
router.get('/:name', getCompany);
router.delete('/:id', deleteCompany);
router.put('/:id', updatedCompany);
export default router;
