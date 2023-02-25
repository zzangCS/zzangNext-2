import fs from "fs";
import path from "path";

export function buildCommentPath() {
  return path.join(process.cwd(), "data", "comments.json");
}

export function extractComment(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return data;
}

export default function handler(req, res) {
  const eventId = req.query.eventId;

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

    const newComment = { id: new Date().toISOString(), email, name, text };

    const filePath = buildCommentPath();
    const data = extractComment(filePath);
    data.push(newComment);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success!", comments: newComment });
  }
  if (req.method === "GET") {
    const filePath = buildCommentPath();
    const commentsData = extractComment(filePath);
    res.status(200).json({ comments: commentsData });
  }
}
