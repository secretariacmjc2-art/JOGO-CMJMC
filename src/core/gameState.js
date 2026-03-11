export const gameState = {
  jogador: {
    nome: 'Alex',
    receitas: 300,
    despesas: 60,
    saldo: 240,
    reserva: 0,
    metaClubeAtual: 240,
    metaClubeTotal: 1200,
  },
  progresso: {
    fase: 'Quarto do Jogador',
    quizCredito: false,
    separador: false,
    orcamentoAplicado: false,
    supermercado: false,
    juros: false,
  },
  missaoAtual: {
    titulo: 'Missão 1: Montar o orçamento da semana',
    objetivo:
      'Planeje gastos essenciais, controle desejos, entenda riscos do crédito fácil e avance rumo à reforma do clube.',
    etapas: [
      { id: 'receitas', texto: 'Registrar receitas e despesas da semana', concluida: true },
      { id: 'orcamento', texto: 'Definir orçamento com necessidade, desejo e meta', concluida: false },
      { id: 'credito', texto: 'Vencer desafio de crédito fácil', concluida: false },
      { id: 'separador', texto: 'Classificar despesas entre necessidade e desejo', concluida: false },
      { id: 'supermercado', texto: 'Resolver puzzle do supermercado com orçamento fixo', concluida: false },
      { id: 'juros', texto: 'Abrir cofre com cálculo de juro composto', concluida: false },
    ],
  },
};

export function formatBRL(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

export function atualizarEtapa(id, concluida = true) {
  const etapa = gameState.missaoAtual.etapas.find((item) => item.id === id);
  if (etapa) etapa.concluida = concluida;
}

export function missaoCompleta() {
  return gameState.missaoAtual.etapas.every((item) => item.concluida);
}
