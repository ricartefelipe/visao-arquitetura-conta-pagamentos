# Processos e DDD

Diferencial do pacote: o processo que a conta realmente mexe, amarrado ao mapa estratégico e à tática já descrita em [08](08-building-blocks-e-microservicos.md).

## Processos documentados

Nível de processo (cadeia de atividades), não SOP de mesa. Donos e sistemas são os SBB.

### PR-01 Conhecer o cliente (T1)

**Objetivo:** uma pessoa, uma decisão de KYC vigente.  
**Dispara:** canal de conta ou, depois, originação de crédito.  
**Atividades:** autenticar → coletar dados → checar PLD/listas → decidir dossiê → registrar `Pessoa` → publicar `PessoaAprovada` ou recusar.  
**Sistemas:** Identidade, Onboarding, Cliente.  
**Métrica:** % de aberturas de produto sem novo dossiê.

### PR-02 Abrir conta de pagamento (T2)

**Objetivo:** conta ativa com posição no ledger.  
**Pré-condição:** PR-01 aprovado.  
**Atividades:** publicar contratação no catálogo → abrir agregado `ContaPagamento` (`em_abertura`) → provisionar posição → ativar → notificar.  
**Compensação:** se o ledger falha, conta não fica ativa.  
**Métrica:** tempo do caminho feliz; taxa de compensação.

### PR-03 Circular PIX (T2)

**Objetivo:** ordem do cliente liquidada e conciliada.  
**Atividades (saída):** receber ordem → PLD de saída → reservar/lançar → enviar SPI → liquidar ou estornar → conciliar.  
**Atividades (entrada):** receber SPI → validar conta → lançar → avisar → conciliar.  
**Dono da verdade de saldo:** ledger. Dono da verdade de ordem: pagamento.  
**Métrica:** divergência D+1; p95 de liquidação.

### PR-04 Desembolsar crédito no trilho (T3)

**Objetivo:** contrato legado credita a conta do cliente sem arquivo de tesouraria.  
**Atividades:** crédito emite `DesembolsoSolicitado` via ACL → pagamento cria ordem interna → ledger lança → crédito registra comprovante.  
**O que não muda:** motor de análise do produto piloto.

### PR-05 Acumular benefício (T4)

**Objetivo:** campanha de parceiro lastreada em lançamento real.  
**Atividades:** consumir `LancamentoConfirmado` → avaliar regra → lançar passivo de campanha → apurar com parceiro.  
**Proibido:** saldo de pontos em banco próprio sem passagem pelo ledger.

## DDD estratégico — decisão de investimento

| Subdomínio | Tipo | Buy / build | Comentário de indústria |
|------------|------|-------------|-------------------------|
| Originação de crédito | Núcleo | Já built; manter | Margem do banco paulista de crédito |
| Conta e ledger | Núcleo novo | Build da fachada; buy do motor se o RFI ganhar | Sem isso não há “banco do dia a dia” |
| Ordem de pagamento / PIX | Núcleo novo | Build da ordem; buy do trilho | PIX é o produto de engajamento no Brasil, não o app |
| Cliente / KYC | Suporte | Build | LGPD e PLD não se terceirizam inteiros |
| Catálogo | Suporte | Build | Barato e político |
| Cobrança | Suporte | Manter silo até T3 | Não é o gap do case |
| Parcerias / cashback | Suporte | Adiar; buy de campanha depois | Indústria usa isso como camada, não como core |
| Identidade, notificação | Genérico | Buy | Sem romance |

Linguagem do banco, não de framework: *pessoa*, *conta de pagamento*, *ordem*, *lançamento*, *desembolso*, *dossiê*. Se o time de consignado disser “cliente do consignado”, o mapa de contexto acusa o vazamento.

## DDD tático — onde o código vai doer

Já listado em [08](08-building-blocks-e-microservicos.md). Aqui só a regra de ouro que o time precisa levar para o primeiro PR de T2:

1. `Lancamento` não se cria de tela. Se cria de `OrdemPagamento` liquidada ou de comando explícito de estorno do próprio contexto.
2. `ContaPagamento` não guarda saldo. Saldo é pergunta ao ledger.
3. `Pessoa` não conhece PIX. Conhece vínculos de produto.
4. ACL de crédito traduz ou recusa. Nunca reexporta DTO do legado para o canal da conta.
5. Benefício não abre conta paralela de “pontos” sem passivo no ledger.

## Relação processo → stream → serviço

| Processo | Value stream | Serviços |
|----------|--------------|----------|
| PR-01 | parte de VS-01 | identity, onboarding, customer |
| PR-02 | VS-01 | catalog, account, ledger, notification |
| PR-03 | VS-02, VS-03 | payment-order, pix-adapter, ledger, customer (PLD) |
| PR-04 | VS-04 | credit-legacy-acl, payment-order, ledger |
| PR-05 | VS-05 | benefit, ledger |

Se um processo novo não caber nessa tabela sem criar serviço, o processo está no subdomínio errado ou estamos prestes a abrir silo.
