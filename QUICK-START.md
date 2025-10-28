# GUIA DE INÍCIO RÁPIDO - FASTPAY

Este guia vai te ajudar a começar em **5 minutos**! 🚀

---

## ⚡ INÍCIO RÁPIDO

### 1️⃣ Instalar Dependências (30 segundos)

```bash
cd /home/marvincoelho/projects/fastpay
npm install
```

### 2️⃣ Iniciar Servidor (5 segundos)

```bash
npm run dev
```

Aguarde a mensagem:
```
✓ Ready in 1576ms
- Local: http://localhost:3000
```

### 3️⃣ Acessar Aplicação

Abra no navegador: **http://localhost:3000**

---

## 🎯 TESTANDO A INTERFACE

### Visualizar Extrato

1. Acesse http://localhost:3000
2. Você verá a conta de **João Silva** selecionada
3. Observe o **saldo** em destaque (fundo preto)
4. Role para ver todas as **transações**
5. Veja transações de **alto valor** destacadas em preto

### Trocar de Conta

1. Clique no dropdown **"Selecionar Conta"**
2. Escolha outra conta:
   - João Silva (acc-001)
   - Maria Santos (acc-002)
   - Pedro Oliveira (acc-003)
3. O extrato será atualizado automaticamente

### Testar Responsividade

1. Abra DevTools (F12)
2. Ative "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Selecione "iPhone 12 Pro"
4. Veja o layout adaptado para mobile

---

## 🔧 TESTANDO A API

### Teste 1: Transferência Simples

```bash
curl -X POST http://localhost:3000/api/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": "acc-001",
    "toAccountId": "acc-002",
    "amount": 100.00,
    "description": "Meu primeiro teste"
  }'
```

**Resultado Esperado:**
```json
{
  "success": true,
  "message": "Transferência realizada com sucesso",
  "transaction": {
    "transactionCode": "TRX-20241028-XXXXXXXX",
    ...
  }
}
```

### Teste 2: Ver Extrato Atualizado

```bash
curl http://localhost:3000/api/statement?accountId=acc-001
```

Você verá a nova transação na lista!

### Teste 3: Transferência de Alto Valor

```bash
curl -X POST http://localhost:3000/api/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": "acc-003",
    "toAccountId": "acc-001",
    "amount": 7000.00,
    "description": "Transferência de alto valor"
  }'
```

Depois, atualize a página e veja a transação **destacada em preto**!

### Teste 4: Erro de Saldo Insuficiente

```bash
curl -X POST http://localhost:3000/api/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": "acc-001",
    "toAccountId": "acc-002",
    "amount": 999999.00,
    "description": "Valor muito alto"
  }'
```

**Resultado Esperado:**
```json
{
  "success": false,
  "message": "Saldo insuficiente",
  "error": "Saldo disponível: R$ 15000.00. Valor solicitado: R$ 999999.00"
}
```

---

## 📋 TESTES AUTOMATIZADOS

Execute todos os testes de uma vez:

```bash
./test-api.sh
```

Este script testa:
- ✅ Transferência válida
- ✅ Transferência de alto valor
- ❌ Saldo insuficiente
- ❌ Mesma conta
- ❌ Valor negativo
- ✅ Listar transações
- ✅ Extrato por conta

---

## 🎨 EXPLORANDO OS RECURSOS

### Recursos Visuais

1. **Destaque de Alto Valor**
   - Transações ≥ R$ 5.000 têm fundo **preto**
   - Texto em **branco** para máximo contraste
   - Badge "ALTO VALOR" visível

2. **Indicadores de Tipo**
   - **+ CRÉDITO**: Dinheiro recebido (verde em algumas views)
   - **- DÉBITO**: Dinheiro enviado

3. **Código de Transação**
   - Formato: TRX-YYYYMMDD-XXXXXXXX
   - Único para cada transação
   - Útil para rastreamento

4. **Responsividade**
   - Teste em diferentes tamanhos de tela
   - Layout se adapta automaticamente
   - Sempre legível e funcional

---

## 🛠️ COMANDOS ÚTEIS

### Desenvolvimento
```bash
npm run dev          # Iniciar servidor de desenvolvimento
npm run build        # Criar build de produção
npm start            # Executar em produção
npm run lint         # Verificar erros de lint
```

