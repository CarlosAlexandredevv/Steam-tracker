import { Header } from '@/components/header/header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="flex flex-1 flex-col overflow-x-hidden max-w-full">
        {children}
      </div>
    </main>
  );
}
