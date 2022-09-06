import { Request, Response } from "express";

import * as userService from '../services/userService';
import { ISignUpBody } from "../types/userTypes";

export async function createUser(req:Request, res:Response) {
    const {email, password}:ISignUpBody = res.locals.body;
    await userService.createUser(email, password);
    return res.sendStatus(501);
}