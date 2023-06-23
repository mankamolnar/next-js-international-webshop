import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions : NextAuthOptions = {
  providers: [
    CredentialsProvider({
      
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials, req) {
        
        const { username, password } = credentials as any;

        const user : any = username == "test" && password == "test"
          ? { id: 1, name: "test", email: "test@test.com" }
          : null
  
        if (user) {
          return user

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
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };