// Node.js 파일시스템 모듈
// 브라우저 측 JS가 파일 시스템에 접근 X => 클라이언트 사이드에서 fs 모듈 작업 할 수 없음
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

export default function HomePage({ products }) {
  return (
    <div>
      <h1>Home Page</h1>
      <h2>Data Fetch</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>

      <h2>Routes</h2>

      <ul>
        <li>
          <Link href="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link href="/clients">Clients</Link>
        </li>
      </ul>
    </div>
  );
}

// 클라이언트 사이드에 제공되는 코드가 아니므로 개발자 툴의 sources탭의 js 코드 파일일에서 보이지 않음
// 클라이언트 사이드에서 실행 X == 서버측 작업을 수행할 수 있음
// => 사용자가 볼 수 없는 중요 정보 사용 가능
// 브라우저에서 작동하지 않는 코드 실행 가능

// Next js가 사전렌더링 할 때만 사용되는 함수 (build할 때 실행됨)
export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10, //10초
  };
}
