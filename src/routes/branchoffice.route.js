import { Router } from 'express';
import {
	createBranchOffice,
	getBranchOffice,
	getALLBranchOffices,
	updateBranchOffice,
	enableBranch,
} from '../controllers/branchoffice.controller';
import { isAdmin, verifyToken } from '../middlewares/authJwt';
const router = Router();

router.post('/', [verifyToken, isAdmin], createBranchOffice);
router.get('/:id', verifyToken, getBranchOffice);
router.get('/all/:id', verifyToken, getALLBranchOffices);
router.put('/:id', [verifyToken, isAdmin], updateBranchOffice);
router.put('/enable/:id', [verifyToken, isAdmin], enableBranch);

export default router;
