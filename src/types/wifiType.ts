import { Wifi } from "@prisma/client";

export type TypeWifiInsert = Omit<Wifi, "id"|"userId">;
