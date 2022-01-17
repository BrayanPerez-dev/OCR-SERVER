import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";
const router = Router();


router.post('/',verifyToken,createUser);

export default router;