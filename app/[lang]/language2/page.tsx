import Image from 'next/image'
import { Inter } from 'next/font/google'
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import {  FunctionComponent  } from "react";

const prisma = new PrismaClient();
const inter = Inter({ subsets: ['latin'] });

interface LanguageProps {
  params : LanguageParams,
  searchParams : Object
}

interface LanguageParams {
  lang: string
}

export default async function Home({params} : LanguageProps) {
  console.log(params);

  return (
    <main>
        hi<br />
        <Link href="/fr">Franciázzunk</Link>
        <Link href="/language" locale="fr">Inglisül</Link>
        <br />
        <Link href={"/"+params.lang+"/language"}>Franciázzunk</Link>

        {/* {
          posts.map((post, index) => (
            <tr key={"post" + index}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.owner}</td>
            </tr>
          ))
        } */}
    </main>
  )
}
