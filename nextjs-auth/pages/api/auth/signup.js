import { hashPassword } from "@/something/lib/auth";
import { connectToDatabase } from "@/something/lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message: "Invalid input - 비밀번호는 7자리 이상이어야 합니다.",
      });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      res.status(422).json({ message: "이미 존재하는 이메일 입니다." });
      client.close();
      return;
    }

    const hashedPAssword = await hashPassword(password);

    const result = await db
      .collection("users")
      .insertOne({ email, password: hashedPAssword });

    res.status(201).json({ message: "계정이 생성되었습니다." });

    client.close();
  }
}
