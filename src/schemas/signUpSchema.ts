import joi from 'joi';
import { TypeUserInsert } from '../types/userTypes';

const signUpSchema:joi.ObjectSchema<TypeUserInsert> = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
})

export default signUpSchema;