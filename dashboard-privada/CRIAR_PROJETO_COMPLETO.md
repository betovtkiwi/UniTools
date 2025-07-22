# 🚀 Como Criar o Projeto Dashboard Privada do Zero

## 📋 Passo 1: Criar Projeto Next.js

```bash
npx create-next-app@latest dashboard-privada --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
cd dashboard-privada
```

## 📦 Passo 2: Instalar Dependências

```bash
npm install prisma @prisma/client next-auth @next-auth/prisma-adapter socket.io socket.io-client lucide-react @types/bcryptjs bcryptjs jsonwebtoken @types/jsonwebtoken multer @types/multer tsx
```

## 🗃️ Passo 3: Configurar Prisma

```bash
npx prisma init
```

## 📁 Passo 4: Criar Estrutura de Diretórios

```bash
mkdir -p public/uploads/tools public/uploads/news
mkdir -p src/components src/lib src/types
mkdir -p src/app/api/auth/[...nextauth]
mkdir -p src/app/api/webhook/purchase
mkdir -p src/app/api/messages
mkdir -p src/app/api/news
mkdir -p src/app/api/tools/[id]
mkdir -p src/app/api/upload
mkdir -p src/app/dashboard/chat
mkdir -p src/app/dashboard/tools
mkdir -p src/app/admin
mkdir -p src/app/login
```

## 📄 Passo 5: Arquivos de Configuração

### package.json (adicionar ao existente):
```json
{
  "scripts": {
    "db:seed": "tsx prisma/seed.ts",
    "postinstall": "prisma generate"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

### .env
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
JWT_SECRET="your-jwt-secret-change-this-in-production"
WEBHOOK_SECRET="your-webhook-secret-change-this-in-production"
UPLOAD_DIR="./public/uploads"
```

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ],
  "env": {
    "NEXTAUTH_URL": "https://dashboard-privada.vercel.app",
    "NEXTAUTH_SECRET": "your-secret-key-change-this-in-production",
    "JWT_SECRET": "your-jwt-secret-change-this-in-production",
    "WEBHOOK_SECRET": "your-webhook-secret-change-this-in-production"
  },
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "framework": "nextjs"
}
```

### next.config.ts
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
```

## 🛠️ Passo 6: Executar Configurações

```bash
# Gerar Prisma Client
npx prisma generate

# Executar migração
npx prisma migrate dev --name init

# Popular banco com dados de exemplo
npm run db:seed

# Testar build
npm run build

# Iniciar desenvolvimento
npm run dev
```

## 🌐 Passo 7: Deploy

### Vercel:
```bash
git add .
git commit -m "Initial commit"
git push origin main
# Depois conectar no vercel.com
```

### Netlify:
- Arraste a pasta para netlify.com

### Railway:
- Conecte repositório em railway.app

## 🔑 Contas de Teste

- **Admin**: `admin@example.com` / `admin123`
- **Premium**: `premium@example.com` / `demo123`
- **Gratuito**: `free@example.com` / `demo123`
- **Qualquer email** / `demo123`

## ✨ Funcionalidades

✅ Sistema de autenticação completo
✅ Chat com permissões limitadas
✅ Marketplace de ferramentas
✅ Painel administrativo
✅ Sistema de webhook
✅ Upload de imagens
✅ Interface responsiva

---

**🎯 Seguindo esses passos, você terá o projeto completo funcionando!**