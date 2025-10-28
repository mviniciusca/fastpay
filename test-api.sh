#!/bin/bash

echo "==================================================================="
echo "FASTPAY - TESTES DA API DE TRANSFERÊNCIAS"
echo "==================================================================="
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:3000"

echo -e "${YELLOW}1. Testando transferência válida (R$ 500,00)${NC}"
echo "-------------------------------------------------------------------"
curl -X POST ${BASE_URL}/api/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": "acc-001",
    "toAccountId": "acc-002",
    "amount": 500.00,
    "description": "Teste de transferência válida"
  }' | jq '.'
echo -e "\n"

sleep 2

echo -e "${YELLOW}2. Testando transferência com valor alto (R$ 8.000,00)${NC}"
echo "-------------------------------------------------------------------"
curl -X POST ${BASE_URL}/api/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": "acc-003",
    "toAccountId": "acc-001",
    "amount": 8000.00,
    "description": "Transferência de alto valor"
  }' | jq '.'
echo -e "\n"

sleep 2

echo -e "${RED}3. Testando transferência com saldo insuficiente${NC}"
echo "-------------------------------------------------------------------"
curl -X POST ${BASE_URL}/api/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": "acc-002",
    "toAccountId": "acc-001",
    "amount": 999999.00,
    "description": "Teste saldo insuficiente"
  }' | jq '.'
echo -e "\n"

sleep 2

echo -e "${RED}4. Testando transferência para a mesma conta${NC}"
echo "-------------------------------------------------------------------"
curl -X POST ${BASE_URL}/api/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": "acc-001",
    "toAccountId": "acc-001",
    "amount": 100.00,
    "description": "Teste mesma conta"
  }' | jq '.'
echo -e "\n"

sleep 2

echo -e "${RED}5. Testando transferência com valor inválido (negativo)${NC}"
echo "-------------------------------------------------------------------"
curl -X POST ${BASE_URL}/api/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": "acc-001",
    "toAccountId": "acc-002",
    "amount": -100.00,
    "description": "Teste valor negativo"
  }' | jq '.'
echo -e "\n"

sleep 2

echo -e "${GREEN}6. Buscando todas as transações${NC}"
echo "-------------------------------------------------------------------"
curl -X GET ${BASE_URL}/api/transfer | jq '.'
echo -e "\n"

sleep 2

echo -e "${GREEN}7. Buscando extrato da conta acc-001${NC}"
echo "-------------------------------------------------------------------"
curl -X GET "${BASE_URL}/api/statement?accountId=acc-001" | jq '.'
echo -e "\n"

sleep 2

echo -e "${GREEN}8. Buscando extrato da conta acc-002${NC}"
echo "-------------------------------------------------------------------"
curl -X GET "${BASE_URL}/api/statement?accountId=acc-002" | jq '.'
echo -e "\n"

echo "==================================================================="
echo "TESTES CONCLUÍDOS!"
echo "==================================================================="
