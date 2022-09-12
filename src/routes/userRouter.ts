import { Router } from "express";
import * as userController from '../controllers/userController';
import { validateSchema } from "../middlewares/validateSchema";
import { TypeUserInsert } from "../types/userTypes";
import signUpSchema from "../schemas/signUpSchema";
import signInSchema from "../schemas/signInSchema";

const router: Router = Router();

router.post('/sign-up', validateSchema<TypeUserInsert>(signUpSchema), userController.createUser);
router.post('/sign-in', validateSchema<TypeUserInsert>(signInSchema), userController.singInUser);

export default router;

