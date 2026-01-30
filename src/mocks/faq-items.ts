export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'O que é o SteamTracker?',
    answer:
      'O SteamTracker é uma ferramenta para analisar sua biblioteca Steam. Você visualiza overview do perfil, horas jogadas, jogos em destaque, amigos e conquistas. Tudo a partir do seu Steam ID ou URL do perfil.',
  },
  {
    question: 'Como encontro meu Steam ID?',
    answer:
      'Seu Steam ID é um número de 17 dígitos. Você pode encontrá-lo na URL do seu perfil na Steam (por exemplo: steamcommunity.com/id/seunome) ou em sites como steamid.io. No SteamTracker, você também pode colar a URL completa do perfil que nós identificamos o ID.',
  },
  {
    question: 'Os dados do meu perfil são públicos?',
    answer:
      'Sim. O SteamTracker usa apenas informações que seu perfil Steam já deixa públicas (visibilidade configurável na Steam). Não armazenamos senhas nem acessamos sua conta. Recomendamos conferir as configurações de privacidade no perfil da Steam.',
  },
  {
    question: 'Posso comparar conquistas com amigos?',
    answer:
      'Sim. Na página de um jogo da sua biblioteca há o modo Versus: você escolhe um amigo e vemos lado a lado as conquistas desbloqueadas. Assim você descobre quem está mais perto de completar o jogo.',
  },
  {
    question: 'A biblioteca mostra todos os jogos?',
    answer:
      'A biblioteca lista os jogos da sua conta Steam que a API da Steam retorna (incluindo tempo jogado e conquistas, quando disponíveis). Você pode buscar e filtrar por nome. Jogos sem dados de horas ou conquistas ainda aparecem na lista.',
  },
  {
    question: 'O SteamTracker é oficial da Steam?',
    answer:
      'Não. O SteamTracker é um projeto independente que usa a API pública da Steam para exibir dados do perfil. Não somos afiliados à Valve ou à Steam. Steam e Steam ID são marcas da Valve Corporation.',
  },
];
