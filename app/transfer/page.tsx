'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Account } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function Transfer() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [fromAccountId, setFromAccountId] = useState('acc-001');
    const [toAccountId, setToAccountId] = useState('acc-002');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [transactionCode, setTransactionCode] = useState('');

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            // Buscar saldos atualizados de todas as contas
            const accountIds = ['acc-001', 'acc-002', 'acc-003'];
            const accountPromises = accountIds.map(id =>
                fetch(`/api/statement?accountId=${id}`).then(res => res.json())
            );
            const results = await Promise.all(accountPromises);
            const accountsData = results
                .filter(r => r.success)
                .map(r => r.account);
            setAccounts(accountsData);
        } catch (error) {
            console.error('Erro ao buscar contas:', error);
        }
    };

    const handleTransfer = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setTransactionCode('');

        try {
            const response = await fetch('/api/transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fromAccountId,
                    toAccountId,
                    amount: parseFloat(amount),
                    description,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage({
                    type: 'success',
                    text: data.message || 'Transferência realizada com sucesso!'
                });
                setTransactionCode(data.transaction.transactionCode);
                setAmount('');
                setDescription('');
                // Atualizar saldos
                await fetchAccounts();
            } else {
                setMessage({
                    type: 'error',
                    text: data.error || 'Erro ao realizar transferência'
                });
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: 'Erro de conexão com o servidor'
            });
        } finally {
            setLoading(false);
        }
    };

    const selectedAccount = accounts.find(acc => acc.id === fromAccountId);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-primary-600 to-primary-500 border-b border-primary-700 shadow-lg">
                <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/30">
                                <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white">FastPay Bank</h1>
                                <p className="text-xs md:text-sm text-white/80">Transferência</p>
                            </div>
                        </Link>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/api-docs"
                                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="hidden sm:inline">API Docs</span>
                            </Link>
                            <Link
                                href="/"
                                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span className="hidden sm:inline">Voltar</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-6 md:py-8">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Accounts Overview */}
                    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            Saldos Disponíveis
                        </h3>
                        <div className="space-y-3">
                            {accounts.map(account => (
                                <div key={account.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div>
                                        <p className="font-semibold text-gray-900">{account.name}</p>
                                        <p className="text-xs text-gray-500">{account.id}</p>
                                    </div>
                                    <p className="text-lg font-bold text-primary-600">{formatCurrency(account.balance)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Selected Account Balance */}
                    {selectedAccount && (
                        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 shadow-lg text-white">
                            <h3 className="text-sm font-medium text-white/80 mb-2">Saldo da Conta Origem</h3>
                            <p className="text-3xl font-bold mb-2">{formatCurrency(selectedAccount.balance)}</p>
                            <p className="text-sm text-white/90">{selectedAccount.name}</p>
                            <div className="mt-4 pt-4 border-t border-white/20">
                                <p className="text-xs text-white/70 mb-1">Agência: 0001</p>
                                <p className="text-xs text-white/70">Conta: {selectedAccount.id.split('-')[1]}-0</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Transfer Form */}
                <div className="bg-white rounded-xl p-6 md:p-8 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-primary-100 rounded-lg">
                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Nova Transferência</h2>
                            <p className="text-sm text-gray-600">Preencha os dados para realizar a transferência</p>
                        </div>
                    </div>

                    <form onSubmit={handleTransfer} className="space-y-6">
                        {/* From Account */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Conta de Origem
                            </label>
                            <select
                                value={fromAccountId}
                                onChange={(e) => setFromAccountId(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all font-medium"
                                required
                            >
                                {accounts.map(account => (
                                    <option key={account.id} value={account.id}>
                                        {account.name} - {formatCurrency(account.balance)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* To Account */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Conta de Destino
                            </label>
                            <select
                                value={toAccountId}
                                onChange={(e) => setToAccountId(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all font-medium"
                                required
                            >
                                {accounts.filter(acc => acc.id !== fromAccountId).map(account => (
                                    <option key={account.id} value={account.id}>
                                        {account.name} - {account.id}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Amount */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Valor da Transferência
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">R$</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0,00"
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all font-medium text-lg"
                                    required
                                />
                            </div>
                            {selectedAccount && amount && parseFloat(amount) > selectedAccount.balance && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Saldo insuficiente! Disponível: {formatCurrency(selectedAccount.balance)}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Descrição
                            </label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Ex: Pagamento de aluguel"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all font-medium"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || (!!selectedAccount && !!amount && parseFloat(amount) > selectedAccount.balance)}
                            className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Processando...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Realizar Transferência
                                </>
                            )}
                        </button>
                    </form>

                    {/* Message */}
                    {message && (
                        <div className={`mt-6 p-4 rounded-lg border-2 ${message.type === 'success'
                                ? 'bg-green-50 border-green-500 text-green-800'
                                : 'bg-red-50 border-red-500 text-red-800'
                            }`}>
                            <div className="flex items-start gap-3">
                                {message.type === 'success' ? (
                                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                )}
                                <div className="flex-1">
                                    <p className="font-semibold">{message.text}</p>
                                    {transactionCode && (
                                        <p className="mt-2 text-sm">
                                            <strong>Código da transação:</strong>
                                            <code className="ml-2 px-2 py-1 bg-white rounded font-mono text-xs">{transactionCode}</code>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div className="text-sm text-blue-800">
                            <p className="font-semibold mb-1">Como funciona:</p>
                            <ul className="space-y-1">
                                <li>• A transferência é processada em tempo real</li>
                                <li>• O sistema valida automaticamente se há saldo suficiente</li>
                                <li>• Cada transferência recebe um código único de rastreamento</li>
                                <li>• Os saldos são atualizados instantaneamente</li>
                                <li>• Você pode conferir o resultado no extrato</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <p className="text-sm text-gray-600 text-center">
                        Criado por{' '}
                        <a
                            href="https://github.com/mviniciusca"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700 font-medium hover:underline"
                        >
                            Marcos Coelho
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
}
