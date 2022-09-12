import { SafeNote } from "@prisma/client";

export type TypeSafeNoteInsert = Omit <SafeNote, "id"|"userId">;