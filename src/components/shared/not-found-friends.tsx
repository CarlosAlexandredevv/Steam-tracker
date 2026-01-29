import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Users } from 'lucide-react';

export function NotFoundFriends() {
  return (
    <Empty className="border border-dashed border-white/10 max-w-xl">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Users className="w-10 h-10 text-destructive" />
        </EmptyMedia>
        <EmptyTitle>Nenhum amigo encontrado</EmptyTitle>
        <EmptyDescription>
          Este jogador não possui amigos públicos ou a lista de amigos está
          privada. Verifique as configurações de privacidade do perfil Steam.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
