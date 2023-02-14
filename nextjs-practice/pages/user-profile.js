/**
 * 사전 렌더링 불가
 * 어떤 user가 사용하는지 알아야 하기 때문
 *
 */
export default function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

/**
 * 요청이 들어올 때마다 호출
 *
 * 배포된 서버와 개발 서버에서만 실행됨
 * but!! 사전에 생성된 정적 함수는 아님!!!
 */

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  // getStaticProps와 다른 점!!
  // 요청, 응답 객체에 접근할 수 있음!
  // 함수가 실행되는 시점, 타이밍이 다름

  return {
    props: {
      username: "Max",
    },
  };
}
