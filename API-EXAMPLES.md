# Exemplos de Requisições HTTP

## 1. Transferência Válida

### cURL
```bash
curl -X POST http://localhost:3000/api/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": "acc-001",
    "toAccountId": "acc-002",
    "amount": 500.00,
    "description": "Pagamento de serviços"
  }'
```

### JavaScript (Fetch)
```javascript
fetch('http://localhost:3000/api/transfer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    fromAccountId: 'acc-001',
    toAccountId: 'acc-002',
    amount: 500.00,
    description: 'Pagamento de serviços'
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

### Python (requests)
```python
import requests

url = "http://localhost:3000/api/transfer"
payload = {
    "fromAccountId": "acc-001",
    "toAccountId": "acc-002",
    "amount": 500.00,
    "description": "Pagamento de serviços"
}

response = requests.post(url, json=payload)
print(response.json())
```

## 2. Transferência de Alto Valor (≥ R$ 5.000)

```bash
curl -X POST http://localhost:3000/api/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": "acc-003",
    "toAccountId": "acc-001",
    "amount": 7500.00,
    "description": "Investimento em equipamentos"
  }'
```

## 3. Buscar Extrato

```bash
curl http://localhost:3000/api/statement?accountId=acc-001
```

## 4. Listar Todas as Transações

```bash
curl http://localhost:3000/api/transfer
```

## 5. Testar Validações (Casos de Erro)

### Saldo Insuficiente
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

### Mesma Conta
```bash
curl -X POST http://localhost:3000/api/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": "acc-001",
    "toAccountId": "acc-001",
    "amount": 100.00,
    "description": "Mesma conta"
  }'
```

### Valor Negativo
```bash
curl -X POST http://localhost:3000/api/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": "acc-001",
    "toAccountId": "acc-002",
    "amount": -100.00,
    "description": "Valor negativo"
  }'
```

### Conta Inexistente
```bash
curl -X POST http://localhost:3000/api/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": "acc-999",
    "toAccountId": "acc-002",
    "amount": 100.00,
    "description": "Conta inexistente"
  }'
```

## 6. Postman Collection

Importe esta collection no Postman:

```json
{
  "info": {
    "name": "FastPay API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Realizar Transferência",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"fromAccountId\": \"acc-001\",\n  \"toAccountId\": \"acc-002\",\n  \"amount\": 500.00,\n  \"description\": \"Teste via Postman\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/transfer",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "transfer"]
        }
      }
    },
    {
      "name": "Listar Transações",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:3000/api/transfer",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "transfer"]
        }
      }
    },
    {
      "name": "Buscar Extrato",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:3000/api/statement?accountId=acc-001",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "statement"],
          "query": [
            {
              "key": "accountId",
              "value": "acc-001"
            }
          ]
        }
      }
    }
  ]
}
```

## Executar Teste Automatizado

Execute o script de testes:

```bash
chmod +x test-api.sh
./test-api.sh
```

Nota: Requer `jq` instalado. Instale com:
```bash
# Ubuntu/Debian
sudo apt-get install jq

# macOS
brew install jq
```
