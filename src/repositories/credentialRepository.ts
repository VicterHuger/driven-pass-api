import prisma from "../config/databse";
import { TypeCredentialInsert } from "../types/credentialType";

export async function getCredentialByUserAndTitle(userId:number, title:string) {
    return await prisma.credential.findFirst({where:{userId, title}});
}

export async function getCredentialByUserAndUrl(userId:number, url:string){
    return await prisma.credential.findMany({where:{userId, url}})
}

export async function createCredencial(credential:TypeCredentialInsert, userId:number){
    return await prisma.credential.create({data:{...credential,userId }});
}

export async function getCredentialsByUser(userId:number){
    return await prisma.credential.findMany({where:{userId}});
}

export async function getCredentialById(id:number){
    return await prisma.credential.findUnique({where:{id}});
}