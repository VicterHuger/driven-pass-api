import joi from 'joi';

const signUpSchema:joi.ObjectSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
})

export default signUpSchema;