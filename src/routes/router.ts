import { Router } from "express";
import userRouter from './userRouter';
import credentialRouter from './credentialRouter';
import safeNoteRouter from './safeNoteRouter';

const router:Router = Router();

router.use([userRouter, credentialRouter, safeNoteRouter]);

export default router;

