import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { UserX } from 'lucide-react';

export function NotFoundPlayer() {
  return (
    <Empty className="border border-dashed border-white/10 max-w-xl ">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UserX className="w-10 h-10 text-destructive" />
        </EmptyMedia>
        <EmptyTitle>Jogador não encontrado</EmptyTitle>
        <EmptyDescription>
          Não conseguimos encontrar um jogador com esse Steam ID. Verifique se o
          ID está correto ou tente buscar novamente.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
