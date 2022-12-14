import prisma from "../config/databse";
import { TypeSafeNoteInsert } from "../types/safeNoteType";

export async function getSafeNoteByUserAndTitle(userId:number, title:string) {
    return await prisma.safeNote.findFirst({where:{userId, title}});
}

export async function createSafeNote(safeNote:TypeSafeNoteInsert, userId:number){
    return await prisma.safeNote.create({data:{...safeNote,userId }});
}

export async function getSafeNoteByUser(userId:number){
    return await prisma.safeNote.findMany({where:{userId}});
}

export async function getSafeNoteById(id:number){
    return await prisma.safeNote.findUnique({where:{id}});
}

export async function deleteSafeNote(id:number){
    return await prisma.safeNote.delete({where:{id}});
}