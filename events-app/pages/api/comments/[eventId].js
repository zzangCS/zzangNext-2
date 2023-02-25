import { COMMENTS } from "@/const/db";
import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "@/helpers/db-util";

export default async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Database에 연결을 실패하였습니다." });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !email.includes(".") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "유효하지 않은 데이터 입니다." });
      return;
    }

    const newComment = { email, name, text, eventId };

    let result;
    try {
      result = await insertDocument(client, COMMENTS, newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Success!", comments: newComment });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "댓글을 등록할 수 없습니다." });
    }
  }

  let documents;
  if (req.method === "GET") {
    try {
      documents = await getAllDocuments(client, COMMENTS, { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "댓글을 불러올 수 없습니다." });
    }
  }
}
