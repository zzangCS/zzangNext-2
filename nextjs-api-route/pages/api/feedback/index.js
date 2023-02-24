import fs from "fs";
import path from "path";

/**
 * Get 요청만을 처리할 수 없으며 HTML 코드를 반환하지 않아도 됨!
 * 서버 측 코드 실행 가능
 *
 * 클라이언트에는 코드가 전달되지 않음***  (웹페이지 방문자들에게 보이지 않음)
 *
 * /api/feedback
 */

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return data;
}

export default function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const text = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: text,
    };

    // store that in a database or in a file
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data }); // 상태 코드 설정하고 응답을 json 형태로 변환
  }
}
