import joi from 'joi';
import { TypeCredentialInsert } from '../types/credentialType';

const credentialSchema:joi.ObjectSchema <TypeCredentialInsert> = joi.object({
    title: joi.string().min(1).required(),
    url: joi.string().uri().required(),
    userName: joi.string().min(1).required(),
    password: joi.string().min(1).required(),
})

export default credentialSchema;