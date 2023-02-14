export default function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: "userid-" + userId,
    },
  };
}

/**
 * getStaticPaths 함수 없이도 잘 작동하는 이유
 *
 * 서버에서만 작동하기 때문에 사전 생성할 페이지가 없어 사전 생성할 대상 또한 없기 때문
 * => getStaticPaths 정보 필요 XX
 */
