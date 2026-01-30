# Entre Marés - Sistema de Gestão

Aplicação desenvolvida para gestão profissional de imóveis de temporada, focada em tranquilidade, organização e equilíbrio entre vida profissional e pessoal.

## 🚀 Tecnologias e Arquitetura "Ninja"

### Stack Principal
- **Next.js 15** (App Router + Server Actions)
- **Tailwind CSS 4** (Estilização Moderna)
- **Prisma** (ORM Type-safe)
- **Neon** (Serverless PostgreSQL)
- **Clerk** (Autenticação e Gestão de Usuários)

### ⚡ Otimizações de Performance (Free Tier Strategy)
- **Database Region:** `us-east-1` (N. Virginia) para menor latência global.
- **Vercel Region:** `iad1` (Washington, D.C.) fisicamente ao lado do banco de dados.
- **Connection Pooling:** Uso de Neon Connection Pooler para suportar milhares de conexões serverless.
- **Keep-Alive Mechanism:** Cron Job (GitHub Actions) que pinga a API a cada 10 min para evitar "Cold Starts".
- **Assets:** Otimização de imagens do Google e Vercel CDN.

### 🛡️ Segurança
- **Headers OWASP:** Proteção contra XSS, Clickjacking e Sniffing configurados no `next.config.ts`.
- **Middleware:** Proteção de rotas privadas via Clerk Middleware.
- **Environment:** Variáveis sensíveis gerenciadas via Vercel Vault.

## 📁 Estrutura do Projeto
- `src/app`: Rotas e páginas da aplicação (App Router).
- `src/components`: Componentes de UI reutilizáveis.
- `src/lib`: Utilitários e instâncias de clientes (Prisma Singleton).
- `.github/workflows`: Automação de Keep-Alive para evitar suspensão do banco.
- `public/documents`: Manuais e diretrizes estratégicas oficiais.

## 🛠️ Configuração Local
1. Renomeie `.env.example` para `.env`.
2. Configure as variáveis de ambiente:
   - `DATABASE_URL` (Neon Connection Pooler)
   - `DIRECT_URL` (Neon Direct Connection)
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY` (Clerk Dashboard)
3. Execute `npm install`.
4. Execute `npx prisma db push` para sincronizar o banco.
5. Execute `npm run dev`.

## 🌊 Diferenciais Entre Marés
- **Gestão de Tempo**: Blocos dedicados para rotina familiar.
- **Marketing Estratégico**: Sugestões de posts baseadas no tom de voz oficial.
- **Biblioteca Viva**: Acesso rápido aos manuais operacionais.

---
Desenvolvido por **smkdigitallabs**
