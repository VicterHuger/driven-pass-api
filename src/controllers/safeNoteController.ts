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

export async function listSafeNotes(_req:Request, res:Response){
    const sessionId: number = res.locals.sessionId;

    const safeNotes:SafeNote[] = await safeNoteService.listSafeNotes(sessionId);

    return res.status(200).send(safeNotes);
}

export async function listSafeNoteById(_req:Request, res:Response){
    const sessionId: number = res.locals.sessionId;
    const id:number = res.locals.id;

    const safeNote:SafeNote = await safeNoteService.listSafeNoteById(sessionId,id);

    return res.status(200).send(safeNote);
}

export async function deleteSafeNote(_req:Request, res:Response){
    const sessionId: number = res.locals.sessionId;
    const id:number = res.locals.id;

    await safeNoteService.deleteSafeNote(sessionId,id);

    return res.status(204).send('Safe note deleted');
}