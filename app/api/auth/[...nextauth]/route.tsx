import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { usePrisma } from '../../../../components/custom_hooks/usePrisma';
import bcrypt from "bcryptjs-react";
import isaac from "isaac";

bcrypt.setRandomFallback((len : number) => {
  const buf = new Uint8Array(len);
  const result : number[] = [];
  buf.forEach(() => result.push(Math.floor(isaac.random() * 256)));
  
  return result;
});


export const authOptions : NextAuthOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        
        const { username, password } = credentials as any;

        const [ prismaClient ] = usePrisma();

        const users = await prismaClient.user.findMany({
          where: {
            AND: [
              {
                username: username
              },
              {
                password: bcrypt.hashSync(password, process.env.BCRYPT_SALT)
              }
            ]
          }
        });
  
        if (users.length > 0) {
          return users[0]

        } else {
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/login"
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role
      return token;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };