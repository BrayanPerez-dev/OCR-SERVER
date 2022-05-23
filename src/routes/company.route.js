import { Router } from 'express';
import {
	createCompany,
	enableCompany,
	getAllCompanies,
	getCompany,
	updateCompany,
} from '../controllers/company.controller';
import { isSuperAdmin, verifyToken } from '../middlewares/authJwt';

const router = Router();

router.post('/', createCompany);
router.get('/', [verifyToken, isSuperAdmin], getAllCompanies);
router.get('/:id', verifyToken, getCompany);
router.put('/:id', verifyToken, updateCompany);
router.put('/enable/:id', [verifyToken, isSuperAdmin], enableCompany);

export default router;
