import { Router } from "express";
import userRouter from './userRouter';
import credentialRouter from './credentialRouter';

const router:Router = Router();

router.use([userRouter, credentialRouter]);

export default router;

