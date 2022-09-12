import joi from 'joi';

import { TypeSafeNoteInsert } from '../types/safeNoteType';

const safeNoteSchema:joi.ObjectSchema <TypeSafeNoteInsert> = joi.object({
    title: joi.string().min(1).max(50).required(),
    text: joi.string().min(1).max(1000).required(),
})

export default safeNoteSchema;