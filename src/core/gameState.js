export const gameState = {
  jogador: {
    nome: 'Alex',
    saldo: 240,
    receitas: 300,
    despesas: 60,
    metaClubeAtual: 240,
    metaClubeTotal: 1200,
  },
  missaoAtual: {
    id: 'orcamento-semanal',
    titulo: 'Missão 1: Montar o orçamento da semana',
    objetivo:
      'Organize sua mesada, separe necessidades de desejos e evite cair na armadilha do crédito fácil.',
    etapas: [
      { texto: 'Anotar receitas fixas da semana', concluida: true },
      { texto: 'Definir limite de gastos essenciais', concluida: false },
      { texto: 'Reservar valor para meta do clube', concluida: false },
      { texto: 'Recusar proposta de empréstimo abusivo', concluida: false },
    ],
  },
};

export function formatBRL(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}
