import { Router } from "express";
import userRouter from './userRouter';
import credentialRouter from './credentialRouter';
import safeNoteRouter from './safeNoteRouter';
import cardRouter from './cardRouter';
import wifiRouter from './wifiRouter';

const router:Router = Router();

router.use([userRouter, credentialRouter, safeNoteRouter, cardRouter,wifiRouter]);

export default router;

