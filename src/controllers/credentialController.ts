import { Request, Response } from "express";
import * as credentialService from '../services/credentialService'
import { TypeCredentialInsert } from "../types/credentialType";

export async function createCredencial(_req:Request, res:Response){
    const body:TypeCredentialInsert = res.locals.body;
    const sessionId:number = res.locals.sessionId;

    const credential = await credentialService.createCredencial(body, sessionId);
    
    return res.status(201).send(credential);
}