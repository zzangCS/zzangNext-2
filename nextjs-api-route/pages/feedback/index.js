import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback/index";

export default function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  const loadFeedback = (id) => {
    fetch(`/api/feedback/${id}`)
      .then((res) => res.json())
      .then((data) => setFeedbackData(data.feedback)); // /api/some-feedback-id
  };

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}

      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text} {/* bind : 함수를 미리 구성하게 하는 역할 (실행 X) */}
            <button onClick={loadFeedback.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

/**
 * 자체 API를 사용하는 경우 getStaticProps(), getServerSideProps()에 fetch를 사용하면 안됨
 * fetch 대산 Node.js 논리 사용
 *
 * 외부 API(Firebase 등)은 괜찮음!
 */

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}
