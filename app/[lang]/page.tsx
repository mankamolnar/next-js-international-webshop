import Image from 'next/image'
import { Inter } from 'next/font/google'
import { PrismaClient } from '@prisma/client';
import Link from "next/link";

const prisma = new PrismaClient();
const inter = Inter({ subsets: ['latin'] })

export default async function Home(props : any) {
  // const posts = await prisma.post.findMany();


  return (<div>page</div>)
}
