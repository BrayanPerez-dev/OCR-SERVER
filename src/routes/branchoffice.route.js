import { Router } from 'express';
import {
	createBranchOffices,
	getBranchOffices,
	getALLBranchOffices,
	updateBranchOffices,
} from '../controllers/branchoffice.controller';

const router = Router();

router.post('/', createBranchOffices);
router.get('/:id', getBranchOffices);
router.get('/', getALLBranchOffices);
router.put('/:id', updateBranchOffices);
export default router;