### Teste de API
```bash
# Transferência
curl -X POST http://localhost:3000/api/transfer \
  -H "Content-Type: application/json" \
  -d '{"fromAccountId":"acc-001","toAccountId":"acc-002","amount":500}'

# Extrato
curl http://localhost:3000/api/statement?accountId=acc-001

# Todas as transações
curl http://localhost:3000/api/transfer
```

---

## 📊 DADOS PRÉ-CARREGADOS

### Contas Disponíveis

| Conta | Nome | Saldo |
|-------|------|-------|
| acc-001 | João Silva | R$ 15.000,00 |
| acc-002 | Maria Santos | R$ 8.500,00 |
| acc-003 | Pedro Oliveira | R$ 25.000,00 |

### Transações de Exemplo

O sistema já vem com **7 transações** de exemplo:
- 3 transações normais (< R$ 5.000)
- 4 transações de alto valor (≥ R$ 5.000)
- Mix de créditos e débitos
- Datas variadas em Outubro 2024

---

## 🎯 CENÁRIOS DE USO

### Cenário 1: Consultar Extrato
1. Abrir http://localhost:3000
2. Selecionar conta desejada
3. Visualizar transações ordenadas
4. Identificar transações de alto valor

### Cenário 2: Fazer Transferência via API
1. Preparar dados da transferência
2. Enviar POST para /api/transfer
3. Receber código único da transação
4. Atualizar página para ver no extrato

### Cenário 3: Validar Saldo
1. Tentar transferência com valor alto
2. Sistema valida saldo automaticamente
3. Retorna erro claro se insuficiente
4. Mostra saldo disponível vs solicitado

---

## ⚠️ PROBLEMAS COMUNS

### Porta 3000 já em uso
```bash
# Matar processo na porta 3000
lsof -ti:3000 | xargs kill -9

# Ou usar outra porta
PORT=3001 npm run dev
```

### Dependências não instaladas
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro de compilação
```bash
# Limpar cache do Next.js
rm -rf .next
npm run dev
```

---

## 📚 DOCUMENTAÇÃO COMPLETA

- **README.md** - Documentação principal
- **API-EXAMPLES.md** - Exemplos detalhados de API
- **DOCUMENTACAO-PROJETO.md** - Documentação completa do projeto
- **GUIA-RESPONSIVIDADE.md** - Guia de responsividade detalhado

---

## 🎓 PRÓXIMOS PASSOS

Depois de explorar o básico:

1. **Estude o código** em `app/api/transfer/route.ts`
2. **Customize a interface** em `app/page.tsx`
3. **Adicione validações** conforme necessário
4. **Integre com BD real** (PostgreSQL, MongoDB)
5. **Adicione autenticação** (NextAuth.js)
6. **Deploy em produção** (Vercel, Railway)

---

## ✅ CHECKLIST DE VALIDAÇÃO

Antes de considerar o projeto completo:

### Passo 2 - API
- [x] Endpoint POST /api/transfer funcional
- [x] Validação de saldo implementada
- [x] Código único gerado (UUID)
- [x] Registro de transações
- [x] Tratamento de erros
- [x] Mensagens claras

### Passo 3 - Interface
- [x] Layout responsivo (mobile/tablet/desktop)
- [x] Destaque para valores ≥ R$ 5.000
- [x] Design preto e branco
- [x] Fonte Inter aplicada
- [x] Performance otimizada
- [x] UX intuitiva

---

## 🚀 VOCÊ ESTÁ PRONTO!

Agora você tem:
- ✅ API REST funcional
- ✅ Interface responsiva
- ✅ Validações robustas
- ✅ Sistema completo de transferências

**Explore, teste e customize!** 💪

---

## 💡 DICAS FINAIS

1. **Use o DevTools** para ver requisições de rede
2. **Teste em mobile real** se possível
3. **Leia os códigos de erro** com atenção
4. **Consulte a documentação** quando precisar
5. **Experimente diferentes valores** de transferência

---

**FastPay** - Seu sistema de pagamentos em 5 minutos! ⚡

Para suporte: Consulte a documentação ou teste os exemplos de API.
