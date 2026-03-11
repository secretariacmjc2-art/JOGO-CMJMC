export const desafioConsumo = {
  pergunta:
    'Um vendedor oferece fone "imperdível" por R$ 220 em 6x com juros. Você ainda precisa pagar transporte e lanche da semana. Melhor decisão?',
  opcoes: [
    {
      texto: 'Aceitar agora, porque parcela pequena não pesa.',
      correta: false,
      feedback: 'Armadilha comum: parcela baixa pode esconder custo total alto com juros compostos.',
    },
    {
      texto: 'Comparar orçamento, cobrir necessidades e só comprar se sobrar valor para meta.',
      correta: true,
      feedback: 'Boa! Você priorizou necessidade, evitou crédito fácil e manteve o planejamento de longo prazo.',
    },
    {
      texto: 'Pegar empréstimo para não perder a promoção.',
      correta: false,
      feedback: 'Crédito fácil sem planejamento pode virar bola de neve.',
    },
  ],
};

export const separadorDespesas = [
  { nome: 'Passe de ônibus', tipo: 'necessidade' },
  { nome: 'Internet para estudar', tipo: 'necessidade' },
  { nome: 'Lanche gourmet diário', tipo: 'desejo' },
  { nome: 'Caneta para prova', tipo: 'necessidade' },
  { nome: 'Assinatura extra de game', tipo: 'desejo' },
];
