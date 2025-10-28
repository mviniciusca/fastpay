import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const accountId = searchParams.get('accountId');

    if (!accountId) {
      return NextResponse.json(
        {
          success: false,
          message: 'accountId é obrigatório',
        },
        { status: 400 }
      );
    }

    const account = db.getAccount(accountId);
    
    if (!account) {
      return NextResponse.json(
        {
          success: false,
          message: 'Conta não encontrada',
        },
        { status: 404 }
      );
    }

    const transactions = db.getTransactionsByAccountId(accountId);

    return NextResponse.json(
      {
        success: true,
        account,
        transactions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao buscar extrato:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Erro ao buscar extrato',
      },
      { status: 500 }
    );
  }
}
