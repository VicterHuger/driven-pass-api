import { Request, Response } from "express";

import * as userService from '../services/userService';
import { TypeUserInsert } from "../types/userTypes";

export async function createUser(req:Request, res:Response) {
    const {email, password}:TypeUserInsert = res.locals.body;
    await userService.createUser(email, password);
    return res.sendStatus(201);
}

export async function singInUser(req:Request, res:Response){
    const {email, password}:TypeUserInsert= res.locals.body;
    const token:string = await userService.singInUser(email, password);
    return res.status(200).send({token});
}