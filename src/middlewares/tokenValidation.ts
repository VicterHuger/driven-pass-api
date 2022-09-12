import { Request, Response, NextFunction } from 'express';
import { stripHtml } from 'string-strip-html';
import { generateThrowErrorMessage } from '../utils/errorUtils';
import jwt from 'jsonwebtoken'

interface ICustomPayload extends jwt.JwtPayload{
    sessionId:string
}

export function tokenValidation(req:Request, res:Response, next:NextFunction){
    const {authorization} : {authorization?:string} = req.headers;
    if(!authorization) return res.status(400).send("Headers authorization is missing!");
    const sanitizedHeaders:string = stripHtml(authorization).result.trim();
    const token:string|void = sanitizedHeaders?.replace("Bearer ", "") ?? generateThrowErrorMessage("Unauthorized", "Invalid token");
    if(!token || token===sanitizedHeaders) generateThrowErrorMessage("Unauthorized", "Invalid token");
    jwt.verify(<string>token, process.env.TOKEN_SECRET_KEY, (err:jwt.VerifyErrors, decoded:ICustomPayload)=>{
        
        if(err) {
            console.log(err);
            return res.status(401).send('Invalid token');
        }
        
        if(isNaN(Number(decoded.sessionId)) ) return res.send(401).send('Invalid token');
        res.locals.sessionId = Number(decoded.sessionId);
        next();
    })
    
}