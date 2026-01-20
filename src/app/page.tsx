"use client";

import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();
  return (
    <main>
      <button onClick={() => authClient.signIn.social({ provider: "github" })}>Login with GitHub</button>
      {session && <div>Welcome {session.user?.name}</div>}
    </main>
  );
}
