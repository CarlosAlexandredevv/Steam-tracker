'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  function handleLogin() {
    window.location.href = '/api/auth/steam';
  }

  return (
    <main>
      <Button
        variant={'default'}
        onClick={() => router.push('76561198358463565/overview')}
      >
        Login with Steam
      </Button>
      <Button variant={'secondary'} onClick={handleLogin}>
        Login with Steam
      </Button>
      <Button variant={'destructive'} onClick={handleLogin}>
        Login with Steam
      </Button>
      <Button variant={'outline'} onClick={handleLogin}>
        Login with Steam
      </Button>
      <Button variant={'ghost'} onClick={handleLogin}>
        Login with Steam
      </Button>
    </main>
  );
}
