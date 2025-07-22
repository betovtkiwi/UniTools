# 🚀 Deploy no Vercel - Dashboard Privada

## 📋 Checklist Pré-Deploy

✅ **Arquivos de configuração criados:**
- `vercel.json` - Configuração do Vercel
- `.vercelignore` - Arquivos a ignorar
- `package.json` - Scripts atualizados

## 🔧 Como Fazer Deploy

### 1. **Preparar Repositório**
```bash
# Se ainda não fez:
git add .
git commit -m "Add Vercel configuration"
git push origin main
```

### 2. **No Vercel Dashboard**
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Conecte com GitHub e selecione o repositório
4. **Framework Preset**: Next.js (deve detectar automaticamente)
5. **Root Directory**: `./` (raiz do projeto)

### 3. **Configurar Variáveis de Ambiente**

No painel do Vercel, adicione estas variáveis em **Settings > Environment Variables**:

```
NEXTAUTH_URL = https://SEU_DOMINIO.vercel.app
NEXTAUTH_SECRET = sua-chave-secreta-aqui
JWT_SECRET = sua-jwt-secret-aqui  
WEBHOOK_SECRET = sua-webhook-secret-aqui
DATABASE_URL = file:./dev.db
```

**⚠️ IMPORTANTE**: Substitua `SEU_DOMINIO` pelo domínio real que o Vercel gerar.

### 4. **Comandos de Build**
O Vercel deve detectar automaticamente:
- **Build Command**: `npm run build`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

## 🗃️ Banco de Dados no Vercel

### Opção 1: SQLite (Simples)
- Funciona, mas dados são perdidos a cada deploy
- Bom para demonstração

### Opção 2: PostgreSQL (Recomendado)
1. **Crie um banco PostgreSQL gratuito:**
   - [Supabase](https://supabase.com) (gratuito)
   - [PlanetScale](https://planetscale.com) (gratuito)
   - [Neon](https://neon.tech) (gratuito)

2. **Atualize a DATABASE_URL:**
```
DATABASE_URL="postgresql://usuario:senha@host:5432/database?sslmode=require"
```

3. **Execute as migrações:**
```bash
npx prisma db push
```

## 🔍 Troubleshooting

### Erro: "Framework não detectado"
1. Certifique-se que `package.json` está na raiz
2. Verifique se tem `next` nas dependências
3. Force Framework como "Next.js"

### Erro: "Build failed"
1. Teste localmente: `npm run build`
2. Verifique se todas as dependências estão no `package.json`
3. Revise o log de build no Vercel

### Erro: "Module not found"
1. Execute `npm install` localmente
2. Verifique se todas as importações estão corretas
3. Confirme que não há imports absolutos quebrados

## 🎯 Exemplo de Deploy Bem-Sucedido

Após o deploy, você terá:
- **URL**: `https://dashboard-privada-xxx.vercel.app`
- **Build time**: ~2-3 minutos
- **Status**: Ready ✅

## 🔑 Testando o Deploy

1. **Acesse a URL gerada**
2. **Teste o login:**
   - `admin@example.com` / `admin123`
   - `free@example.com` / `demo123`

3. **Se as contas não existirem:**
   - Use qualquer email / `demo123`
   - Ou configure o banco conforme acima

## 📞 Se Ainda Não Funcionar

### Alternativas de Deploy:
1. **Netlify** - [netlify.com](https://netlify.com)
2. **Railway** - [railway.app](https://railway.app)
3. **Render** - [render.com](https://render.com)

### Ou me envie:
- Screenshot do erro no Vercel
- Log de build
- Estrutura de arquivos

---

**🎉 Com esses arquivos, o Vercel deve detectar perfeitamente seu projeto Next.js!**