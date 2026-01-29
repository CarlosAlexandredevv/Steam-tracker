import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { ChartColumnIncreasing } from 'lucide-react';

export function NotFoundStatistics() {
  return (
    <Empty className="border border-dashed border-white/10 w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ChartColumnIncreasing className="w-10 h-10 text-destructive" />
        </EmptyMedia>
        <EmptyTitle>Nenhuma estatística disponível</EmptyTitle>
        <EmptyDescription>
          Não há dados de estatísticas do jogador para este jogo. O jogador pode
          não possuir o título na biblioteca ou as informações ainda não foram
          carregadas.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
