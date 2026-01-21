import { getMe } from "@/app/actions/user/get-me";

export default async function Dashboard() {
  const user = await getMe();
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user?.name}</p>
      <p>{user?.steamId}</p>
      
    </div>
  );
}