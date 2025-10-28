import { Account, Transaction } from '@/types';

// Simulação de banco de dados em memória
class Database {
  private accounts: Map<string, Account> = new Map();
  private transactions: Transaction[] = [];

  constructor() {
    // Inicializar com contas de exemplo
    this.accounts.set('acc-001', {
      id: 'acc-001',
      name: 'João Silva',
      balance: 15000.00,
    });
    
    this.accounts.set('acc-002', {
      id: 'acc-002',
      name: 'Maria Santos',
      balance: 8500.00,
    });

    this.accounts.set('acc-003', {
      id: 'acc-003',
      name: 'Pedro Oliveira',
      balance: 25000.00,
    });

    // Adicionar transações de exemplo para o extrato
    this.transactions.push(
      {
        id: '1',
        transactionCode: 'TRX-20241028-001',
        fromAccountId: 'acc-001',
        toAccountId: 'acc-002',
        amount: 1200.00,
        description: 'Pagamento de aluguel',
        timestamp: new Date('2024-10-01T10:30:00'),
        status: 'completed',
      },
      {
        id: '2',
        transactionCode: 'TRX-20241028-002',
        fromAccountId: 'acc-003',
        toAccountId: 'acc-001',
        amount: 6500.00,
        description: 'Pagamento de serviços',
        timestamp: new Date('2024-10-05T14:20:00'),
        status: 'completed',
      },
      {
        id: '3',
        transactionCode: 'TRX-20241028-003',
        fromAccountId: 'acc-001',
        toAccountId: 'acc-003',
        amount: 350.00,
        description: 'Transferência entre contas',
        timestamp: new Date('2024-10-10T09:15:00'),
        status: 'completed',
      },
      {
        id: '4',
        transactionCode: 'TRX-20241028-004',
        fromAccountId: 'acc-002',
        toAccountId: 'acc-001',
        amount: 8200.00,
        description: 'Compra de equipamentos',
        timestamp: new Date('2024-10-15T16:45:00'),
        status: 'completed',
      },
      {
        id: '5',
        transactionCode: 'TRX-20241028-005',
        fromAccountId: 'acc-001',
        toAccountId: 'acc-002',
        amount: 450.00,
        description: 'Pagamento de conta de luz',
        timestamp: new Date('2024-10-20T11:00:00'),
        status: 'completed',
      },
      {
        id: '6',
        transactionCode: 'TRX-20241028-006',
        fromAccountId: 'acc-003',
        toAccountId: 'acc-001',
        amount: 12500.00,
        description: 'Investimento',
        timestamp: new Date('2024-10-22T13:30:00'),
        status: 'completed',
      },
      {
        id: '7',
        transactionCode: 'TRX-20241028-007',
        fromAccountId: 'acc-001',
        toAccountId: 'acc-003',
        amount: 280.00,
        description: 'Reembolso',
        timestamp: new Date('2024-10-25T10:00:00'),
        status: 'completed',
      }
    );
  }

  getAccount(id: string): Account | undefined {
    return this.accounts.get(id);
  }

  updateAccountBalance(id: string, newBalance: number): void {
    const account = this.accounts.get(id);
    if (account) {
      account.balance = newBalance;
    }
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  getAllTransactions(): Transaction[] {
    return this.transactions.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  getTransactionsByAccountId(accountId: string): Transaction[] {
    return this.transactions
      .filter(t => t.fromAccountId === accountId || t.toAccountId === accountId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }
}

// Singleton da base de dados
export const db = new Database();
