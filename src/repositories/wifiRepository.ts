import prisma from "../config/databse";
import { TypeWifiInsert } from "../types/wifiType";

export async function getWifiByUserAndTitle(userId:number, title:string) {
    return await prisma.wifi.findFirst({where:{userId, title}});
}

export async function createWifi(wifi:TypeWifiInsert, userId:number){
    return await prisma.wifi.create({data:{...wifi,userId }});
}

export async function getWifiByUser(userId:number){
    return await prisma.wifi.findMany({where:{userId}});
}

export async function getWifiById(id:number){
    return await prisma.wifi.findUnique({where:{id}});
}

// export async function deleteWifi(id:number){
//     return await prisma.wifi.delete({where:{id}});
// }