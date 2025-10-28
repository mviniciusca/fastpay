import { v4 as uuidv4 } from 'uuid';

/**
 * Gera um código único para a transação
 * Formato: TRX-AAAAMMDD-XXX
 */
export function generateTransactionCode(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const uniqueId = uuidv4().split('-')[0].toUpperCase();
  
  return `TRX-${year}${month}${day}-${uniqueId}`;
}

/**
 * Valida se o valor é positivo
 */
export function validateAmount(amount: number): boolean {
  return amount > 0;
}

/**
 * Formata valor em Real Brasileiro
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Formata data e hora
 */
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}
