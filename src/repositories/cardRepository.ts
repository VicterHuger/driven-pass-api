import prisma from "../config/databse";
import { TypeCardInsert } from "../types/cardType";

export async function getCardByUserAndTitle(userId:number, title:string) {
    return await prisma.card.findFirst({where:{userId, title}});
}

export async function createCard(card:TypeCardInsert, userId:number){
    return await prisma.card.create({data:{...card,userId }});
}

export async function getCardsByUser(userId:number){
    return await prisma.card.findMany({where:{userId}});
}

export async function getCardById(id:number){
    return await prisma.card.findUnique({where:{id}});
}

export async function deleteCard(id:number){
    return await prisma.card.delete({where:{id}});
}