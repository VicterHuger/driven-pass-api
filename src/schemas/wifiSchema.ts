import joi from 'joi';
import { TypeWifiInsert } from '../types/wifiType';

const wifiSchema:joi.ObjectSchema <TypeWifiInsert> = joi.object({
    title: joi.string().min(1).required(),
    networkName: joi.string().min(1).required(),
    networkPassword: joi.string().min(1).required(),
})

export default wifiSchema;