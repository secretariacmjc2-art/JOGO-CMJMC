# Vila do Progresso — Base Melhorada do Jogo Educativo

Projeto inicial de RPG financeiro para adolescentes com foco prático em Educação Financeira, alinhado às competências da BNCC.

## Objetivos educacionais cobertos

- ✅ Diferença entre **necessidade e desejo**.
- ✅ **Elaboração de orçamento pessoal** semanal.
- ✅ **Juros compostos** (com referência a fórmula e desafio prático).
- ✅ Riscos do **crédito fácil** e do parcelamento sem planejamento.
- ✅ **Planejamento de longo prazo** com meta para reforma do clube de tecnologia.

## Lore e ambientação

A história acontece na **Vila do Progresso**. O jogador (Alex) recebe seu primeiro crédito no cartão de mesada e precisa tomar decisões inteligentes para ajudar a reformar o clube de tecnologia da escola.

NPCs (mãe, amigos e comerciantes) trazem situações cotidianas com humor e linguagem jovem.

## Estrutura

```txt
.
├── index.html
├── styles/
│   └── main.css
└── src/
    ├── core/
    │   └── gameState.js
    ├── missoes/
    │   └── orcamentoSemanal.js
    ├── scenes/
    │   └── quartoJogador.js
    └── main.js
```

## Primeiro cenário detalhado: O Quarto do Jogador

- Introdução narrativa com diálogos em sequência.
- Contexto visual do objetivo (reforma do clube).
- Primeiro dilema: impulso de compra versus planejamento.

## Primeira missão detalhada: Montar o orçamento da semana

A missão possui etapas rastreáveis na interface:

1. Registrar receitas e despesas.
2. Montar orçamento com necessidades, desejos e reserva de meta.
3. Vencer desafio de crédito fácil (quiz).
4. Resolver separador de despesas (drag-and-drop).
5. Completar puzzle do supermercado (custo-benefício + teto de orçamento).
6. Resolver enigma de juros compostos (cofre do banco).

Ao concluir tudo, a reserva da semana é enviada para a meta de longo prazo do clube.

## Como executar

```bash
python3 -m http.server 8000
```

Depois, abra:

```txt
http://127.0.0.1:8000
```

## Próximos passos sugeridos

- Sistema de XP por decisão financeira correta.
- Novas missões secundárias com moradores da vila.
- Salvamento local de progresso (`localStorage`).
- Trilha sonora e sprites pixel art/cartoon para reforçar imersão.
