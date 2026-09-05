# ADR-003 — Manter microserviços e corrigir o recorte

**Status:** aceita  
**Contexto:** o case fixa o estilo em microserviços e pede para a visão não trocá-lo. O AS-IS já usa o vocabulário, mas recorta por produto (silo), não por capacidade.

## Decisão

Manter microserviços. Mudar a **unidade de decomposição** para bounded context / capacidade. Complementar com eventos. Admitir um núcleo síncrono Conta–Ledger–Pagamento. Recusar ESB, recusar monólito bancário único, recusar “modular monolith” como destino do banco inteiro.

## Estilos avaliados na Fase A

| Estilo | Impacto da visão | Decisão |
|--------|------------------|---------|
| Microserviços por produto (AS-IS real) | É o silo | Abandonar o recorte, não o estilo |
| Microserviços por contexto | Alvo | Adotar |
| Event-driven | Necessário aos streams | Adotar como complemento |
| Layered dentro do serviço | Local, irrelevante na visão | Livre por time |
| SOA / ESB | Centro de gravidade | Recusar |
| Modular monolith (banco todo) | Atalho que vira core | Recusar |
| Núcleo apertado de três serviços | Consistência de dinheiro | Adotar como exceção |
| BaaS pontual | SBB | Adotar se o RFI ganhar |

## Consequências

- Times de plataforma (cliente, conta, pagamento) passam a existir de verdade. Time de “produto CDC” não publica API de pessoa.
- Banco compartilhado entre contextos é incidente, não padrão.
- O núcleo apertado tem o mesmo dono operacional — senão a exceção vira spaghetti síncrono.
- Qualquer fornecedor entra como adaptador, não como barramento.
