# ADR-002 — Core bancário composável, não monólito comprado

**Status:** aceita  
**Contexto:** o CTO pergunta se a aquisição de uma plataforma de core bancário resolve silos, conta e velocidade. O CIO pediu a visão antes da decisão de compra.

## Decisão

**Não** abrir RFP de core bancário completo. Abrir RFI de **blocos commodity** (motor de ledger e conexão SPI/PIX) que se encaixem como SBB atrás de portas do domínio. Construir Cliente, Conta (ciclo de vida), Ordem de Pagamento, Catálogo e a ACL do crédito.

## Por que o core fechado falha neste case

1. O estilo vigente é microserviços e deve permanecer (AR-01). Core clássico é o estilo oposto: um sistema de record que volta a concentrar cliente, conta, crédito e cobrança.
2. C4 e C5 **já estão aderentes**. Pagar para reimplementá-los num vendor é custo em cima do que funciona, e congela a fábrica que paga o banco.
3. Programa de core no Brasil (Temenos, TCS BaNCS, equivalentes locais de “core completo”) é medido em anos. O C-level pediu produto e velocidade. T2 cabe em um ciclo; core não.
4. Silo não se resolve trocando cinco monólitos por um. Se o recorte de capacidade não mudar, o vendor vira o novo silo — só que com lock-in.
5. O dado de pessoa e o invariante de saldo são building blocks do banco. Terceirizar o ABB inteiro é perder o ativo que a conta deveria criar.

## O que *pode* ser comprado

| Bloco | Comprável | Condição |
|-------|-----------|----------|
| Motor de ledger / partidas | Sim | API, multi-conta, estorno, exportação, sem exigir o crédito no mesmo pacote |
| Conexão SPI / PIX / PSP | Sim | Atrás de `pix-adapter`; contrato de ordem fica no banco |
| IdP | Sim | Genérico |
| Motor de campanha (T4) | Sim | Lastro = lançamento nosso |
| Core + originação + cobrança + conta | Não | Pacote recusado no board |

## Alternativas

| Opção | Veredito |
|-------|----------|
| A. Comprar core completo e migrar crédito | Recusada. Viola estilo, prazo e aderência de C4/C5. |
| B. Não comprar nada, construir ledger e SPI do zero | Possível, mas desperdício em commodity. |
| C. Conta 100% white-label em processadora | Recusada. Banco não fica com o ABB. Engajamento vira contrato de terceiros. |
| D. Composável (esta) | Aceita. |

## Consequências

- RFI com escopo negativo explícito: “propostas que incluam originação de crédito serão desclassificadas”.
- Fornecedor que só vende suíte completa não é fornecedor deste programa.
- CTO ganha velocidade de T2 sem o cheque e o freeze de um core.
- CIO ganha trilha de arquitetura para recusar a compra errada.
