import { Router } from "express";
import * as userController from '../controllers/userController';
import { validateSchema } from "../middlewares/validateSchema";
import signUpSchema from "../schemas/signUpSchema";
import signInSchema from "../schemas/sigInSchema";

const router: Router = Router();

router.post('/sign-up', validateSchema(signUpSchema), userController.createUser);
router.post('/sign-in', validateSchema(signInSchema), userController.singInUser);

export default router;

