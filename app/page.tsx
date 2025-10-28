'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Transaction, Account } from '@/types';
import { formatCurrency, formatDateTime } from '@/lib/utils';

export default function Home() {
    const [account, setAccount] = useState<Account | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAccountId, setSelectedAccountId] = useState('acc-001');
    const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');

    useEffect(() => {
        fetchStatement(selectedAccountId);
    }, [selectedAccountId]);

    const fetchStatement = async (accountId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/statement?accountId=${accountId}`);
            const data = await response.json();

            if (data.success) {
                setAccount(data.account);
                setTransactions(data.transactions);
            }
        } catch (error) {
            console.error('Erro ao carregar extrato:', error);
        } finally {
            setLoading(false);
        }
    };

    const isHighValue = (amount: number) => amount >= 5000;

    const getTransactionType = (transaction: Transaction, accountId: string) => {
        return transaction.fromAccountId === accountId ? 'debit' : 'credit';
    };

    const filteredTransactions = transactions.filter(transaction => {
        if (filter === 'all') return true;
        const type = getTransactionType(transaction, selectedAccountId);
        return type === filter;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-primary-600 to-primary-500 border-b border-primary-700 shadow-lg">
                <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/30">
                                <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white">FastPay Bank</h1>
                                <p className="text-xs md:text-sm text-white/80">Internet Banking</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/transfer"
                                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                                <span className="hidden sm:inline">Transferir</span>
                            </Link>
                            <Link
                                href="/api-docs"
                                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="hidden sm:inline">API Docs</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-6 md:py-8">
                {/* Account Selection & Info */}
                <div className="bg-white rounded-xl p-4 md:p-6 mb-6 shadow-md border border-gray-200">
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-end">
                        <div className="flex-1">
                            <label htmlFor="account" className="block text-sm font-semibold text-gray-700 mb-2">
                                Selecionar Conta
                            </label>
                            <select
                                id="account"
                                value={selectedAccountId}
                                onChange={(e) => setSelectedAccountId(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all font-medium"
                            >
                                <option value="acc-001">João Silva - Conta Corrente</option>
                                <option value="acc-002">Maria Santos - Conta Corrente</option>
                                <option value="acc-003">Pedro Oliveira - Conta Corrente</option>
                            </select>
                        </div>

                        {/* Account Info */}
                        <div className="flex gap-6 text-sm pb-3">
                            <div>
                                <p className="text-gray-500 mb-1">Agência</p>
                                <p className="font-bold text-gray-900 text-base">0001</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Conta</p>
                                <p className="font-bold text-gray-900 text-base">{selectedAccountId.split('-')[1]}-0</p>
                            </div>
                        </div>

                        <div className="flex-1 lg:flex-initial">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Filtrar por Tipo
                            </label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`flex-1 lg:flex-initial px-4 py-3 rounded-lg font-medium transition-all border-2 ${filter === 'all'
                                        ? 'bg-primary-500 text-white border-primary-500 shadow-md'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                                        }`}
                                >
                                    Todas
                                </button>
                                <button
                                    onClick={() => setFilter('credit')}
                                    className={`flex-1 lg:flex-initial px-4 py-3 rounded-lg font-medium transition-all border-2 ${filter === 'credit'
                                        ? 'bg-primary-500 text-white border-primary-500 shadow-md'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                                        }`}
                                >
                                    Entradas
                                </button>
                                <button
                                    onClick={() => setFilter('debit')}
                                    className={`flex-1 lg:flex-initial px-4 py-3 rounded-lg font-medium transition-all border-2 ${filter === 'debit'
                                        ? 'bg-primary-500 text-white border-primary-500 shadow-md'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                                        }`}
                                >
                                    Saídas
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="bg-white px-8 py-6 rounded-2xl shadow-card">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-gray-700 text-lg font-medium">Carregando...</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Account Balance Card */}
                        {account && (
                            <div className="bg-gradient-green rounded-2xl p-6 md:p-8 mb-6 shadow-card-hover relative overflow-hidden">
                                {/* Pattern Background */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
                                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
                                </div>

                                <div className="relative">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                                <p className="text-sm md:text-base text-white/80 font-medium">
                                                    Conta Corrente
                                                </p>
                                            </div>
                                            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">{account.name}</h2>
                                            <p className="text-sm text-white/70">Conta {selectedAccountId}</p>
                                        </div>

                                        <div className="text-left md:text-right">
                                            <p className="text-sm md:text-base text-white/80 mb-2 flex md:justify-end items-center gap-2">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                                </svg>
                                                Saldo Disponível
                                            </p>
                                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{formatCurrency(account.balance)}</h2>
                                            <div className="flex md:justify-end gap-4 text-xs text-white/70">
                                                <div className="flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>Atualizado agora</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/20">
                                        <Link href="/transfer" className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white font-medium text-sm">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                            </svg>
                                            Transferir
                                        </Link>
                                        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white font-medium text-sm">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                            Pagar
                                        </button>
                                        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white font-medium text-sm">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                            </svg>
                                            Depositar
                                        </button>
                                        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white font-medium text-sm">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Extrato
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}                        {/* Transactions List */}
                        <div className="glass-effect rounded-2xl p-4 md:p-6 shadow-card">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b-2 border-gray-100">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Extrato de Transações</h3>
                                    <p className="text-sm text-gray-500">Últimas movimentações da sua conta</p>
                                </div>
                                <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg text-sm font-semibold border border-primary-200">
                                    {filteredTransactions.length} {filteredTransactions.length === 1 ? 'transação' : 'transações'}
                                </span>
                            </div>

                            {filteredTransactions.length === 0 ? (
                                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                    <p className="text-gray-500 font-medium">Nenhuma transação encontrada</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredTransactions.map((transaction) => {
                                        const type = getTransactionType(transaction, selectedAccountId);
                                        const isHigh = isHighValue(transaction.amount);

                                        return (
                                            <div
                                                key={transaction.id}
                                                className={`
                          rounded-xl p-5 md:p-6 transition-all duration-300 border-l-4 bg-white shadow-sm hover:shadow-md
                          ${isHigh
                                                        ? 'border-warning-500 bg-gradient-to-r from-warning-50/50 to-white'
                                                        : type === 'credit'
                                                            ? 'border-success-500 hover:border-success-600'
                                                            : 'border-danger-500 hover:border-danger-600'
                                                    }
                        `}
                                            >
                                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                                    {/* Left side - Transaction Info */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                                                            {/* Transaction Icon */}
                                                            <div className={`p-2 rounded-lg ${type === 'credit' ? 'bg-success-100' : 'bg-danger-100'}`}>
                                                                {type === 'credit' ? (
                                                                    <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                                                    </svg>
                                                                ) : (
                                                                    <svg className="w-5 h-5 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                                                    </svg>
                                                                )}
                                                            </div>

                                                            <div className="flex-1">
                                                                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                                                                    {transaction.description}
                                                                </h4>
                                                                <div className="flex items-center gap-2 flex-wrap">
                                                                    <span
                                                                        className={`
                                  px-2.5 py-0.5 text-xs font-medium rounded-md
                                  ${type === 'credit'
                                                                                ? 'bg-success-100 text-success-700'
                                                                                : 'bg-danger-100 text-danger-700'
                                                                            }
                                `}
                                                                    >
                                                                        {type === 'credit' ? 'Entrada' : 'Saída'}
                                                                    </span>
                                                                    {isHigh && (
                                                                        <span className="px-2.5 py-0.5 text-xs font-medium bg-warning-100 text-warning-700 rounded-md flex items-center gap-1">
                                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                            </svg>
                                                                            Alto Valor
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col gap-2 text-xs md:text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                <p className="flex items-center gap-2">
                                                                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                                    </svg>
                                                                    <span className="font-medium">{formatDateTime(transaction.timestamp)}</span>
                                                                </p>
                                                                <p className="flex items-center gap-2">
                                                                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                                                    </svg>
                                                                    <span className="font-mono text-xs">{transaction.transactionCode}</span>
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                                </svg>
                                                                <span className="text-gray-500">
                                                                    {type === 'credit' ? 'De: ' : 'Para: '}
                                                                    <span className="font-medium text-gray-700">
                                                                        {type === 'credit' ? transaction.fromAccountId : transaction.toAccountId}
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Right side - Amount */}
                                                    <div className="text-left md:text-right md:min-w-[180px]">
                                                        <p className={`text-2xl md:text-3xl font-bold mb-2 ${type === 'credit' ? 'text-success-600' : 'text-danger-600'
                                                            }`}>
                                                            {type === 'credit' ? '+' : '-'} {formatCurrency(transaction.amount)}
                                                        </p>
                                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${transaction.status === 'completed'
                                                            ? 'bg-success-100 text-success-700'
                                                            : 'bg-warning-100 text-warning-700'
                                                            }`}>
                                                            <span className={`w-2 h-2 rounded-full ${transaction.status === 'completed' ? 'bg-success-500' : 'bg-warning-500'
                                                                }`}></span>
                                                            {transaction.status === 'completed' ? 'Concluído' : 'Pendente'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* High Value Alert */}
                        {transactions.some(t => isHighValue(t.amount)) && (
                            <div className="mt-6 bg-white rounded-2xl p-4 md:p-6 border-2 border-warning-300 shadow-card">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-warning-100 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-warning-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-1">Transações de Alto Valor</h4>
                                        <p className="text-sm text-gray-600">
                                            Transações acima de <strong>R$ 5.000,00</strong> estão destacadas para seu controle financeiro.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-sm text-gray-600">
                                © 2024 <strong className="text-primary-600">FastPay</strong> - Pagamentos Simples e Seguros
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Criado por{' '}
                                <a
                                    href="https://github.com/mviniciusca"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                                >
                                    Marcos Coelho
                                </a>
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            Protegido e Criptografado
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}