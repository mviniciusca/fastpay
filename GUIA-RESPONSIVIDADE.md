# GUIA DE RESPONSIVIDADE - FASTPAY

## 📱 Comportamento em Diferentes Dispositivos

---

## 1. MOBILE (320px - 767px)

### Layout Vertical
- **Header**: Título e subtítulo empilhados, padding menor
- **Seleção de Conta**: Dropdown ocupa 100% da largura
- **Card de Saldo**: Informações empilhadas verticalmente
- **Transações**: Cards em lista vertical, informações empilhadas

### Elementos Visuais Mobile
```
┌─────────────────────────┐
│ FastPay                 │
│ Sistema de Pagamentos   │
├─────────────────────────┤
│                         │
│ [Selecionar Conta ▼]    │
│                         │
│ ┌─────────────────────┐ │
│ │ Titular da Conta    │ │
│ │ João Silva          │ │
│ │                     │ │
│ │ Saldo Disponível    │ │
│ │ R$ 15.000,00        │ │
│ └─────────────────────┘ │
│                         │
│ Extrato de Transações   │
│                         │
│ ┌─────────────────────┐ │
│ │ + CRÉDITO           │ │
│ │                     │ │
│ │ Descrição           │ │
│ │ Código: TRX-...     │ │
│ │ 28/10/2024 10:30    │ │
│ │                     │ │
│ │ + R$ 6.500,00       │ │
│ └─────────────────────┘ │
│                         │
│ ┌───────────────────────┐
│ ║ - DÉBITO  ALTO VALOR ║ (Fundo preto)
│ ║                      ║
│ ║ Investimento         ║
│ ║ Código: TRX-...      ║
│ ║ 22/10/2024 13:30     ║
│ ║                      ║
│ ║ - R$ 12.500,00       ║
│ └───────────────────────┘
│                         │
└─────────────────────────┘
```

### Tipografia Mobile
- Título Header: `text-3xl` (1.875rem / 30px)
- Subtítulo: `text-sm` (0.875rem / 14px)
- Saldo: `text-3xl` (1.875rem / 30px)
- Valor Transação: `text-2xl` (1.5rem / 24px)

### Espaçamento Mobile
- Padding Container: `px-4 py-6` (16px / 24px)
- Espaço entre Cards: `space-y-3` (12px)
- Padding Cards: `p-4` (16px)

---

## 2. TABLET (768px - 1023px)

### Layout Semi-responsivo
- **Header**: Mantém vertical, padding aumentado
- **Seleção de Conta**: Ainda ocupa largura total ou auto
- **Card de Saldo**: Começa a usar layout horizontal
- **Transações**: Cards maiores, mais espaçamento

### Elementos Visuais Tablet
```
┌────────────────────────────────────────┐
│ FastPay                                │
│ Sistema de Pagamentos                  │
├────────────────────────────────────────┤
│                                        │
│ [Selecionar Conta ▼]                   │
│                                        │
│ ┌────────────────────────────────────┐ │
│ │ Titular da Conta    Saldo Disponível │
│ │ João Silva          R$ 15.000,00   │ │
│ └────────────────────────────────────┘ │
│                                        │
│ Extrato de Transações    7 transações  │
│                                        │
│ ┌────────────────────────────────────┐ │
│ │ + CRÉDITO                          │ │
│ │ Descrição              + R$ 6.500,00 │
│ │ Código: TRX-20241028-001            │
│ │ 28/10/2024 10:30    Status: Concluído │
│ └────────────────────────────────────┘ │
│                                        │
└────────────────────────────────────────┘
```

### Tipografia Tablet
- Título Header: `text-4xl` (2.25rem / 36px)
- Subtítulo: `text-base` (1rem / 16px)
- Saldo: `text-4xl` (2.25rem / 36px)
- Valor Transação: `text-3xl` (1.875rem / 30px)

### Espaçamento Tablet
- Padding Container: `px-4 py-8` (16px / 32px)
- Espaço entre Cards: `space-y-4` (16px)
- Padding Cards: `p-6` (24px)

---

## 3. DESKTOP (1024px+)

### Layout Horizontal Completo
- **Header**: Padding máximo, espaçamento generoso
- **Seleção de Conta**: Largura automática (não ocupa 100%)
- **Card de Saldo**: Layout horizontal com flex-row
- **Transações**: Cards largos, informações lado a lado

