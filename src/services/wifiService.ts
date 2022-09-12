import { TypeWifiInsert } from "../types/wifiType";
import { Wifi } from "@prisma/client";
import * as sessionService from './sessionService';
import * as wifiRepository from '../repositories/wifiRepository';
import { generateThrowErrorMessage } from "../utils/errorUtils";
import {cryptrPasswords, descryptrPasswords, descryptItemOfEncryptArray} from '../utils/generalFunctions';


export async function createWifi(body:TypeWifiInsert, sessionId:number){
    const userId:number = await sessionService.getUserBySessionId(sessionId);
    body.networkPassword = cryptrPasswords(body.networkPassword);
    const wifiCreated = await wifiRepository.createWifi(body, userId);
    if(!wifiCreated) generateThrowErrorMessage('InternalServerError', 'Something went wrong when creating a new wifi');
    return {id:wifiCreated.id, title:wifiCreated.title, networkName:wifiCreated.networkName};
}

export async function listWifis(sessionId:number){
    const userId:number = await sessionService.getUserBySessionId(sessionId);
    const wifisByUser = await wifiRepository.getWifiByUser(userId);
    if(!wifisByUser) return [];
    
    return descryptItemOfEncryptArray<Wifi>(wifisByUser);
}

export async function listWifiById(sessionId:number, id:number){
    const userId:number = await sessionService.getUserBySessionId(sessionId);
    const wifi:Wifi = await wifiRepository.getWifiById(id);
    if(!wifi) generateThrowErrorMessage("NotFound", "There is no safe note with this id");
    if(wifi.userId !== userId) generateThrowErrorMessage("Unauthorized", "This wifi do not belongs to you!");
    wifi.networkPassword =descryptrPasswords(wifi.networkPassword);
    return wifi;
}

// export async function deletewifi(sessionId:number, id:number){
//     const userId:number = await sessionService.getUserBySessionId(sessionId);
//     const wifi = await wifiRepository.getwifiById(id);
//     if(!wifi) generateThrowErrorMessage("NotFound", "There is no safe note with this id");
//     if(wifi.userId !== userId) generateThrowErrorMessage("Unauthorized", "This safe note do not belongs to you!");
//     const wifiDeleted = await wifiRepository.deletewifi(id);
//     if(!wifiDeleted) generateThrowErrorMessage("InternalServerError", "Something went wrong and it was not possible to delete this safe note");
//     return;
// }