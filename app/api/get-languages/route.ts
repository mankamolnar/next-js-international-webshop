import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const languages = await prisma.language.findMany();
  
  return new Response(JSON.stringify(languages));
}
