# Steam Track

Aplicação web para **analisar perfis Steam**, visualizar bibliotecas de jogos, comparar conquistas com amigos e explorar estatísticas da sua conta em uma interface moderna e responsiva.

---

## Funcionalidades

### Página inicial (Landing)

- **Busca por perfil**: informe o **Steam ID** ou a **URL do perfil** (ex: `steamcommunity.com/profiles/76561198...` ou `steamcommunity.com/id/nickname`) e acesse o overview do jogador.
- **Hero**: título, descrição e campo de busca em destaque.
- **Seção de recursos**: overview detalhado, biblioteca inteligente e modo Versus.
- **Preview, FAQ e CTA**: suporte à conversão e dúvidas frequentes.
- **Footer**: links e informações do projeto.

### Área do perfil (por Steam ID)

Todas as páginas abaixo usam o **Steam ID** na URL: `/{steamId}/...`

#### Overview (`/{steamId}/overview`)

- **Cabeçalho do jogador**:
  - Avatar, nome e link para o perfil na Steam.
  - Badges: quantidade de jogos, horas totais, anos de conta, horas recentes, “Mestre em [jogo favorito]” (jogo com mais horas).
  - Top 5 amigos com avatar e link para o perfil de cada um; contador de amigos restantes.
- **Seção de jogos**: carrossel/jogos em destaque com **busca em tempo real** (parâmetro `q`).

#### Biblioteca (`/{steamId}/library`)

- Listagem em **grid** de todos os jogos da biblioteca.
- **Busca/filtro** por nome do jogo (parâmetro `q`).
- Cards de jogo com link para a página de detalhes do jogo.

#### Amigos (`/{steamId}/friends`)

- Lista de **amigos Steam** em grid.
- **Filtros**:
  - Por nome (parâmetro `q`).
  - Por jogo (parâmetro `gameId`): exibe apenas amigos que possuem/jogam aquele jogo.

#### Detalhes do jogo (`/{steamId}/library/[gameId]`)

- **Cabeçalho do jogo**: capa, nome, descrição curta, amigos que jogam e link “Jogar agora”.
- **Sobre o jogo**: descrição completa.
- **Galeria de imagens**.
- **Jogar agora**: atalhos/links relacionados a jogar.
- **Requisitos do sistema** (quando disponíveis na API).
- **Estatísticas do jogador**: desempenho e conquistas do usuário naquele jogo.
- **Estatísticas globais**: dados globais do jogo (ex.: jogadores online, percentuais de conquistas).
- **Conquistas do jogador**: lista de conquistas com progresso.

#### Modo Versus (`/{steamId}/library/[gameId]/versus/[playerId]`)

- Página dedicada para comparar **conquistas** entre dois jogadores no mesmo jogo.
- Exibição lado a lado das conquistas de cada um (avatares e nomes no cabeçalho).
- Útil para ver quem está mais próximo de “completar” o jogo.
- Desacoplada da página do jogo para evitar re-renders e carregar apenas o necessário.

### Navegação e header interno

- **Header** com logo, links (Overview, Biblioteca, Amigos) e área do usuário (busca de jogador, troca de perfil, etc.).
- Navegação ativa destacada por rota.

### SEO e metadados

- **Metadata** por página: título, descrição, Open Graph e Twitter Cards.
- **Sitemap** e **robots** configurados para indexação.
- **Canonical** e **locale** (pt_BR) onde aplicável.

### Dados e API

- Integração com **Steam Web API** (GetPlayerSummaries, biblioteca, amigos, conquistas, estatísticas, detalhes do jogo, etc.).
- **Cache/revalidação** configurável por tipo de dado (jogador, jogos, amigos, conquistas, estatísticas).
- **Server Actions** para buscar jogador, jogos, amigos, conquistas, estatísticas globais e dados por jogo.

---

## Stack tecnológica

| Área        | Tecnologia                          |
|------------|--------------------------------------|
| Frontend   | Next.js 16, React 19, Tailwind CSS 4 |
| UI         | Radix UI, Lucide Icons, shadcn/ui    |
| Backend    | Next.js App Router, Server Actions   |
| Banco      | PostgreSQL + Prisma 7                |
| Auth       | Steam OpenID, JWT (jose), cookies    |
| Validação  | Zod                                 |
| Deploy/DB  | Docker (PostgreSQL)                  |

---

## Pré-requisitos

- **Node.js** 20+
- **PostgreSQL** (local ou via Docker)
- **Chave da Steam Web API** ([steamcommunity.com/dev/apikey](https://steamcommunity.com/dev/apikey))

---

## Configuração

1. **Clone o repositório** e instale as dependências:

   ```bash
   git clone <url-do-repo>
   cd Steam-track
   npm install
   ```

2. **Configure o banco** (ex.: Docker):

   ```bash
   docker compose up -d
   ```

3. **Configure o Prisma** (schema em `prisma/schema.prisma`):

   - Defina `DATABASE_URL` no `.env` (ex.: `postgresql://postgres:postgres@localhost:5432/steam-track`).
   - Rode as migrações:

   ```bash
   npx prisma migrate deploy
   ```

4. **Variáveis de ambiente** (exemplo em `.env`):

   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/steam-track"
   STEAM_API_KEY="sua-chave-steam-api"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

   - `NEXT_PUBLIC_APP_URL`: URL base do app (usada no callback do Steam e em links).
   - `STEAM_API_KEY`: obrigatória para chamadas à API Steam.

5. **Gere o Prisma Client** (se necessário):

   ```bash
   npx prisma generate
   ```

---

## Scripts

| Comando              | Descrição                    |
|----------------------|-----------------------------|
| `npm run dev`        | Sobe o Next.js em modo dev  |
| `npm run build`      | Build de produção           |
   
              


---

## Estrutura principal do projeto

```
src/
├── app/
│   ├── (external)/          # Landing (página inicial)
│   ├── (internal)/[steamId]/ # Overview, Biblioteca, Amigos, Library/[gameId]
│   ├── actions/player/      # Server Actions (jogador, jogos, amigos, conquistas, stats)
│ 
├── components/
│   ├── landing/             # Hero, Features, FAQ, Footer, etc.
│   ├── header/              # Header interno, nav, busca, current player
│   ├── overview/            # Cabeçalho do jogador, seção de jogos
│   ├── library/             # Header da biblioteca, detalhes do jogo (galeria, stats, conquistas)
│   ├── friends/             # Lista e filtros de amigos
│   ├── shared/              # GameCard, not-found, logo, etc.
│   └── ui/                  # Componentes base (Radix/shadcn)
├── lib/                     # steam-api, prisma, jwt, utils, seo
├── types/                   # Tipos Steam e rotas
└── env.ts                   # Schema de variáveis de ambiente (Zod)
```

---

## Licença

Projeto de uso livre para estudo e portfólio. O uso da **Steam Web API** e de **OpenID** está sujeito aos termos da Valve/Steam.
