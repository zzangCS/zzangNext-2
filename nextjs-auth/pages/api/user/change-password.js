import { hashPassword, verifyPassword } from "@/something/lib/auth";
import { connectToDatabase } from "@/something/lib/db";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "인증에 실패하였습니다." });
    return;
  }

  const email = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "유저를 찾을 수 없습니다." });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "비밀번호가 일치하지 않습니다." });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: email },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: "비밀번호가 변경되었습니다." });
}
