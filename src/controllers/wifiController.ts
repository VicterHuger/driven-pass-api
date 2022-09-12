import { Request, Response } from "express";
import * as wifiService from '../services/wifiService';
import { Wifi } from "@prisma/client";
import { TypeWifiInsert } from "../types/wifiType";

export async function createWifi(_req:Request, res:Response){
    const body:TypeWifiInsert = res.locals.body;
    const sessionId:number = res.locals.sessionId;

    const wifi = await wifiService.createWifi(body, sessionId);
    
    return res.status(201).send(wifi);
}

export async function listWifis(_req:Request, res:Response){
    const sessionId: number = res.locals.sessionId;

    const wifis:Wifi[] = await wifiService.listWifis(sessionId);

    return res.status(200).send(wifis);
}

export async function listWifiById(_req:Request, res:Response){
    const sessionId: number = res.locals.sessionId;
    const id:number = res.locals.id;

    const wifi:Wifi = await wifiService.listWifiById(sessionId,id);

    return res.status(200).send(wifi);
}

export async function deleteWifi(_req:Request, res:Response){
    const sessionId: number = res.locals.sessionId;
    const id:number = res.locals.id;

    await wifiService.deleteWifi(sessionId,id);

    return res.status(204).send('Wifi deleted');
}