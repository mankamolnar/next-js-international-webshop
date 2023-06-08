import { PrismaClient } from '@prisma/client';

class PrismaBuilder {
  static prismaClient : PrismaClient;

  static getInstance() {
    if (!PrismaBuilder.prismaClient) {
      PrismaBuilder.prismaClient = new PrismaClient();
    }

    return PrismaBuilder.prismaClient;
  }
}

export const usePrisma = () => {
  return [ PrismaBuilder.getInstance() ];
}