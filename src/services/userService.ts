import users from "../config/databse"; //provisional db
import { generateThrowErrorMessage } from "../utils/errorUtils";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createUser(email:string, password:string){
    //acessar banco de dados ...
    if (email===users[0].email) generateThrowErrorMessage("Conflict","This e-mail was already registered!");
    if(password.length<10) generateThrowErrorMessage("UnprocessableEntity","Password must contain at least 10 characteres!");
    const hashPassword:string = bcrypt.hashSync(password, 10);
   
    //enviar para o banco de dados
    users[0].password = hashPassword;
    return;
    
}

export async function singInUser(email:string, password:string){
    //acessar banco de dados ... users
    if(email!==users[0].email) generateThrowErrorMessage("Unauthorized", "Email or password invalid!");

    if(!bcrypt.compareSync(password,users[0].password)) generateThrowErrorMessage("Unauthorized","Email or password invalid");
    //id vindo do banco 
    const id=1;//pode ser melhor usar o id da sessão

    const token:string = jwt.sign({userId: id}, process.env.JWT_SECRET, {expiresIn:"1 day"});
    return token;
}