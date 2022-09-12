import { Credential } from "@prisma/client";

export type TypeCredentialInsert = Omit<Credential,"id"|"userId">;