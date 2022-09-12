import { Session } from "@prisma/client";

export type TypeSessionInsert = Omit <Session, "id">;