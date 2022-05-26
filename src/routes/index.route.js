import { Router } from 'express';
import authRoute from './auth.route';
import companyRoute from './company.route';
import branchOfficeRoute from './branchoffice.route';
import contactRoute from './contact.route';
import typeContactRoute from './typecontact.route';
import userRoute from './user.route';
import profileRoute from './profile.route';
import logRoute from './log.route';
import scanDataRoute from './scandata.route';

const router = Router();

router.use('/auth', authRoute);
router.use('/company', companyRoute);
router.use('/branchoffice', branchOfficeRoute);
router.use('/contact', contactRoute);
router.use('/type-contact', typeContactRoute);
router.use('/user', userRoute);
router.use('/log', logRoute);
router.use('/scandata', scanDataRoute);
router.use('/profile', profileRoute);

export default router;
