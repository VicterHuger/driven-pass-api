import { Router } from "express";
import * as cardController from "../controllers/cardController";
import { tokenValidation } from "../middlewares/tokenValidation";
import { validateParamId } from "../middlewares/validateParamId";
import { validateSchema } from "../middlewares/validateSchema";
import cardSchema from "../schemas/cardSchema";
import { TypeCardInsert } from "../types/cardType";

const router:Router = Router();

router.post('/cards/create', validateSchema<TypeCardInsert>(cardSchema), tokenValidation , cardController.createCard);

router.get('/cards', tokenValidation, cardController.listCards);

router.get('/cards/:id', tokenValidation, validateParamId, cardController.listCardById );

// router.delete('/cards/:id', tokenValidation, validateParamId, cardController.deleteCard);

export default router;