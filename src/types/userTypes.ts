import { User } from "@prisma/client";

export type TypeUserInsert = Omit <User, "id">;