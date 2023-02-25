import fs from "fs";
import path from "path";

function buildEmailPath() {
  return path.join(process.cwd(), "data", "email.json");
}

function extractEmail(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return data;
}

export default function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || !email.includes("@") || !email.includes(".")) {
      res.status(422).json({ message: "유효하지 않은 이메일 입니다." });
      return;
    }

    const newEmail = { id: new Date().toISOString(), email: email };

    const filePath = buildEmailPath();
    const data = extractEmail(filePath);

    data.push(newEmail);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success!", email: newEmail });
  }
}
