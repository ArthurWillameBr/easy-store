import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { prismaClient } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from 'next-auth/adapters';

//possivel problema com o prisma adapter
export const authOptions: AuthOptions = {
    adapter: <Adapter>PrismaAdapter(prismaClient),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
          session.user = { ...session.user, id: user.id } as {
            id: string;
            name: string;
            email: string;
          };
    
          return session;
        },
      },
    
}
