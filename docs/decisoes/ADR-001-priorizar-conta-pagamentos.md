# ADR-001 — Priorizar Conta de Pagamentos

**Status:** aceita  
**Contexto:** o C-level pede um produto entre Conta de Pagamentos e Cashback com parcerias. Ambos testaram bem. A expectativa declarada é que o produto também melhore a arquitetura para o próximo lançamento.

## Decisão

Habilitar **Conta de Pagamentos** neste ciclo. Tratar Cashback como capacidade C9 na arquitetura alvo (T4), não como produto isolado agora.

## Alternativas

| Opção | O que ganha | O que perde |
|-------|-------------|-------------|
| A. Conta agora | Trilho, cliente, ledger, engajamento diário | Time-to-market um pouco maior que um “programa de pontos” |
| B. Cashback agora | Campanha rápida, narrativa de parceria | Sexto silo; zero efeito em C1–C3; próximo produto continua caro |
| C. Os dois | Satisfaz o teste de mercado | Fere a priorização do case e divide a plataforma |

## Lastro

- Subdomínios: conta e pagamento são núcleo ausente; parceria é suporte ([02](../02-problemas-e-subdominios.md)).
- Capacidades: C2 e C3 são estratégicas neste ciclo; C9 não é ([03](../03-mapa-de-capacidades.md)).
- Cadeia de valor: o elo que falta é *servir*, não *enfeitar retenção* ([05](../05-cadeia-e-fluxos-de-valor.md)).
- Requisitos RN-01 e RN-02 ao mesmo tempo: só a conta fecha os dois ([04](../04-requisitos-e-funcionalidades.md)).
- Indústria: no varejo brasileiro, PIX na conta é relação; cashback sem transação é mídia.

## Consequências

- T1 e T2 viram o programa. Cashback sai do Q3 comercial como “produto de plataforma”.
- Marketing continua livre para campanha pontual nos produtos de crédito, **fora** do catálogo novo.
- Quando C9 nascer, o evento já existe: `LancamentoConfirmado`.
