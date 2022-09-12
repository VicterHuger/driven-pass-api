import { Router } from "express";
import * as credentialController from "../controllers/credentialController";
import { tokenValidation } from "../middlewares/tokenValidation";
import { validateParamId } from "../middlewares/validateParamId";
import { validateSchema } from "../middlewares/validateSchema";
import credentialSchema from "../schemas/credentialSchema";
import { TypeCredentialInsert } from "../types/credentialType";

const router:Router = Router();

router.post('/credentials/create', validateSchema<TypeCredentialInsert>(credentialSchema), tokenValidation , credentialController.createCredencial);

router.get('/credentials', tokenValidation, credentialController.listCredentials);

router.get('/credentials/:id', tokenValidation, validateParamId, credentialController.listCredentialById );

export default router;