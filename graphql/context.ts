import { PrismaClient } from "@prisma/client";
import type { IronSessionData } from "iron-session";
import { prisma } from "../lib/prisma";

export type Context = {
  prisma: PrismaClient;
  user: IronSessionData | undefined;
};

export async function createContext({ req, res }: any): Promise<Context> {
  return {
    prisma,
    user: req.session?.user,
  };
}
