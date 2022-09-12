import { TypeCredentialInsert } from "../types/credentialType";
import { Credential } from "@prisma/client";
import * as sessionService from './sessionService';
import * as credentialRepository from '../repositories/credentialRepository';
import { generateThrowErrorMessage } from "../utils/errorUtils";
import { cryptrPasswords, descryptItemOfEncryptArray, descryptrPasswords } from "../utils/generalFunctions";


export async function createCredencial(body:TypeCredentialInsert, sessionId:number){
    const userId:number = await sessionService.getUserBySessionId(sessionId);
    const credentialsByTitle = await credentialRepository.getCredentialByUserAndTitle(userId, body.title);
    if(credentialsByTitle) generateThrowErrorMessage('Conflict', 'There is already a credential with this title created by you');
    const credentialsByUrl:Credential[] = await credentialRepository.getCredentialByUserAndUrl(userId, body.url);
    const maximunCredentialsByURL = 2;
    if(credentialsByUrl.length>=maximunCredentialsByURL) generateThrowErrorMessage('Conflict', `You have reached the maximum credentials by url (${maximunCredentialsByURL}) `);
    body.password = cryptrPasswords(body.password);
    const credentialCreated = await credentialRepository.createCredencial(body, userId);
    if(!credentialCreated) generateThrowErrorMessage('InternalServerError', 'Something went wrong when creating a new credential');
    return {id:credentialCreated.id, title:credentialCreated.title, userName:credentialCreated.userName};
}

export async function listCredentials(sessionId:number){
    const userId:number = await sessionService.getUserBySessionId(sessionId);
    const credentialsByUser = await credentialRepository.getCredentialsByUser(userId);
    if(!credentialsByUser) return [];
    return descryptItemOfEncryptArray<Credential>(credentialsByUser);
}

export async function listCredentialById(sessionId:number, id:number){
    const userId:number = await sessionService.getUserBySessionId(sessionId);
    const credential = await credentialRepository.getCredentialById(id);
    if(!credential) generateThrowErrorMessage("NotFound", "There is no credential with this id");
    if(credential.userId !== userId) generateThrowErrorMessage("Unauthorized", "This credential do not belongs to you!");
    credential.password = descryptrPasswords(credential.password);
    return credential;
}

export async function deleteCredential(sessionId:number, id:number){
    const userId:number = await sessionService.getUserBySessionId(sessionId);
    const credential = await credentialRepository.getCredentialById(id);
    if(!credential) generateThrowErrorMessage("NotFound", "There is no credential with this id");
    if(credential.userId !== userId) generateThrowErrorMessage("Unauthorized", "This credential do not belongs to you!");
    const credentialDeleted = await credentialRepository.deleteCredential(id);
    if(!credentialDeleted) generateThrowErrorMessage("InternalServerError", "Something went wrong and it was not possible to delete this credential");
    return;
}