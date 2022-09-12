import * as sessionRepository from '../repositories/sessionRepository';
import { Session } from '@prisma/client';

export async function getUserBySessionId(id:number) {
    const session:Session = await sessionRepository.getSessionById(id);
    return session.userId;
}