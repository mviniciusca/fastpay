'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ApiDocs() {
    const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

    const copyToClipboard = (text: string, endpoint: string) => {
        navigator.clipboard.writeText(text);
        setCopiedEndpoint(endpoint);
        setTimeout(() => setCopiedEndpoint(null), 2000);
    };

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001';

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
                                <p className="text-xs md:text-sm text-white/80">Documentação da API</p>
                            </div>
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Voltar ao Extrato
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-6 md:py-8">
                {/* Intro */}
                <div className="bg-white rounded-xl p-6 md:p-8 mb-6 shadow-md border border-gray-200">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-primary-100 rounded-lg">
                            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">API REST - FastPay</h2>
                            <p className="text-gray-600">Documentação completa dos endpoints disponíveis para integração com o sistema de pagamentos.</p>
                        </div>
                    </div>
                    <div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded">
                        <p className="text-sm text-primary-800">
                            <strong>Base URL:</strong> <code className="bg-white px-2 py-1 rounded font-mono text-xs">{baseUrl}</code>
                        </p>
                    </div>
                </div>

                {/* Endpoint 1: POST /api/transfer */}
                <div className="bg-white rounded-xl p-6 md:p-8 mb-6 shadow-md border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                        <span className="inline-flex items-center px-4 py-2 bg-green-500 text-white font-bold rounded-lg text-sm w-fit">
                            POST
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">/api/transfer</h3>
                    </div>

                    <p className="text-gray-600 mb-6">Realiza uma transferência entre contas com validação de saldo e geração de código único.</p>

                    {/* Request */}
                    <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                            </svg>
                            Request Body
                        </h4>
                        <div className="bg-gray-900 rounded-lg p-4 relative overflow-hidden">
                            <button
                                onClick={() => copyToClipboard(JSON.stringify({
                                    fromAccountId: "acc-001",
                                    toAccountId: "acc-002",
                                    amount: 150.00,
                                    description: "Transferência de exemplo"
                                }, null, 2), 'transfer-request')}
                                className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                                title="Copiar"
                            >
                                {copiedEndpoint === 'transfer-request' ? (
                                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                    </svg>
                                )}
                            </button>
                            <pre className="text-sm text-gray-100 overflow-x-auto">
                                {`{
  "fromAccountId": "acc-001",
  "toAccountId": "acc-002",
  "amount": 150.00,
  "description": "Transferência de exemplo"
}`}
                            </pre>
                        </div>
                    </div>

                    {/* Response Success */}
                    <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Response (200 OK)
                        </h4>
                        <div className="bg-gray-900 rounded-lg p-4 relative">
                            <button
                                onClick={() => copyToClipboard(JSON.stringify({
                                    success: true,
                                    message: "Transferência realizada com sucesso",
                                    transaction: {
                                        id: "1",
                                        transactionCode: "TRX-20241028-ABC123",
                                        fromAccountId: "acc-001",
                                        toAccountId: "acc-002",
                                        amount: 150.00,
                                        description: "Transferência de exemplo",
                                        timestamp: "2024-10-28T10:30:00.000Z",
                                        status: "completed"
                                    }
                                }, null, 2), 'transfer-success')}
                                className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                                {copiedEndpoint === 'transfer-success' ? (
                                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                    </svg>
                                )}
                            </button>
                            <pre className="text-sm text-gray-100 overflow-x-auto">
                                {`{
  "success": true,
  "message": "Transferência realizada com sucesso",
  "transaction": {
    "id": "1",
    "transactionCode": "TRX-20241028-ABC123",
    "fromAccountId": "acc-001",
    "toAccountId": "acc-002",
    "amount": 150.00,
    "description": "Transferência de exemplo",
    "timestamp": "2024-10-28T10:30:00.000Z",
    "status": "completed"
  }
}`}
                            </pre>
                        </div>
                    </div>

                    {/* Response Error */}
                    <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            Response (400 Bad Request)
                        </h4>
                        <div className="bg-gray-900 rounded-lg p-4">
                            <pre className="text-sm text-gray-100 overflow-x-auto">
                                {`{
  "success": false,
  "error": "Saldo insuficiente"
}`}
                            </pre>
                        </div>
                    </div>

                    {/* Validations */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <h4 className="text-sm font-semibold text-blue-900 mb-2">Validações:</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>✓ Campos obrigatórios: fromAccountId, toAccountId, amount, description</li>
                            <li>✓ Contas devem ser diferentes</li>
                            <li>✓ Valor deve ser positivo</li>
                            <li>✓ Ambas as contas devem existir</li>
                            <li>✓ Saldo da conta de origem deve ser suficiente</li>
                            <li>✓ Código único gerado automaticamente (formato: TRX-YYYYMMDD-XXXXXXXX)</li>
                        </ul>
                    </div>
                </div>

                {/* Endpoint 2: GET /api/transfer */}
                <div className="bg-white rounded-xl p-6 md:p-8 mb-6 shadow-md border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                        <span className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded-lg text-sm w-fit">
                            GET
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">/api/transfer</h3>
                    </div>

                    <p className="text-gray-600 mb-6">Lista todas as transferências realizadas no sistema.</p>

                    {/* Response */}
                    <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Response (200 OK)
                        </h4>
                        <div className="bg-gray-900 rounded-lg p-4 relative">
                            <button
                                onClick={() => copyToClipboard(JSON.stringify({
                                    success: true,
                                    transfers: [
                                        {
                                            id: "1",
                                            transactionCode: "TRX-20241028-ABC123",
                                            fromAccountId: "acc-001",
                                            toAccountId: "acc-002",
                                            amount: 150.00,
                                            description: "Transferência 1",
                                            timestamp: "2024-10-28T10:30:00.000Z",
                                            status: "completed"
                                        }
                                    ]
                                }, null, 2), 'get-transfers')}
                                className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                                {copiedEndpoint === 'get-transfers' ? (
                                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                    </svg>
                                )}
                            </button>
                            <pre className="text-sm text-gray-100 overflow-x-auto">
                                {`{
  "success": true,
  "transfers": [
    {
      "id": "1",
      "transactionCode": "TRX-20241028-ABC123",
      "fromAccountId": "acc-001",
      "toAccountId": "acc-002",
      "amount": 150.00,
      "description": "Transferência 1",
      "timestamp": "2024-10-28T10:30:00.000Z",
      "status": "completed"
    }
  ]
}`}
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Endpoint 3: GET /api/statement */}
                <div className="bg-white rounded-xl p-6 md:p-8 mb-6 shadow-md border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                        <span className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded-lg text-sm w-fit">
                            GET
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">/api/statement</h3>
                    </div>

                    <p className="text-gray-600 mb-6">Retorna o extrato completo de uma conta específica.</p>

                    {/* Query Parameters */}
                    <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Query Parameters
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <p className="text-sm text-gray-700"><strong>accountId</strong> (obrigatório) - ID da conta para buscar o extrato</p>
                            <p className="text-sm text-gray-500 mt-2">Exemplo: <code className="bg-white px-2 py-1 rounded font-mono text-xs">/api/statement?accountId=acc-001</code></p>
                        </div>
                    </div>

                    {/* Response */}
                    <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Response (200 OK)
                        </h4>
                        <div className="bg-gray-900 rounded-lg p-4 relative">
                            <button
                                onClick={() => copyToClipboard(JSON.stringify({
                                    success: true,
                                    account: {
                                        id: "acc-001",
                                        name: "João Silva",
                                        balance: 10000.00
                                    },
                                    transactions: [
                                        {
                                            id: "1",
                                            transactionCode: "TRX-20241028-ABC123",
                                            fromAccountId: "acc-001",
                                            toAccountId: "acc-002",
                                            amount: 150.00,
                                            description: "Transferência",
                                            timestamp: "2024-10-28T10:30:00.000Z",
                                            status: "completed"
                                        }
                                    ]
                                }, null, 2), 'statement')}
                                className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                                {copiedEndpoint === 'statement' ? (
                                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                    </svg>
                                )}
                            </button>
                            <pre className="text-sm text-gray-100 overflow-x-auto">
                                {`{
  "success": true,
  "account": {
    "id": "acc-001",
    "name": "João Silva",
    "balance": 10000.00
  },
  "transactions": [
    {
      "id": "1",
      "transactionCode": "TRX-20241028-ABC123",
      "fromAccountId": "acc-001",
      "toAccountId": "acc-002",
      "amount": 150.00,
      "description": "Transferência",
      "timestamp": "2024-10-28T10:30:00.000Z",
      "status": "completed"
    }
  ]
}`}
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Test Accounts */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 md:p-8 mb-6 shadow-md border-2 border-primary-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Contas de Teste
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg p-4 border border-primary-200">
                            <p className="font-bold text-gray-900">acc-001</p>
                            <p className="text-sm text-gray-600">João Silva</p>
                            <p className="text-lg font-semibold text-primary-600 mt-2">R$ 10.000,00</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-primary-200">
                            <p className="font-bold text-gray-900">acc-002</p>
                            <p className="text-sm text-gray-600">Maria Santos</p>
                            <p className="text-lg font-semibold text-primary-600 mt-2">R$ 5.000,00</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-primary-200">
                            <p className="font-bold text-gray-900">acc-003</p>
                            <p className="text-sm text-gray-600">Pedro Oliveira</p>
                            <p className="text-lg font-semibold text-primary-600 mt-2">R$ 8.500,00</p>
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
