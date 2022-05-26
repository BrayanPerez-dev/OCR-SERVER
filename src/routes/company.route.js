import { Router } from 'express';
import {
	createCompany,
	enableCompany,
	getAllCompanies,
	getCompany,
	updateCompany,
	nextPaymentDate,
} from '../controllers/company.controller';
import { isSuperAdmin, verifyToken } from '../middlewares/authJwt';

const router = Router();

router.post('/', createCompany);
router.get('/', [verifyToken, isSuperAdmin], getAllCompanies);
router.get('/:id', verifyToken, getCompany);
router.put('/:id', verifyToken, updateCompany);
router.patch('/enable/:id', [verifyToken, isSuperAdmin], enableCompany);
router.patch('/enable/:id', [verifyToken, isSuperAdmin], enableCompany);
router.patch('/paymentdate/:id', nextPaymentDate);
export default router;
