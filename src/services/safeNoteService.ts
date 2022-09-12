import { TypeSafeNoteInsert } from "../types/safeNoteType";
import { SafeNote } from "@prisma/client";
import * as sessionService from './sessionService';
import * as safeNoteRepository from '../repositories/safeNoteRepository';
import { generateThrowErrorMessage } from "../utils/errorUtils";
import { cryptrPasswords, descryptrPasswords } from "../utils/generalFunctions";


export async function createSafeNote(body:TypeSafeNoteInsert, sessionId:number){
    const userId:number = await sessionService.getUserBySessionId(sessionId);
    const safeNoteByTitle = await safeNoteRepository.getSafeNoteByUserAndTitle(userId, body.title);
    if(safeNoteByTitle) generateThrowErrorMessage('Conflict', 'There is already a safe note with this title created by you');
    const safeNoteCreated = await safeNoteRepository.createSafeNote(body, userId);
    if(!safeNoteCreated) generateThrowErrorMessage('InternalServerError', 'Something went wrong when creating a new safe note');
    return {id:safeNoteCreated.id, title:safeNoteCreated.title, text:safeNoteCreated.text};
}

export async function listSafeNotes(sessionId:number){
    const userId:number = await sessionService.getUserBySessionId(sessionId);
    const safeNotesByUser = await safeNoteRepository.getSafeNoteByUser(userId);
    if(!safeNotesByUser) return [];
    return safeNotesByUser;
}

// export async function listCredentialById(sessionId:number, id:number){
//     const userId:number = await sessionService.getUserBySessionId(sessionId);
//     const credential = await credentialRepository.getCredentialById(id);
//     if(!credential) generateThrowErrorMessage("NotFound", "There is no credential with this id");
//     if(credential.userId !== userId) generateThrowErrorMessage("Unauthorized", "This credential do not belongs to you!");
//     credential.password = descryptrPasswords(credential.password);
//     return credential;
// }

// export async function deleteCredential(sessionId:number, id:number){
//     const userId:number = await sessionService.getUserBySessionId(sessionId);
//     const credential = await credentialRepository.getCredentialById(id);
//     if(!credential) generateThrowErrorMessage("NotFound", "There is no credential with this id");
//     if(credential.userId !== userId) generateThrowErrorMessage("Unauthorized", "This credential do not belongs to you!");
//     const credentialDeleted = await credentialRepository.deleteCredential(id);
//     if(!credentialDeleted) generateThrowErrorMessage("InternalServerError", "Something went wrong and it was not possible to delete this credential");
//     return;
// }