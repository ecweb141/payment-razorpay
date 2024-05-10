import bcrypt from "bcryptjs";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/data/db/prismadb";
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_API_KEY as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_API_KEY as string,
      clientSecret: process.env.GOOGLE_SECRETE as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        userName: { label: "userName", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials, "this are credentials");
        if (!credentials?.userName || !credentials?.password) {
          throw new Error("Invalid credentials at first data check");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.userName,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials at login");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials at password check");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
