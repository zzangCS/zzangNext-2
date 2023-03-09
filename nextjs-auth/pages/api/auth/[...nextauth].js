import { verifyPassword } from "@/something/lib/auth";
import { connectToDatabase } from "@/something/lib/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error(" 해당하는 사용자가 없습니다.");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("비밀번호가 일치하지 않습니다.");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
