import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./db";
import { Adapter, AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.name = user.name;
      session.user.image = user.image;
      session.user.createdAt = user.createdAt;
      session.user.updatedAt = user.updatedAt;
      session.user.bio = user.bio;
      session.user.isAdmin = user.isAdmin;

      return session;
    },
  },
};
