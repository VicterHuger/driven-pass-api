import * as sessionRepository from '../repositories/sessionRepository';
import { Session } from '@prisma/client';
import { generateThrowErrorMessage } from '../utils/errorUtils';

export async function getUserBySessionId(id:number) {
    const session:Session = await sessionRepository.getSessionById(id);
    if(!session) generateThrowErrorMessage("Unauthorized", "Invalid token");
    return session.userId;
}