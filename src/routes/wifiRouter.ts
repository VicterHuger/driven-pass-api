import { Router } from "express";
import * as wifiController from "../controllers/wifiController";
import { tokenValidation } from "../middlewares/tokenValidation";
import { validateParamId } from "../middlewares/validateParamId";
import { validateSchema } from "../middlewares/validateSchema";
import wifiSchema from "../schemas/wifiSchema";
import { TypeWifiInsert } from "../types/wifiType";

const router:Router = Router();

router.post('/wifis/create', validateSchema<TypeWifiInsert>(wifiSchema), tokenValidation , wifiController.createWifi);

router.get('/wifis', tokenValidation, wifiController.listWifis);

router.get('/wifis/:id', tokenValidation, validateParamId, wifiController.listWifiById );

// router.delete('/wifis/:id', tokenValidation, validateParamId, wifiController.deletewifi);

export default router;