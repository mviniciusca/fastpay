import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

export const metadata = {
    title: 'FastPay - Sistema de Pagamentos',
    description: 'Plataforma de transferências e extrato financeiro',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR">
            <body className={`${inter.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    )
}
