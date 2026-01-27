import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Gamepad2 } from 'lucide-react';

export function NotFoundGames() {
  return (
    <Empty className="border border-dashed border-white/10 max-w-xl">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Gamepad2 className="w-10 h-10 text-destructive" />
        </EmptyMedia>
        <EmptyTitle>Nenhum jogo encontrado</EmptyTitle>
        <EmptyDescription>
          Este jogador não possui jogos na biblioteca ou a biblioteca está
          privada. Verifique as configurações de privacidade do perfil Steam.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
