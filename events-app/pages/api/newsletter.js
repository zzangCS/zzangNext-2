import { NEWSLETTER } from "@/const/db";
import { connectDatabase, insertDocument } from "@/helpers/db-util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || !email.includes("@") || !email.includes(".")) {
      res.status(422).json({ message: "유효하지 않은 이메일 입니다." });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Database에 연결을 실패하였습니다." });
      return;
    }

    try {
      await insertDocument(client, NEWSLETTER, { email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "데이터를 저장할 수 없습니다." });
      return;
    }

    res.status(201).json({ message: "Success!", email });
  }
}
