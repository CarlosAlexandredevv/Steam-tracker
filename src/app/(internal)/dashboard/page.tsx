import { getMe } from "@/app/actions/user/get-me";
import { getAllGames } from "@/app/actions/user/get-all-games";
import Image from "next/image";

export default async function Dashboard() {
  const user = await getMe();
  const games = (await getAllGames() ) ?? [];
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user?.name}</p>
      <p>{user?.steamId}</p>
      { games.map((game) => (
        <div key={game.appid}>
          <Image src={game.banner ?? ""} alt={game.name} width={460} height={215} className="rounded-xl" />
          <Image src={game.horizontal ?? ""} alt={game.name} width={460} height={215} className="rounded-xl" />
          <Image src={game.vertical ?? ""} alt={game.name} width={460} height={215} className="rounded-xl" />
        </div>
      ))}
    </div>
  );
}