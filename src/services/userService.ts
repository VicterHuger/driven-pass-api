import users from "../config/databse"; //provisional db
import { generateThrowErrorMessage } from "../utils/errorUtils";
import bcrypt from 'bcrypt';

export async function createUser(email:string, password:string){
    //acessar banco de dados ...
    if (email===users[0].email) generateThrowErrorMessage("Conflict","This e-mail was already registered!");
    if(password.length<10) generateThrowErrorMessage("UnprocessableEntity","Password must contain at least 10 characteres!");
    bcrypt.hash(password, 10, function(err:Error, hash:string) {
        // Store hash in your password DB.
        console.log(hash);
        if(err) {
            console.log(err);
            generateThrowErrorMessage("InternalServerError","It was not possible to encrypt the password given");
        };
    });
    return;
    
}