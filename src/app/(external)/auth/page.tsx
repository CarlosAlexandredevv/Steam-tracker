"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  function handleLogin() {
    window.location.href = "/api/auth/steam";
  }
  return (
    <main>
      <Button variant={"default"} onClick={handleLogin}>Login with Steam</Button>
      <Button variant={"secondary"} onClick={handleLogin}>Login with Steam</Button>
      <Button variant={"destructive"} onClick={handleLogin}>Login with Steam</Button>
      <Button variant={"outline"} onClick={handleLogin}>Login with Steam</Button>
      <Button variant={"ghost"} onClick={handleLogin}>Login with Steam</Button>
    </main>
  );
}