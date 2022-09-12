import { Router } from "express";
import * as credentialController from "../controllers/credentialController";
import { tokenValidation } from "../middlewares/tokenValidation";
import { validateSchema } from "../middlewares/validateSchema";
import credentialSchema from "../schemas/credentialSchema";
import { TypeCredentialInsert } from "../types/credentialType";

const router:Router = Router();

router.post('/credentials/create', validateSchema<TypeCredentialInsert>(credentialSchema), tokenValidation , credentialController.createCredencial)

export default router;