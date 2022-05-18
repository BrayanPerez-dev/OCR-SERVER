import { Router } from 'express';
import { signUp, signIn } from '../controllers/auth.controller';
import {
	checkDuplicateEmailorUsername,
	verifyProfiles,
} from '../middlewares/verifySingup';

const router = Router();

router.use((req, res, next) => {
	res.header(
		'Access-Control-Allow-Headers',
		'x-access-token, Origin, Content-Type, Accept'
	);
	next();
});

router.post('/signup', [checkDuplicateEmailorUsername, verifyProfiles], signUp);
router.post('/signin', signIn);

export default router;