### Elementos Visuais Desktop
```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  FastPay                                                     │
│  Sistema de Pagamentos                                       │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Selecionar Conta                                            │
│  [João Silva (acc-001) ▼]                                    │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Titular da Conta              Saldo Disponível       │  │
│  │  João Silva                     R$ 15.000,00          │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  Extrato de Transações                      7 transações     │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  + CRÉDITO                                             │  │
│  │                                                        │  │
│  │  Pagamento de serviços              + R$ 6.500,00     │  │
│  │  Código: TRX-20241028-001          Status: Concluído  │  │
│  │  28/10/2024 10:30                                     │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────────┐
│  ║  - DÉBITO  ALTO VALOR                                   ║
│  ║                                                          ║
│  ║  Investimento                       - R$ 12.500,00      ║
│  ║  Código: TRX-20241028-006          Status: Concluído   ║
│  ║  22/10/2024 13:30                                      ║
│  └──────────────────────────────────────────────────────────┘
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎨 SISTEMA DE CORES RESPONSIVO

### Transações Normais (< R$ 5.000)
```css
Mobile/Tablet/Desktop:
- Background: white (#FFFFFF)
- Borda: black/20 (rgba(0,0,0,0.2))
- Texto: black (#000000)
- Hover: border-black
```

### Transações de Alto Valor (≥ R$ 5.000)
```css
Mobile/Tablet/Desktop:
- Background: black (#000000)
- Borda: black (#000000) 2px
- Texto: white (#FFFFFF)
- Badge: white/20 background
```

---

## 📐 BREAKPOINTS TAILWIND

```javascript
// tailwind.config.ts
{
  sm: '640px',   // Smartphones grandes
  md: '768px',   // Tablets
  lg: '1024px',  // Desktop pequeno
  xl: '1280px',  // Desktop grande
  '2xl': '1536px' // Desktop extra grande
}
```

---

## 🎯 ELEMENTOS RESPONSIVOS DETALHADOS

### Header
```jsx
// Mobile (default)
className="text-3xl font-bold"  // 30px

// Desktop (md:)
className="text-3xl md:text-4xl font-bold"  // 36px
```

### Card de Saldo
```jsx
// Mobile: flex-col (vertical)
<div className="flex flex-col gap-4">
  <div>Titular</div>
  <div>Saldo</div>
</div>

// Desktop: flex-row (horizontal)
<div className="flex flex-col md:flex-row md:justify-between gap-4">
  <div>Titular</div>
  <div>Saldo</div>
</div>
```

### Transações
```jsx
// Mobile: p-4 (padding 16px)
// Desktop: md:p-6 (padding 24px)
className="p-4 md:p-6"

// Mobile: text-2xl (24px)
// Desktop: md:text-3xl (30px)
className="text-2xl md:text-3xl"
```

---

## ✅ CHECKLIST DE RESPONSIVIDADE

### Mobile (✓ Implementado)
- [x] Layout vertical em telas pequenas
- [x] Dropdown ocupa 100% da largura
- [x] Textos legíveis (mínimo 14px)
- [x] Áreas de toque adequadas (44px+)
- [x] Cards empilhados verticalmente
- [x] Padding reduzido para maximizar espaço
- [x] Imagens e ícones escaláveis

### Tablet (✓ Implementado)
- [x] Transição suave de mobile para desktop
- [x] Aproveitamento de espaço horizontal
- [x] Textos maiores que mobile
- [x] Cards com mais espaçamento
- [x] Layout híbrido (vertical + horizontal)

### Desktop (✓ Implementado)
- [x] Layout horizontal completo
- [x] Informações lado a lado
- [x] Espaçamento generoso
- [x] Hover effects
- [x] Tipografia otimizada para leitura
- [x] Container centralizado (max-width)

---

## 🔍 TESTE DE RESPONSIVIDADE

### Como Testar no Navegador

#### Chrome DevTools
1. Abrir DevTools (F12)
2. Clicar em "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Selecionar dispositivo ou tamanho customizado
4. Testar interações

#### Tamanhos Recomendados para Teste
- **iPhone SE**: 375x667px
- **iPhone 12 Pro**: 390x844px
- **Samsung Galaxy S20**: 360x800px
- **iPad**: 768x1024px
- **iPad Pro**: 1024x1366px
- **Desktop HD**: 1920x1080px

### Comandos de Teste Responsivo

```bash
# Abrir em diferentes dispositivos usando Chrome
google-chrome --app=http://localhost:3000 --window-size=375,667  # Mobile
google-chrome --app=http://localhost:3000 --window-size=768,1024 # Tablet
google-chrome --app=http://localhost:3000 --window-size=1920,1080 # Desktop
```

---

## 📊 PERFORMANCE EM DISPOSITIVOS

### Mobile
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Total Blocking Time**: < 200ms

### Desktop
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 1.5s
- **Total Blocking Time**: < 100ms

### Otimizações Aplicadas
- ✅ CSS minificado (Tailwind JIT)
- ✅ Font preloading (Inter)
- ✅ Next.js automatic optimizations
- ✅ Lazy loading de componentes
- ✅ Minimal JavaScript bundle

---

## 🎨 ACESSIBILIDADE RESPONSIVA

### Contraste
- Texto preto sobre branco: **21:1** (AAA)
- Texto branco sobre preto: **21:1** (AAA)
- Alto valor destacado: **Máximo contraste**

### Tamanho de Fonte Mínimo
- Mobile: 14px (0.875rem)
- Desktop: 16px (1rem)

### Áreas de Toque
- Mínimo: 44x44px (iOS HIG)
- Botões e links: 48x48px+
- Espaçamento entre elementos: 8px+

---

## 🚀 DICAS DE USO

### Para Desenvolvedores
1. Use classes Tailwind responsivas: `text-base md:text-lg`
2. Teste em dispositivos reais quando possível
3. Use mobile-first approach
4. Verifique performance em 3G/4G

### Para Usuários
1. Interface otimizada para qualquer dispositivo
2. Transações de alto valor sempre destacadas
3. Rolagem suave em todos os dispositivos
4. Dados sempre legíveis

---

**FastPay** - Experiência perfeita em qualquer tela 📱💻🖥️
