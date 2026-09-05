# Visão de arquitetura — Conta de Pagamentos

Pacote de Enterprise Architecture para um banco de crédito em São Paulo que precisa escolher entre **Conta de Pagamentos** e **Cashback com parcerias**, e decidir se compra um core bancário para resolver silos e acelerar produto.

**Recomendação:** habilitar Conta de Pagamentos sobre uma plataforma compartilhada. Não adquirir core monolítico. Manter microserviços. Cashback fica como capacidade futura, não como produto isolado agora.

## Como ler

Comece pelo [sumário executivo](docs/00-sumario-executivo.md) ou abra o [briefing](briefing/index.html) no navegador. O restante lastreia a decisão.

| Artefato | O que responde |
|----------|----------------|
| [00. Sumário executivo](docs/00-sumario-executivo.md) | O que o C-level precisa decidir |
| [01. Abordagem e método](docs/01-abordagem-e-metodo.md) | TOGAF ADM, por que cada framework |
| [02. Problemas e subdomínios](docs/02-problemas-e-subdominios.md) | Mapa de problemas de negócio |
| [03. Mapa de capacidades](docs/03-mapa-de-capacidades.md) | Classificação top-level e calor |
| [04. Requisitos e funcionalidades](docs/04-requisitos-e-funcionalidades.md) | Rastreio e o que emerge do levantamento |
| [05. Cadeia e fluxos de valor](docs/05-cadeia-e-fluxos-de-valor.md) | Value chain, value streams, interoperabilidade |
| [06. Visão AS-IS](docs/06-visao-as-is.md) | O que já está aderente e o que não está |
| [07. Visão TO-BE](docs/07-visao-to-be.md) | Arquitetura alvo e intermediárias |
| [08. Building blocks e microserviços](docs/08-building-blocks-e-microservicos.md) | ABB/SBB, decomposição, DDD tático |
| [09. Roadmap de migração](docs/09-roadmap-de-migracao.md) | Como sair do silo sem parar o crédito |
| [10. Processos e DDD](docs/10-processos-e-ddd.md) | Processos, mapa de contextos, tática |
| [ADR-001](docs/decisoes/ADR-001-priorizar-conta-pagamentos.md) | Por que Conta e não Cashback |
| [ADR-002](docs/decisoes/ADR-002-core-bancario-composavel.md) | Por que não comprar o core fechado |
| [ADR-003](docs/decisoes/ADR-003-manter-microservicos.md) | Por que o estilo não muda |
