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
    <main>
        hi<br />
        <Link href="/fr/shdafkjasdh">Franciázzunk</Link>
        <Link href="/en">Inglisül</Link>
        <br />
        <Link href={"/"+params.lang+"/language"}>Franciázzunk</Link>
        <Link href={"/"+params.lang+"/language"}>Magyarozzunk</Link>
        <Link href={"/fr/language"}>Magyarozzunk</Link>

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
