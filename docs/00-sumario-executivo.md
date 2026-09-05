# Sumário executivo

**Para:** C-level, CTO, CIO  
**De:** Enterprise Architecture  
**Assunto:** Qual produto habilitar e se o banco deve comprar um core  
**Decisão pedida:** aprovar a onda T1–T2 do roadmap (cliente único + conta + PIX)

## O problema que o case realmente coloca

O banco cresceu em empréstimo — CDC, cartão, pessoal, consignado, crédito com garantia — e cada produto virou um silo. O C-level quer portfólio e engajamento. Os testes de mercado apontaram dois vencedores: Conta de Pagamentos e Cashback. Só um será priorizado. Em paralelo, o CTO pergunta se não é mais simples comprar um core bancário.

A pergunta de produto e a pergunta de core são a mesma pergunta: **como o banco passa a ter um cliente, um saldo e um trilho de pagamento, em vez de cinco originações que não se falam.**

## Recomendação

1. **Habilitar Conta de Pagamentos.** É o produto que cria relação transacional diária e obriga a plataforma que o crédito nunca construiu. Cashback, agora, vira mais um silo de pontos em cima de empréstimo.
2. **Não adquirir core monolítico.** O estilo vigente é microserviços e o case pede para não trocá-lo. Core fechado reconcentra o que já está fragmentado, só que atrás de um fornecedor. Compramos blocos commodity (ledger, conexões PIX/SPI) atrás de anti-corruption layer. Construímos o que diferencia: cliente, originação de crédito, experiência da conta.
3. **Tratar Cashback como capacidade de retenção na arquitetura alvo**, não como primeiro produto. Sem volume de transação, parceria de cashback compra atenção; não compra arquitetura.

## Por que Conta e não Cashback

| Critério | Conta de Pagamentos | Cashback com parcerias |
|----------|---------------------|------------------------|
| Engajamento | Relação primária (saldo, PIX, dia a dia) | Relação secundária (pontos em compra/crédito) |
| Efeito nos silos | Obriga cliente, ledger e pagamento compartilhados | Dá para colar em um produto só e piorar o silo |
| Aceleração de lançamentos | Vira trilho para o próximo produto | Não desbloqueia crédito nem pagamentos |
| Cadeia de valor | Cria o elo que falta: *servir / transacionar* | Atua só em *reter*, depois da originação |
| Regulatório | Conta, PIX, PLD, limites — disciplina operacional | Menos barreira, menos ativo estratégico |
| Opção futura | Cashback nasce depois em cima do ledger | Conta depois continua tão cara quanto hoje |

O teste de público validou os dois. A função de arquitetura não é repetir o teste; é escolher o produto que **melhora a arquitetura vigente para o próximo lançamento**, que é a expectativa explícita do C-level.

## O que já está aderente e o que não está

**Aderente (potencializar):** estilo microserviços; conhecimento de originação, risco e cobrança de crédito; canais digitais já testados com o público.

**Não aderente (TO-BE):** cliente único; plano de contas / ledger compartilhado; ordem de pagamento; catálogo de produto; eventos entre contextos. Sem isso, qualquer produto novo replica o silo.

## Arquitetura em uma frase

Plataforma de capacidades (cliente, identidade, ledger, pagamento) + produtos como bounded contexts em microserviços + legado de crédito encapsulado por adaptadores, até o crédito passar a consumir o trilho comum.

## O que pedimos para aprovar agora

- Patrocínio para **T1** (cliente 360 + barramento de eventos) e **T2** (conta + ledger + PIX in/out).
- Moratória de novos silos: produto novo só entra no catálogo compartilhado.
- RFI de blocos commodity (ledger/SPI), não RFP de core completo.
- Cashback fica no backlog da arquitetura alvo (T4), com o mesmo cliente e o mesmo ledger.

Detalhe e lastro: [ADR-001](decisoes/ADR-001-priorizar-conta-pagamentos.md), [ADR-002](decisoes/ADR-002-core-bancario-composavel.md), [roadmap](09-roadmap-de-migracao.md).
