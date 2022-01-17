import {Router} from 'express'
import { singUp,signIn } from '../controllers/auth.controller.js'

const router = Router()
router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


router.post('/singup',singUp);
router.post('/singin',signIn);

export default router;