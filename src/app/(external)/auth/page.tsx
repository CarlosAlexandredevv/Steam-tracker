"use client";

export default function Home() {
  function handleLogin() {
    window.location.href = "/api/auth/steam";
  }
  return (
    <main>
      <button onClick={handleLogin}>Login with Steam</button>
    </main>
  );
}