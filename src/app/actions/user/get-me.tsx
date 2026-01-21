import { decodeToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { User } from "@/model/user";

export async function getMe(): Promise<User | null> {
 
  const decoded = await decodeToken();
 
  const user = await prisma.user.findUnique({
    where: {
      id: decoded.userId as string,
    },
  });

  if (!user) {
    return null;
  }
  
  return {
    id: user.id,
    steamId: user.steamId,
    name: user.name,
    image: user.image ?? "",
    createdAt: user.createdAt,
  };
}