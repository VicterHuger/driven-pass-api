import Cryptr from 'cryptr';

export function cryptrPasswords(password:string){
    const cryptr: Cryptr = new Cryptr(process.env.CRYPTR_KEY);
    return cryptr.encrypt(password);
}



