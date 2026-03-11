export const desafioConsumo = {
  pergunta:
    'Loja oferece celular por R$ 1.000 ou 10x de R$ 130 no crédito. Você tem meta de longo prazo e despesas essenciais na semana. Qual decisão é mais inteligente?',
  opcoes: [
    {
      texto: 'Ir no parcelado porque 130 parece barato.',
      correta: false,
      feedback: 'Cuidado! 10x de R$ 130 = R$ 1.300. O crédito fácil pode aumentar muito o custo total.',
    },
    {
      texto: 'Comparar orçamento, manter necessidades e guardar para meta antes de comprar.',
      correta: true,
      feedback: 'Perfeito! Você equilibrou presente e futuro, evitando juros desnecessários.',
    },
    {
      texto: 'Pedir empréstimo pra aproveitar hoje e resolver depois.',
      correta: false,
      feedback: 'Resolver depois sem plano quase sempre vira dívida maior.',
    },
  ],
};

export const separadorDespesas = [
  { nome: 'Passe de ônibus', tipo: 'necessidade' },
  { nome: 'Material de estudo', tipo: 'necessidade' },
  { nome: 'Skin rara no jogo', tipo: 'desejo' },
  { nome: 'Internet para pesquisa', tipo: 'necessidade' },
  { nome: 'Combo premium de streaming', tipo: 'desejo' },
  { nome: 'Lanche extra gourmet', tipo: 'desejo' },
];

export const puzzleSupermercado = {
  orcamento: 45,
  itens: [
    {
      nome: 'Arroz',
      opcoes: [
        { marca: 'Marca A (1kg)', preco: 7, quantidade: 1 },
        { marca: 'Marca B (5kg)', preco: 31, quantidade: 5 },
      ],
    },
    {
      nome: 'Leite',
      opcoes: [
        { marca: 'Marca A (1L)', preco: 5, quantidade: 1 },
        { marca: 'Marca B (12L)', preco: 54, quantidade: 12 },
      ],
    },
    {
      nome: 'Feijão',
      opcoes: [
        { marca: 'Marca A (1kg)', preco: 8, quantidade: 1 },
        { marca: 'Marca B (2kg)', preco: 14, quantidade: 2 },
      ],
    },
  ],
};

export const desafioJuros = {
  principal: 200,
  taxa: 0.1,
  meses: 3,
  dica:
    'No banco da vila, o cofre mostra: M = C × (1 + i)^t. Com C=200, i=10% ao mês, t=3 meses. Qual montante final?',
  resposta: 266.2,
};
