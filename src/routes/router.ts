import { Router } from "express";
import userRouter from './userRouter';
import credentialRouter from './credentialRouter';
import safeNoteRouter from './safeNoteRouter';
import cardRouter from './cardRouter';

const router:Router = Router();

router.use([userRouter, credentialRouter, safeNoteRouter, cardRouter]);

export default router;

