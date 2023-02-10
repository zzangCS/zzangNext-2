import { useRouter } from "next/router";

export default function ClientProjectsPage() {
  const router = useRouter();

  const loadProject = () => {
    // load data...
    // replace : 현재 페이지를 다음 페이지로 대체 (뒤로가기 X)
    // router.push("/clients/max/projecta");
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: "max", clientprojectid: "projecta" },
    });
  };
  return (
    <div>
      <h1>The Projects of a Given Client</h1>
      <button onClick={loadProject}>Load Project A</button>
    </div>
  );
}
