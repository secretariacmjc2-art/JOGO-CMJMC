import { gameState, formatBRL, atualizarEtapa, missaoCompleta } from './core/gameState.js';
import { quartoDoJogador } from './scenes/quartoJogador.js';
import { desafioConsumo, separadorDespesas, puzzleSupermercado, desafioJuros } from './missoes/orcamentoSemanal.js';

const sceneTitle = document.getElementById('scene-title');
const sceneDescription = document.getElementById('scene-description');
const sceneDialogue = document.getElementById('scene-dialogue');
const phaseTag = document.getElementById('phase-tag');

const missionTitle = document.getElementById('mission-title');
const missionGoal = document.getElementById('mission-goal');
const missionSteps = document.getElementById('mission-steps');
const nextDialogueBtn = document.getElementById('next-dialogue');
const completeWeekBtn = document.getElementById('complete-week');

const saldoEl = document.getElementById('saldo');
const receitasEl = document.getElementById('receitas');
const despesasEl = document.getElementById('despesas');
const reservaEl = document.getElementById('reserva');
const metaEl = document.getElementById('meta');
const longTermStatus = document.getElementById('long-term-status');

const inputTransporte = document.getElementById('input-transporte');
const inputLanche = document.getElementById('input-lanche');
const inputLazer = document.getElementById('input-lazer');
const inputMeta = document.getElementById('input-meta');
const applyBudgetBtn = document.getElementById('apply-budget');
const budgetFeedback = document.getElementById('budget-feedback');

const challengeQuestion = document.getElementById('challenge-question');
const challengeOptions = document.getElementById('challenge-options');
const challengeFeedback = document.getElementById('challenge-feedback');

const dragItems = document.getElementById('drag-items');
const dragFeedback = document.getElementById('drag-feedback');

const marketBudget = document.getElementById('market-budget');
const marketItems = document.getElementById('market-items');
const solveMarketBtn = document.getElementById('solve-market');
const marketFeedback = document.getElementById('market-feedback');

const compoundRiddle = document.getElementById('compound-riddle');
const compoundAnswer = document.getElementById('compound-answer');
const checkCompoundBtn = document.getElementById('check-compound');
const compoundFeedback = document.getElementById('compound-feedback');

let dialogueIndex = 0;
let dragAcertos = 0;
const supermarketSelection = new Map();

function renderCena() {
  phaseTag.textContent = `Semana 1 • ${gameState.progresso.fase}`;
  sceneTitle.textContent = quartoDoJogador.titulo;
  sceneDescription.textContent = quartoDoJogador.descricao;
  sceneDialogue.textContent = quartoDoJogador.dialogos[dialogueIndex];
}

function renderBanco() {
  const { saldo, receitas, despesas, reserva, metaClubeAtual, metaClubeTotal } = gameState.jogador;
  saldoEl.textContent = formatBRL(saldo);
  receitasEl.textContent = formatBRL(receitas);
  despesasEl.textContent = formatBRL(despesas);
  reservaEl.textContent = formatBRL(reserva);
  metaEl.textContent = `${formatBRL(metaClubeAtual)} / ${formatBRL(metaClubeTotal)}`;

  longTermStatus.textContent = missaoCompleta() ? 'Meta avançando 🚀' : 'Meta em progresso';
}

function renderMissao() {
  missionTitle.textContent = gameState.missaoAtual.titulo;
  missionGoal.textContent = gameState.missaoAtual.objetivo;
  missionSteps.innerHTML = '';

  gameState.missaoAtual.etapas.forEach((etapa) => {
    const li = document.createElement('li');
    li.textContent = `${etapa.concluida ? '✅' : '⬜'} ${etapa.texto}`;
    missionSteps.appendChild(li);
  });
}

function marcarFeedback(el, texto, status = 'ok') {
  el.textContent = texto;
  el.className = `feedback ${status}`;
}

function setupOrcamento() {
  applyBudgetBtn.addEventListener('click', () => {
    const transporte = Number(inputTransporte.value);
    const lanche = Number(inputLanche.value);
    const lazer = Number(inputLazer.value);
    const meta = Number(inputMeta.value);

    const totalPlanejado = transporte + lanche + lazer + meta;
    if (totalPlanejado > gameState.jogador.receitas) {
      marcarFeedback(
        budgetFeedback,
        `Seu plano deu ${formatBRL(totalPlanejado)} e passou da receita. Ajuste antes de continuar.`,
        'error',
      );
      return;
    }

    if (transporte + lanche <= 0 || meta <= 0) {
      marcarFeedback(
        budgetFeedback,
        'Inclua gastos essenciais e um valor para a meta de longo prazo.',
        'error',
      );
      return;
    }

    gameState.jogador.despesas = transporte + lanche + lazer;
    gameState.jogador.reserva = meta;
    gameState.jogador.saldo = gameState.jogador.receitas - gameState.jogador.despesas - gameState.jogador.reserva;

    gameState.progresso.orcamentoAplicado = true;
    atualizarEtapa('orcamento', true);
    renderBanco();
    renderMissao();
    marcarFeedback(
      budgetFeedback,
      `Orçamento aplicado! Sobrou ${formatBRL(gameState.jogador.saldo)} para imprevistos e oportunidades.`,
    );
  });
}

function setupDesafioCredito() {
  challengeQuestion.textContent = desafioConsumo.pergunta;
  challengeOptions.innerHTML = '';

  desafioConsumo.opcoes.forEach((opcao) => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-option';
    btn.textContent = opcao.texto;
    btn.addEventListener('click', () => {
      marcarFeedback(challengeFeedback, opcao.feedback, opcao.correta ? 'ok' : 'error');
      if (opcao.correta) {
        gameState.progresso.quizCredito = true;
        atualizarEtapa('credito', true);
        renderMissao();
      }
    });
    challengeOptions.appendChild(btn);
  });
}

