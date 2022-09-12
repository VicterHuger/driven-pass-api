import { Router } from "express";
import * as safeNoteController from "../controllers/safeNoteController";
import { tokenValidation } from "../middlewares/tokenValidation";
import { validateParamId } from "../middlewares/validateParamId";
import { validateSchema } from "../middlewares/validateSchema";
import safeNoteSchema from "../schemas/safeNoteSchema";
import { TypeSafeNoteInsert } from "../types/safeNoteType";

const router:Router = Router();

router.post('/safeNotes/create', validateSchema<TypeSafeNoteInsert>(safeNoteSchema), tokenValidation , safeNoteController.createSafeNote);

router.get('/safeNotes', tokenValidation, safeNoteController.listSafeNotes);

router.get('/safeNotes/:id', tokenValidation, validateParamId, safeNoteController.listSafeNoteById );

router.delete('/safeNotes/:id', tokenValidation, validateParamId, safeNoteController.deleteSafeNote);

export default router;