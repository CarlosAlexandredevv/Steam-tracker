import { getAllGames } from "@/app/actions/user/get-all-games";
import { getUserById } from "@/app/actions/user/get-user-by-id";
import Image from "next/image";

interface DashboardProps {
  params: Promise<{
    steamId: string
  }>
}

export default async function Dashboard({ params }: DashboardProps) {
  const { steamId } = await params;
  const player = await getUserById(steamId)
  const games = await getAllGames(player?.steamid ?? "")

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{player?.personaname}</p>
      <p>{player?.steamid}</p>
      {games?.map((game) => (
        <div key={game.appid}>
          <Image src={game.banner ?? ""} alt={game.name} width={460} height={215} className="rounded-xl" />
          <Image src={game.horizontal ?? ""} alt={game.name} width={460} height={215} className="rounded-xl" />
          <Image src={game.vertical ?? ""} alt={game.name} width={460} height={215} className="rounded-xl" />
        </div>
      ))}
    </div>
  );
}