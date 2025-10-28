# FastPay - Sistema de Pagamentos

Sistema de transferências financeiras com API REST e interface web responsiva, desenvolvido com Next.js 14, TypeScript e Tailwind CSS.

## 📋 Funcionalidades

### Passo 2: API de Transferências Financeiras

Endpoint REST seguro para realizar transferências com:

- ✅ Validação de saldo
- ✅ Registro completo da transação
- ✅ Geração de código único para cada operação
- ✅ Validações robustas (contas, valores, duplicação)
- ✅ Histórico de transações

### Passo 3: Extrato Bancário Responsivo

Interface web com foco em usabilidade móvel:

- 📱 Totalmente responsivo para smartphones
- 🎯 Destaque visual para transações acima de R$ 5.000
- ⚡ Performance otimizada de carregamento
- 🎨 Design minimalista (preto e branco)
- 🔤 Fonte Inter

## 🚀 Instalação

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start
```

Acesse: http://localhost:3000

## 📡 API Endpoints

### 1. Realizar Transferência

**POST** `/api/transfer`

Realiza uma transferência financeira entre contas.

**Body:**
```json
{
  "fromAccountId": "acc-001",
  "toAccountId": "acc-002",
  "amount": 1500.00,
  "description": "Pagamento de serviços"
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Transferência realizada com sucesso",
  "transaction": {
    "id": "txn-1698508800000",
    "transactionCode": "TRX-20241028-A1B2C3D4",
    "fromAccountId": "acc-001",
    "toAccountId": "acc-002",
    "amount": 1500.00,
    "description": "Pagamento de serviços",
    "timestamp": "2024-10-28T10:30:00.000Z",
    "status": "completed"
  }
}
```

**Erros Possíveis:**

- `400 Bad Request` - Campos obrigatórios faltando
- `400 Bad Request` - Transferência para a mesma conta
- `400 Bad Request` - Valor inválido (≤ 0)
- `400 Bad Request` - Saldo insuficiente
- `404 Not Found` - Conta não encontrada
- `500 Internal Server Error` - Erro no servidor

### 2. Listar Transações

**GET** `/api/transfer`

Retorna todas as transações do sistema.

**Resposta (200):**
```json
{
  "success": true,
  "transactions": [
    {
      "id": "1",
      "transactionCode": "TRX-20241028-001",
      "fromAccountId": "acc-001",
      "toAccountId": "acc-002",
      "amount": 1200.00,
      "description": "Pagamento de aluguel",
      "timestamp": "2024-10-01T10:30:00.000Z",
      "status": "completed"
    }
  ]
}
```

### 3. Extrato por Conta

**GET** `/api/statement?accountId=acc-001`

Retorna o extrato de uma conta específica.

**Parâmetros:**
- `accountId` (obrigatório) - ID da conta

**Resposta (200):**
```json
{
  "success": true,
  "account": {
    "id": "acc-001",
    "name": "João Silva",
    "balance": 15000.00
  },
  "transactions": [...]
}
```

## 🧪 Testando a API

### Usando cURL

```bash
# Realizar transferência
curl -X POST http://localhost:3000/api/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": "acc-001",
    "toAccountId": "acc-002",
    "amount": 500.00,
    "description": "Teste de transferência"
  }'

# Buscar extrato
curl http://localhost:3000/api/statement?accountId=acc-001
```

### Usando Navegador

1. Acesse http://localhost:3000
2. Selecione uma conta no dropdown
3. Visualize o extrato com transações destacadas

## 💾 Dados de Teste

O sistema possui 3 contas pré-configuradas:

| ID | Nome | Saldo Inicial |
|----|------|---------------|
| acc-001 | João Silva | R$ 15.000,00 |
| acc-002 | Maria Santos | R$ 8.500,00 |
| acc-003 | Pedro Oliveira | R$ 25.000,00 |

## 🎨 Design System

### Cores
- Preto: `#000000`
- Branco: `#ffffff`

### Tipografia
- Fonte: Inter (Google Fonts)
- Tamanhos: Responsivos usando Tailwind

### Responsividade
- Mobile First
- Breakpoints: `sm`, `md`, `lg`, `xl`
- Otimizado para telas de 320px até 1920px+

## 🔒 Validações Implementadas

### Validação de Transferência
1. ✅ Campos obrigatórios (fromAccountId, toAccountId, amount)
2. ✅ Contas devem ser diferentes
3. ✅ Valor deve ser maior que zero
4. ✅ Conta de origem deve existir
5. ✅ Conta de destino deve existir
6. ✅ Saldo suficiente na conta de origem

### Validação de Código Único
- Formato: `TRX-YYYYMMDD-XXXXXXXX`
- Exemplo: `TRX-20241028-A1B2C3D4`
- Gerado com UUID v4

## 📱 Features da Interface

### Extrato Bancário
- ✨ Seleção de conta via dropdown
- 💰 Exibição de saldo em destaque
- 📊 Lista de transações ordenadas por data
- 🎯 Destaque para valores ≥ R$ 5.000 (fundo preto)
- 📍 Indicador de tipo (crédito/débito)
- 🔢 Código único da transação
- ⏰ Data e hora formatadas
- ✅ Status da transação

### Responsividade Mobile
- Layout adaptativo para smartphones
- Textos escaláveis
- Botões e áreas de toque otimizadas
- Performance de carregamento rápida

## 🏗️ Estrutura do Projeto

```
fastpay/
├── app/
│   ├── api/
│   │   ├── transfer/
│   │   │   └── route.ts        # API de transferências
│   │   └── statement/
│   │       └── route.ts        # API de extrato
│   ├── globals.css             # Estilos globais
│   ├── layout.tsx              # Layout principal
│   └── page.tsx                # Página do extrato
├── lib/
│   ├── database.ts             # Simulação de banco de dados
│   └── utils.ts                # Funções utilitárias
├── types/
│   └── index.ts                # TypeScript types
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **UUID** - Geração de IDs únicos
- **React Hooks** - useState, useEffect

## 📝 Próximos Passos

- [ ] Integração com banco de dados real (PostgreSQL/MongoDB)
- [ ] Autenticação e autorização
- [ ] Testes unitários e de integração
- [ ] Cache de transações
- [ ] Paginação de extrato
- [ ] Filtros por data/valor
- [ ] Export de extrato (PDF/CSV)
- [ ] Notificações em tempo real

## 👨‍💻 Autor

Desenvolvido para o Projeto Integrado - TechMarket/FastPay

---

**FastPay** - Sistema de Pagamentos Seguro © 2024
