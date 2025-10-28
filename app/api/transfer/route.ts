import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import { generateTransactionCode, validateAmount } from '@/lib/utils';
import { TransferRequest, TransferResponse, Transaction } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: TransferRequest = await request.json();
    const { fromAccountId, toAccountId, amount, description } = body;

    // Validação dos campos obrigatórios
    if (!fromAccountId || !toAccountId || !amount) {
      return NextResponse.json<TransferResponse>(
        {
          success: false,
          message: 'Campos obrigatórios faltando',
          error: 'fromAccountId, toAccountId e amount são obrigatórios',
        },
        { status: 400 }
      );
    }

    // Validação: Contas diferentes
    if (fromAccountId === toAccountId) {
      return NextResponse.json<TransferResponse>(
        {
          success: false,
          message: 'Transferência inválida',
          error: 'Não é possível transferir para a mesma conta',
        },
        { status: 400 }
      );
    }

    // Validação do valor
    if (!validateAmount(amount)) {
      return NextResponse.json<TransferResponse>(
        {
          success: false,
          message: 'Valor inválido',
          error: 'O valor deve ser maior que zero',
        },
        { status: 400 }
      );
    }

    // Buscar contas
    const fromAccount = db.getAccount(fromAccountId);
    const toAccount = db.getAccount(toAccountId);

    if (!fromAccount) {
      return NextResponse.json<TransferResponse>(
        {
          success: false,
          message: 'Conta de origem não encontrada',
          error: `Conta ${fromAccountId} não existe`,
        },
        { status: 404 }
      );
    }

    if (!toAccount) {
      return NextResponse.json<TransferResponse>(
        {
          success: false,
          message: 'Conta de destino não encontrada',
          error: `Conta ${toAccountId} não existe`,
        },
        { status: 404 }
      );
    }

    // Validação de saldo
    if (fromAccount.balance < amount) {
      return NextResponse.json<TransferResponse>(
        {
          success: false,
          message: 'Saldo insuficiente',
          error: `Saldo disponível: R$ ${fromAccount.balance.toFixed(2)}. Valor solicitado: R$ ${amount.toFixed(2)}`,
        },
        { status: 400 }
      );
    }

    // Gerar código único da transação
    const transactionCode = generateTransactionCode();

    // Criar registro da transação
    const transaction: Transaction = {
      id: `txn-${Date.now()}`,
      transactionCode,
      fromAccountId,
      toAccountId,
      amount,
      description: description || 'Transferência',
      timestamp: new Date(),
      status: 'completed',
    };

    // Executar transferência
    db.updateAccountBalance(fromAccountId, fromAccount.balance - amount);
    db.updateAccountBalance(toAccountId, toAccount.balance + amount);
    db.addTransaction(transaction);

    // Retornar sucesso
    return NextResponse.json<TransferResponse>(
      {
        success: true,
        message: 'Transferência realizada com sucesso',
        transaction,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro ao processar transferência:', error);
    return NextResponse.json<TransferResponse>(
      {
        success: false,
        message: 'Erro interno do servidor',
        error: 'Não foi possível processar a transferência',
      },
      { status: 500 }
    );
  }
}

// GET - Listar todas as transações
export async function GET() {
  try {
    const transactions = db.getAllTransactions();
    return NextResponse.json(
      {
        success: true,
        transactions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Erro ao buscar transações',
      },
      { status: 500 }
    );
  }
}
