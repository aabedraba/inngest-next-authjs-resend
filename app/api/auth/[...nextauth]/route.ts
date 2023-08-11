import { inngest } from "@/app/lib/inngest";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";

export const authOptions = {
  secret: "123",
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      if (!user.email) {
        throw new Error("No email found");
      }

      const userdb = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (!userdb) {
        await inngest.send({
          name: "user/registered",
          data: {
            name: user.name,
            email: user.email,
          },
        });
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
