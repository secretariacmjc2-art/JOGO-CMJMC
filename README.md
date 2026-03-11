# Vila do Progresso — Protótipo Inicial

Protótipo web de um jogo educativo sobre Educação Financeira, com foco em adolescentes e alinhado a tópicos da BNCC:

- diferença entre **necessidade x desejo**;
- elaboração de **orçamento pessoal**;
- noções de **juros simples e compostos**;
- riscos do **crédito fácil**;
- **planejamento de longo prazo** para metas.

## Estrutura de pastas

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

## Primeiro cenário: O Quarto do Jogador

- Introduz o lore da **Vila do Progresso**.
- O jogador recebe o primeiro crédito no "cartão de mesada".
- Diálogos em tom leve e adolescente apresentam o conflito: gastar por impulso ou planejar.

## Primeira missão: Montar o orçamento da semana

1. Revisar receitas.
2. Separar itens entre necessidade e desejo (mini-game de arrastar e soltar).
3. Enfrentar um desafio de consumo (quiz com armadilha de crédito fácil).
4. Reservar parte do saldo para a meta de longo prazo (reforma do clube).

## Próximos cenários sugeridos

- **Puzzle do Supermercado** (comparação de preço por quantidade).
- **Enigma do Juro Composto** (cofre no banco com dicas visuais).
- Missões secundárias com moradores da vila para reforçar tomadas de decisão financeira.

## Como executar

Abra `index.html` diretamente no navegador, ou rode um servidor local:

```bash
python3 -m http.server 8000
```

Acesse: `http://localhost:8000`
