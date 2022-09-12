import { TypeSafeNoteInsert } from "../types/safeNoteType";
import { SafeNote } from "@prisma/client";
import * as sessionService from './sessionService';
import * as safeNoteRepository from '../repositories/safeNoteRepository';
import { generateThrowErrorMessage } from "../utils/errorUtils";


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

export async function listSafeNoteById(sessionId:number, id:number){
    const userId:number = await sessionService.getUserBySessionId(sessionId);
    const safeNote:SafeNote = await safeNoteRepository.getSafeNoteById(id);
    if(!safeNote) generateThrowErrorMessage("NotFound", "There is no safe note with this id");
    if(safeNote.userId !== userId) generateThrowErrorMessage("Unauthorized", "This safe note do not belongs to you!");
    return safeNote;
}

export async function deleteSafeNote(sessionId:number, id:number){
    const userId:number = await sessionService.getUserBySessionId(sessionId);
    const safeNote = await safeNoteRepository.getSafeNoteById(id);
    if(!safeNote) generateThrowErrorMessage("NotFound", "There is no safe note with this id");
    if(safeNote.userId !== userId) generateThrowErrorMessage("Unauthorized", "This safe note do not belongs to you!");
    const safeNoteDeleted = await safeNoteRepository.deleteSafeNote(id);
    if(!safeNoteDeleted) generateThrowErrorMessage("InternalServerError", "Something went wrong and it was not possible to delete this safe note");
    return;
}