function setupSeparador() {
  dragItems.innerHTML = '';

  separadorDespesas.forEach((item) => {
    const chip = document.createElement('button');
    chip.textContent = item.nome;
    chip.className = 'btn btn-chip';
    chip.draggable = true;

    chip.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', JSON.stringify(item));
    });

    dragItems.appendChild(chip);
  });

  document.querySelectorAll('.dropzone').forEach((zone) => {
    zone.addEventListener('dragover', (event) => event.preventDefault());
    zone.addEventListener('drop', (event) => {
      event.preventDefault();
      const item = JSON.parse(event.dataTransfer.getData('text/plain'));
      const targetType = zone.dataset.type;

      const li = document.createElement('li');
      li.textContent = item.nome;
      zone.querySelector('ul').appendChild(li);

      if (item.tipo === targetType) {
        dragAcertos += 1;
      }

      if (dragAcertos >= 5) {
        gameState.progresso.separador = true;
        atualizarEtapa('separador', true);
        renderMissao();
        marcarFeedback(dragFeedback, 'Classificação top! Você dominou necessidade x desejo.');
      }
    });
  });
}

function setupSupermercado() {
  marketBudget.textContent = formatBRL(puzzleSupermercado.orcamento);
  marketItems.innerHTML = '';

  puzzleSupermercado.itens.forEach((item) => {
    const block = document.createElement('div');
    block.className = 'market-block';
    const title = document.createElement('p');
    title.innerHTML = `<strong>${item.nome}</strong>`;

    block.appendChild(title);

    item.opcoes.forEach((opcao, idx) => {
      const btn = document.createElement('button');
      const unitario = opcao.preco / opcao.quantidade;
      btn.className = 'btn btn-option';
      btn.textContent = `${opcao.marca} • ${formatBRL(opcao.preco)} (${formatBRL(unitario)}/un)`;
      btn.addEventListener('click', () => {
        supermarketSelection.set(item.nome, { ...opcao, idx });
        marcarFeedback(marketFeedback, `${item.nome}: opção selecionada.`);
      });
      block.appendChild(btn);
    });

    marketItems.appendChild(block);
  });

  solveMarketBtn.addEventListener('click', () => {
    if (supermarketSelection.size !== puzzleSupermercado.itens.length) {
      marcarFeedback(marketFeedback, 'Escolha uma opção para cada item da lista.', 'error');
      return;
    }

    let total = 0;
    let melhorCusto = true;
    puzzleSupermercado.itens.forEach((item) => {
      const selected = supermarketSelection.get(item.nome);
      total += selected.preco;

      const melhor = item.opcoes.reduce((acc, current) => {
        const accUnit = acc.preco / acc.quantidade;
        const currentUnit = current.preco / current.quantidade;
        return currentUnit < accUnit ? current : acc;
      });

      if (selected.preco / selected.quantidade !== melhor.preco / melhor.quantidade) {
        melhorCusto = false;
      }
    });

    if (total > puzzleSupermercado.orcamento) {
      marcarFeedback(
        marketFeedback,
        `Total ${formatBRL(total)} acima do orçamento. Reavalie quantidade e custo por unidade.`,
        'error',
      );
      return;
    }

    if (!melhorCusto) {
      marcarFeedback(marketFeedback, `Total ${formatBRL(total)} ok, mas ainda não é o melhor custo-benefício.`, 'error');
      return;
    }

    gameState.progresso.supermercado = true;
    atualizarEtapa('supermercado', true);
    renderMissao();
    marcarFeedback(marketFeedback, `Mandou bem! Total ${formatBRL(total)} dentro do orçamento e com melhor custo-benefício.`);
  });
}

function setupJuros() {
  compoundRiddle.textContent = desafioJuros.dica;

  checkCompoundBtn.addEventListener('click', () => {
    const respostaJogador = Number(compoundAnswer.value);
    const esperado = desafioJuros.resposta;
    const margem = 0.2;

    if (Number.isNaN(respostaJogador)) {
      marcarFeedback(compoundFeedback, 'Digite um valor numérico para tentar abrir o cofre.', 'error');
      return;
    }

    if (Math.abs(respostaJogador - esperado) <= margem) {
      gameState.progresso.juros = true;
      atualizarEtapa('juros', true);
      renderMissao();
      marcarFeedback(compoundFeedback, 'Cofre aberto! Você aplicou juros compostos como especialista 😎');
      return;
    }

    marcarFeedback(compoundFeedback, 'Quase! Revise a fórmula M = C × (1 + i)^t e tente de novo.', 'error');
  });
}

nextDialogueBtn.addEventListener('click', () => {
  dialogueIndex = (dialogueIndex + 1) % quartoDoJogador.dialogos.length;
  renderCena();
});

completeWeekBtn.addEventListener('click', () => {
  if (!missaoCompleta()) {
    marcarFeedback(
      budgetFeedback,
      'Ainda faltam etapas da missão. Complete todos os desafios para fechar a semana.',
      'error',
    );
    return;
  }

  gameState.jogador.metaClubeAtual += gameState.jogador.reserva;
  gameState.jogador.reserva = 0;
  gameState.progresso.fase = 'Praça Central';

  renderCena();
  renderBanco();
  renderMissao();

  marcarFeedback(
    budgetFeedback,
    'Semana concluída! Reserva enviada para a meta do clube. Próxima parada: Praça Central da Vila do Progresso.',
  );
});

renderCena();
renderBanco();
renderMissao();
setupOrcamento();
setupDesafioCredito();
setupSeparador();
setupSupermercado();
setupJuros();
