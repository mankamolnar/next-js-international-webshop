import Image from 'next/image'
import { Inter } from 'next/font/google'
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();
const inter = Inter({ subsets: ['latin'] });

interface LanguageProps {
  params : LanguageParams,
  searchParams : Object
}

interface LanguageParams {
  lang: string
}

// csinálni saját util class-t
export default async function Home({params} : LanguageProps) {
  //console.log(params);

  return (
    <div>protected</div>
  )
}
