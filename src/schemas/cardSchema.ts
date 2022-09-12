import joi from 'joi';
import { TypeCardInsert } from '../types/cardType';

const typesCards:string[]=["credit","debit","dualCard"]

const cardSchema:joi.ObjectSchema <TypeCardInsert> = joi.object({
    title: joi.string().min(1).required(),
    number: joi.string().min(13).pattern(/^[0-9]+$/).required(),
    nameOnCard: joi.string().min(1).required(),
    securityCode: joi.string().length(3).pattern(/^[0-9]+$/).required(),
    expirationDate: joi.string().length(5).required(),
    password: joi.string().min(4).pattern(/^[0-9]+$/).required(),
    isVirtual:joi.boolean().required(),
    type: joi.valid(...typesCards)
})

export default cardSchema;