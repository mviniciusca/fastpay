// Tipos para o sistema de transferências
export interface Account {
  id: string;
  name: string;
  balance: number;
}

export interface Transaction {
  id: string;
  transactionCode: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
}

export interface TransferRequest {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description: string;
}

export interface TransferResponse {
  success: boolean;
  message: string;
  transaction?: Transaction;
  error?: string;
}
