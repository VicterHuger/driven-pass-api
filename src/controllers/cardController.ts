import { Request, Response } from "express";
import * as cardService from '../services/cardService';
import { Card } from "@prisma/client";
import { TypeCardInsert } from "../types/cardType";

export async function createCard(_req:Request, res:Response){
    const body:TypeCardInsert = res.locals.body;
    const sessionId:number = res.locals.sessionId;

    const card = await cardService.createcard(body, sessionId);
    
    return res.status(201).send(card);
}

// export async function listcards(_req:Request, res:Response){
//     const sessionId: number = res.locals.sessionId;

//     const cards:card[] = await cardService.listcards(sessionId);

//     return res.status(200).send(cards);
// }

// export async function listcardById(_req:Request, res:Response){
//     const sessionId: number = res.locals.sessionId;
//     const id:number = res.locals.id;

//     const card:card = await cardService.listcardById(sessionId,id);

//     return res.status(200).send(card);
// }

// export async function deletecard(_req:Request, res:Response){
//     const sessionId: number = res.locals.sessionId;
//     const id:number = res.locals.id;

//     await cardService.deletecard(sessionId,id);

//     return res.status(204).send('card deleted');
// }