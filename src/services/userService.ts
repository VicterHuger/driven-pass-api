import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository';
import * as sessionRepository from '../repositories/sessionRepository';
import { generateThrowErrorMessage } from "../utils/errorUtils";
import { User } from '@prisma/client';
import { Session } from '@prisma/client';

export async function createUser(email:string, password:string){
    const user:User|null = await userRepository.findUserByEmail(email);
    if (!!user && email===user.email) generateThrowErrorMessage("Conflict","This e-mail was already registered!");
    if(password.length<10) generateThrowErrorMessage("UnprocessableEntity","Password must contain at least 10 characteres!");
    const hashPassword:string = bcrypt.hashSync(password, 10);
    
    const result:User = await userRepository.createUser({email, password:hashPassword});
    console.log(result);

    return;
    
}

export async function singInUser(email:string, password:string){
    const user:User|null = await userRepository.findUserByEmail(email);
    if(user===null || email!==user.email) generateThrowErrorMessage("Unauthorized", "Email or password invalid!");

    if(!bcrypt.compareSync(password,user.password)) generateThrowErrorMessage("Unauthorized","Email or password invalid");

    await sessionRepository.deleteSessions(user.id);

    const session:Session= await sessionRepository.createSession({userId:user.id});

    const token:string = jwt.sign({sessionId: session.id}, process.env.TOKEN_SECRET_KEY, {expiresIn:process.env.TOKEN_EXPIRES_IN});
    
    return token;
}