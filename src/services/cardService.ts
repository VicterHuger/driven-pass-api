import { TypeCardInsert } from "../types/cardType";
import { Card } from "@prisma/client";
import * as sessionService from './sessionService';
import * as cardRepository from '../repositories/cardRepository';
import { generateThrowErrorMessage } from "../utils/errorUtils";
import { cryptrPasswords, descryptItemOfEncryptArray, descryptrPasswords } from "../utils/generalFunctions";


export async function createcard(body:TypeCardInsert, sessionId:number){
    const userId:number = await sessionService.getUserBySessionId(sessionId);
    const cardsByTitle = await cardRepository.getCardByUserAndTitle(userId, body.title);
    if(cardsByTitle) generateThrowErrorMessage('Conflict', 'There is already a card with this title created by you');
    body.securityCode = cryptrPasswords(body.securityCode);
    body.password = cryptrPasswords(body.password);
    const cardCreated = await cardRepository.createCard(body, userId);
    if(!cardCreated) generateThrowErrorMessage('InternalServerError', 'Something went wrong when creating a new card');
    return {id:cardCreated.id, title:cardCreated.title, number:cardCreated.number, nameOnCard: cardCreated.nameOnCard, expirationDate:cardCreated.expirationDate, isVirtual: cardCreated.isVirtual, type:cardCreated.type};
}

export async function listCards(sessionId:number){
    const userId:number = await sessionService.getUserBySessionId(sessionId);
    const cardsByUser = await cardRepository.getCardsByUser(userId);
    if(!cardsByUser) return [];
    return descryptItemOfEncryptArray<Card>(cardsByUser);
}

// export async function listcardById(sessionId:number, id:number){
//     const userId:number = await sessionService.getUserBySessionId(sessionId);
//     const card = await cardRepository.getcardById(id);
//     if(!card) generateThrowErrorMessage("NotFound", "There is no card with this id");
//     if(card.userId !== userId) generateThrowErrorMessage("Unauthorized", "This card do not belongs to you!");
//     card.password = descryptrPasswords(card.password);
//     return card;
// }

// export async function deletecard(sessionId:number, id:number){
//     const userId:number = await sessionService.getUserBySessionId(sessionId);
//     const card = await cardRepository.getcardById(id);
//     if(!card) generateThrowErrorMessage("NotFound", "There is no card with this id");
//     if(card.userId !== userId) generateThrowErrorMessage("Unauthorized", "This card do not belongs to you!");
//     const cardDeleted = await cardRepository.deletecard(id);
//     if(!cardDeleted) generateThrowErrorMessage("InternalServerError", "Something went wrong and it was not possible to delete this card");
//     return;
// }