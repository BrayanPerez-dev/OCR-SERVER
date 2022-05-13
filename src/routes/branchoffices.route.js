import { Router } from 'express';
import {
	createBranchOffices,
	getBranchOffices,
	getALLBranchOffices,
	deleteBranchOffices,
	updateBranchOffices,
} from '../controllers/branchoffices.controller';

const router = Router();

router.post('/', createBranchOffices);
router.get('/:id', getBranchOffices);
router.get('/', getALLBranchOffices);
router.delete('/:id', deleteBranchOffices);
router.put('/:id', updateBranchOffices);
export default router;
