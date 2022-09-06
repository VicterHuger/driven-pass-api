import { Router } from "express";
import * as userController from '../controllers/userController';
import { validateSchema } from "../middlewares/validateSchema";
import signUpSchema from "../schemas/signUpSchema";

const router: Router = Router();

router.post('/sign-up', validateSchema(signUpSchema), userController.createUser);

export default router;

