import Cryptr from 'cryptr';

interface IArrayEncrypted {
    password:string
}

export function cryptrPasswords(password:string){
    const cryptr: Cryptr = new Cryptr(process.env.CRYPTR_KEY);
    return cryptr.encrypt(password);
}

export function descryptrPasswords(password:string){
    const cryptr = new Cryptr(process.env.CRYPTR_KEY);
    return cryptr.decrypt(password);
}

export function descryptItemOfEncryptArray <T extends IArrayEncrypted> (array:T[]){
    const newArray = [...array];
    newArray.forEach(item =>{
        item.password = descryptrPasswords(item.password)
    } )
    return newArray;
}