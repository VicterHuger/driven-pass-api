import { Request, Response } from "express";
import * as safeNoteService from '../services/safeNoteService';
import { SafeNote } from "@prisma/client";
import { TypeSafeNoteInsert } from "../types/safeNoteType";

export async function createSafeNote(_req:Request, res:Response){
    const body:TypeSafeNoteInsert = res.locals.body;
    const sessionId:number = res.locals.sessionId;

    const safeNote = await safeNoteService.createSafeNote(body, sessionId);
    
    return res.status(201).send(safeNote);
}

// export async function listCredentials(_req:Request, res:Response){
//     const sessionId: number = res.locals.sessionId;

//     const credentials:Credential[] = await credentialService.listCredentials(sessionId);

//     return res.status(200).send(credentials);
// }

// export async function listCredentialById(_req:Request, res:Response){
//     const sessionId: number = res.locals.sessionId;
//     const id:number = res.locals.id;

//     const credential:Credential = await credentialService.listCredentialById(sessionId,id);

//     return res.status(200).send(credential);
// }

// export async function deleteCredential(_req:Request, res:Response){
//     const sessionId: number = res.locals.sessionId;
//     const id:number = res.locals.id;

//     await credentialService.deleteCredential(sessionId,id);

//     return res.status(204).send('Credential deleted');
// }