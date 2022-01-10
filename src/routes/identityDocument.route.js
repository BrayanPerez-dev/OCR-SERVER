import { Router } from "express";
import { createDocument,getDocuments } from "../controllers/identityDocument.controller";
const router = Router();

router.post('/',createDocument)
router.get('/',getDocuments)

export default router