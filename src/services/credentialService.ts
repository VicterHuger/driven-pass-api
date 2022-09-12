import { TypeCredentialInsert } from "../types/credentialType";
import { Credential } from "@prisma/client";
import * as sessionService from './sessionService';
import * as credentialRepository from '../repositories/credentialRepository';
import { generateThrowErrorMessage } from "../utils/errorUtils";
import { cryptrPasswords } from "../utils/generalFunctions";


export async function createCredencial(body:TypeCredentialInsert, sessionId:number){
    const userId:number = await sessionService.getUserBySessionId(sessionId);
    const credentialsByTitle:Credential[] = await credentialRepository.getCredentialByUserAndTitle(userId, body.title);
    if(credentialsByTitle && credentialsByTitle.length>0) generateThrowErrorMessage('Conflict', 'There is already a credential with this title created by you');
    const credentialsByUrl:Credential[] = await credentialRepository.getCredentialByUserAndUrl(userId, body.url);
    const maximunCredentialsByURL = 2;
    if(credentialsByUrl.length>=maximunCredentialsByURL) generateThrowErrorMessage('Conflict', `You have reached the maximum credentials by url (${maximunCredentialsByURL}) `);
    body.password = cryptrPasswords(body.password);
    const credentialCreated = await credentialRepository.createCredencial(body, userId);
    if(!credentialCreated) generateThrowErrorMessage('InternalServerError', 'Something went wrong when creating a new credential');
    return {id:credentialCreated.id, title:credentialCreated.title, userName:credentialCreated.userName};
}

