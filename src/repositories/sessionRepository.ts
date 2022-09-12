import prisma from "../config/databse";
import { TypeSessionInsert } from "../types/sessionType";

export async function createSession(session:TypeSessionInsert){
    const result = await prisma.session.create({data:session});
    return result;
}

export async function deleteSessions(userId:number){
    await prisma.session.deleteMany({where:{userId} })
}
