import { useRouter } from "next/router";

export default function BlogPostsPage() {
  const router = useRouter();

  console.log(router.query);

  // catch all 라우트
  // 동시에 여러 경로가 필요한 경우 (blog/2022/01/02)

  return (
    <div>
      <h1>The Blog Posts</h1>
    </div>
  );
}
