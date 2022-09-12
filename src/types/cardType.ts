import { Card } from "@prisma/client";

export type TypeCardInsert = Omit<Card,"id"|"userId">;