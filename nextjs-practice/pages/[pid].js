import fs from "fs/promises";
import path from "path";
import { Fragment } from "react";

export default function ProductDetailPage({ loadedProduct }) {
  // if (!loadedProduct) {
  //   return <p> Loading...</p>;
  // }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);
  return {
    props: {
      loadedProduct: product,
    },
  };
}

/**
 * params : NextJS가 제공하는 context 객체 property
 * => key - value 로 이루어짐
 * =>key 식별자 : 동적 경로 세그먼트 - 여기서는 pid!!
 *
 * useRouter()로 추출한 매개변수와의 차이점
 * useRouter : 컴포넌트 내부에서 사용 가능 (브라우저에서만 이루어짐)
 * 사전 렌더링 : getStaticProps 함수가 컴포넌트 함수보다 먼저 실행(서버에서 이루어짐)
 *
 * 동적 경로 ([id])의 경우 NextJS가 몇 개의 페이지를 사전에 생성해야 하는지 알지 못함
 * => 페이지의 여러 인스턴스를 NextJS에 알려줘야함
 * => 비동기 함수 getStaticPaths() 사용
 *
 */

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: false,
  };
}

/** getStaticPaths()
 * wait 키워드 사용 가능
 * page 컴포넌트 파일에만 추가할 수 있음
 * export 해야함
 *
 * 목표 : 동적 페이지의 어떤 인스턴스를 생성할지 NextJS에 알리는 것
 *
 * key
 * 1. params : 여러 key-value 쌍이 있는 객체를 가질 수 있음
 * => params의 key : 페이지를 연결하는 각 동적 세그먼트 식별자
 * => NextJS가 각 객체(params)에 대해 getStaticProps()를 호출함
 * 2. fallback : boolean
 * => 함수 안에서 해당 id(key) 추출하기 위해 추가해야함
 */

/** fallback
 * => 사전 생성되어야 할 페이지가 많은 경우 유용
 * => true : 일부 페이지만 사전 렌더링 가능
 * => 매개변수 값이 없더라도 페이지 방문 시 로딩되는 값이 유효하도록 요청 가능
 * =>> 사전에 생성되는 것이 아니라 요청이 서버에 도달하는 순간 생성됨
 *
 * 문제
 * => 링크를 클릭하지 않고 직접 url을 입력해서 접근하는 경우 에러 발생
 * =>> 컴포넌트에서 폴백 상태를 반환할 수 있게 해주어야 사용 가능!
 *
 * if 로 존재를 확인해서 없는 경우 fallback 컨텐츠 반환
 * 존재하는 경우 일반 컴포넌트 반환
 *
 * 'blocking'으로 설정 : 컴포넌트에서 폴백 확인할 필요 XXX
 * => 페이지가 서비스 제공하기 전에 서버에 완전히 사전 생성 되도록 기다림
 * =>> 응답 시간 길어짐 - 단점
 */
