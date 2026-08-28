# Direções de Design

## Abordagem 1

**Tema:** Arquivo de Sessão

**Introdução:** Um catálogo inspirado em cartões de arquivo de uma cinemateca, com contraste editorial, etiquetas cromáticas e detalhe tátil. A experiência transmite organização e prazer de colecionar filmes.

**Probabilidade:** 0.07

## Abordagem 2

**Tema:** Noite de Estreia

**Introdução:** Uma interface escura e dramática, evocando a luz de um projector e a atmosfera de uma sala de cinema. O foco está no contraste, na profundidade e no impacto visual.

**Probabilidade:** 0.04

## Abordagem 3

**Tema:** Videoteca Solar

**Introdução:** Um sistema leve e luminoso que combina amarelo queimado, azul-petróleo e grandes espaços em branco, sugerindo capas físicas de aluguer de filmes. É acolhedor, memorável e fácil de consultar.

**Probabilidade:** 0.09

# Abordagem Escolhida — Arquivo de Sessão

## Movimento de Design

**Editorial modernista com referências de cinemateca.** A aplicação aproxima-se de uma ficha de arquivo cuidadosamente organizada, mas com pequenas explosões de cor e ritmo contemporâneo.

## Princípios Nucleares

1. **Informação como protagonista:** títulos, metadados e estados de formulário devem ser fáceis de ler e digitalizar.
2. **Estrutura assimétrica:** a faixa lateral fixa de contexto equilibra o espaço de trabalho principal, evitando uma composição genérica centrada.
3. **Materialidade subtil:** linhas finas, papel quente e sombras suaves recriam uma coleção física sem sacrificar clareza.
4. **Cor intencional:** o vermelho alizarina é reservado para ações e indicadores relevantes, nunca usado como ruído decorativo.

## Filosofia de Cor

O fundo de marfim suavemente quente aproxima a interface de papel de arquivo e reduz a frieza típica de interfaces de gestão. Grafite profundo garante leitura editorial; azul-petróleo organiza o ambiente; o vermelho alizarina cria um sinal inequívoco para ações de criar e para etiquetas especiais. A cor não é usada em gradientes nem em excesso: funciona como uma marca de catalogação.

## Paradigma de Layout

Uma **coluna de arquivo vertical** à esquerda conserva a identidade e a navegação, enquanto a página principal apresenta cartões de conteúdo deslocados, secções amplas e separadores horizontais. No formulário, os campos distribuem-se numa grelha editorial irregular; na lista, os filmes formam uma estante de fichas com hierarquia de leitura.

## Elementos de Assinatura

1. Uma marca circular que remete para os furos de uma película, usada no cabeçalho e no favicon.
2. Um traço vermelho vertical de catalogação, repetido em títulos, cartões selecionados e avisos.
3. Etiquetas tipográficas em maiúsculas com espaçamento alargado para género, ano e classificação.

## Filosofia de Interação

Cada ação deve parecer o manuseamento de uma ficha de catálogo: direta, confirmada e reversível. Os controlos revelam estados de foco fortes; a remoção pede confirmação e a gravação devolve feedback inequívoco antes de encaminhar para a lista.

## Animação

As transições usam apenas opacidade e deslocamentos curtos, com `cubic-bezier(0.23, 1, 0.32, 1)`. Os cartões entram em cascata de 45 ms, os botões comprimem ligeiramente no clique e o aviso de sucesso aparece de cima com 180 ms. As animações são desativadas para utilizadores que preferem movimento reduzido.

## Sistema Tipográfico

**DM Serif Display** conduz títulos, contadores e o nome da marca, criando presença de publicação cultural. **Manrope** trata corpo, formulários e metadados com precisão. Títulos usam pesos 400/500 e tamanhos amplos; etiquetas usam Manrope 700, maiúsculas e espaçamento entre letras.

## Essência da Marca

**O Arquivo de Sessão é uma videoteca pessoal para quem quer registar e reencontrar filmes com o cuidado de uma cinemateca.**

Personalidade: **criteriosa, acolhedora, cinematográfica**.

## Voz da Marca

Os textos são concisos, orientados à ação e levemente editoriais; evitam promessas genéricas e linguagem técnica desnecessária.

Exemplos: “Registe o próximo título da sua coleção.” e “A sua estante está pronta para a próxima sessão.”

## Logótipo e Marca

O símbolo é um círculo grafite com três perfurações em marfim e uma pequena aba vermelha, uma abstração compacta de rolo de filme e ficha de arquivo. O logótipo combina o símbolo com “Arquivo de Sessão” em DM Serif Display.

## Cor de Marca Assinatura

**Vermelho Alizarina — #D84A3B.** Uma cor de anotação e seleção, própria para destacar o que merece atenção numa coleção.

## Decisões de Estilo

- Todas as rotas mantêm uma âncora de identidade de arquivo persistente, com o símbolo perfurado e o nome “Arquivo de Sessão” no trilho lateral.
- Ações de criar, registar e guardar usam exclusivamente Vermelho Alizarina `#D84A3B`; azul-petróleo organiza navegação, informação e contexto.
- Estados vazios e fichas da lista recorrem a separadores, abas e camadas de cartão inspiradas em gavetas e fichários físicos.
