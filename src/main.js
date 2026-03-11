import { gameState, formatBRL } from './core/gameState.js';
import { quartoDoJogador } from './scenes/quartoJogador.js';
import { desafioConsumo, separadorDespesas } from './missoes/orcamentoSemanal.js';

const sceneTitle = document.getElementById('scene-title');
const sceneDescription = document.getElementById('scene-description');
const sceneDialogue = document.getElementById('scene-dialogue');
const nextDialogueBtn = document.getElementById('next-dialogue');
const completeWeekBtn = document.getElementById('complete-week');
const challengeQuestion = document.getElementById('challenge-question');
const challengeOptions = document.getElementById('challenge-options');
const challengeFeedback = document.getElementById('challenge-feedback');
const dragItems = document.getElementById('drag-items');
const dragFeedback = document.getElementById('drag-feedback');

let dialogueIndex = 0;
let respondeuCorreto = false;
let acertosDragDrop = 0;

function renderBanco() {
  const { saldo, receitas, despesas, metaClubeAtual, metaClubeTotal } = gameState.jogador;
  document.getElementById('saldo').textContent = formatBRL(saldo);
  document.getElementById('receitas').textContent = formatBRL(receitas);
  document.getElementById('despesas').textContent = formatBRL(despesas);
  document.getElementById('meta').textContent = `${formatBRL(metaClubeAtual)} / ${formatBRL(metaClubeTotal)}`;
}

function renderMissao() {
  const missao = gameState.missaoAtual;
  document.getElementById('mission-title').textContent = missao.titulo;
  document.getElementById('mission-goal').textContent = missao.objetivo;

  const list = document.getElementById('mission-steps');
  list.innerHTML = '';
  missao.etapas.forEach((etapa) => {
    const li = document.createElement('li');
    li.textContent = `${etapa.concluida ? '✅' : '⬜'} ${etapa.texto}`;
    list.appendChild(li);
  });
}

function renderCena() {
  sceneTitle.textContent = quartoDoJogador.titulo;
  sceneDescription.textContent = quartoDoJogador.descricao;
  sceneDialogue.textContent = quartoDoJogador.dialogos[dialogueIndex];
}

function setupDesafio() {
  challengeQuestion.textContent = desafioConsumo.pergunta;
  challengeOptions.innerHTML = '';

  desafioConsumo.opcoes.forEach((opcao) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = opcao.texto;
    button.addEventListener('click', () => {
      challengeFeedback.textContent = opcao.feedback;
      challengeFeedback.className = `feedback ${opcao.correta ? 'ok' : 'error'}`;
      if (opcao.correta) {
        respondeuCorreto = true;
        gameState.missaoAtual.etapas[3].concluida = true;
        renderMissao();
      }
    });
    challengeOptions.appendChild(button);
  });
}

function setupDragDrop() {
  dragItems.innerHTML = '';
  separadorDespesas.forEach((item) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'drag-chip';
    chip.textContent = item.nome;
    chip.draggable = true;
    chip.dataset.tipo = item.tipo;

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
      const alvo = zone.dataset.type;
      const ul = zone.querySelector('ul');
      const li = document.createElement('li');
      li.textContent = item.nome;
      ul.appendChild(li);

      if (item.tipo === alvo) {
        acertosDragDrop += 1;
      }

      if (acertosDragDrop >= 4) {
        gameState.missaoAtual.etapas[1].concluida = true;
        renderMissao();
        dragFeedback.textContent = 'Boa! Você já separa bem necessidade e desejo.';
        dragFeedback.className = 'feedback ok';
      }
    });
  });
}

nextDialogueBtn.addEventListener('click', () => {
  dialogueIndex = (dialogueIndex + 1) % quartoDoJogador.dialogos.length;
  renderCena();
});

completeWeekBtn.addEventListener('click', () => {
  if (!respondeuCorreto || acertosDragDrop < 4) {
    dragFeedback.textContent = 'Complete os desafios antes de fechar o orçamento da semana.';
    dragFeedback.className = 'feedback error';
    return;
  }

  gameState.missaoAtual.etapas[2].concluida = true;
  gameState.jogador.metaClubeAtual += 80;
  gameState.jogador.saldo -= 80;
  renderBanco();
  renderMissao();
  dragFeedback.textContent = 'Semana fechada! R$ 80 reservados para o clube. Próxima: supermercado inteligente.';
  dragFeedback.className = 'feedback ok';
});

renderBanco();
renderMissao();
renderCena();
setupDesafio();
setupDragDrop();
