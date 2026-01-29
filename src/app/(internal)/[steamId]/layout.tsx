import { Header } from '@/components/header/header';
import { SteamIdRouteParams } from '@/types/route-params';

interface LayoutProps {
  children: React.ReactNode;
  params: SteamIdRouteParams;
}

export default async function Layout({ children, params }: LayoutProps) {
  return (
    <main className="min-h-screen">
      <Header params={params} />
      <div className="flex flex-1 flex-col overflow-x-hidden max-w-full">
        {children}
      </div>
    </main>
  );
}
