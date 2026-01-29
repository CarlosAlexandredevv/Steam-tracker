import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Trophy } from 'lucide-react';

export function NotFoundAchievements() {
  return (
    <Empty className="border border-dashed border-white/10 w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Trophy className="w-10 h-10 text-destructive" />
        </EmptyMedia>
        <EmptyTitle>Nenhuma conquista encontrada</EmptyTitle>
        <EmptyDescription>
          Este jogo não possui conquistas disponíveis ou as informações de
          conquistas não estão acessíveis no momento.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
