import { Request, Response } from "express";
import * as credentialService from '../services/credentialService';
import { Credential } from "@prisma/client";
import { TypeCredentialInsert } from "../types/credentialType";

export async function createCredencial(_req:Request, res:Response){
    const body:TypeCredentialInsert = res.locals.body;
    const sessionId:number = res.locals.sessionId;

    const credential = await credentialService.createCredencial(body, sessionId);
    
    return res.status(201).send(credential);
}

export async function listCredentials(_req:Request, res:Response){
    const sessionId: number = res.locals.sessionId;

    const credentials:Credential[] = await credentialService.listCredentials(sessionId);

    return res.status(200).send(credentials);
}

export async function listCredentialById(_req:Request, res:Response){
    const sessionId: number = res.locals.sessionId;
    const id:number = res.locals.id;

    const credential:Credential = await credentialService.listCredentialById(sessionId,id);

    return res.status(200).send(credential);
}

export async function deleteCredential(_req:Request, res:Response){
    const sessionId: number = res.locals.sessionId;
    const id:number = res.locals.id;

    await credentialService.deleteCredential(sessionId,id);

    return res.status(204).send('Credential deleted');
}