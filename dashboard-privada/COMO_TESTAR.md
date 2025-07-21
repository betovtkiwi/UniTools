# 🚀 Como Testar a Dashboard Privada

## 📱 Opção 1: Testando Localmente (Recomendado)

### Pré-requisitos
- Node.js 18+ instalado
- Git instalado

### Passos:

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd dashboard-privada
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o banco de dados**
```bash
npx prisma migrate dev --name init
```

4. **Popule com dados de demonstração**
```bash
npm run db:seed
```

5. **Inicie o servidor**
```bash
npm run dev
```

6. **Acesse no navegador**
- URL: `http://localhost:3000`

---

## 🌐 Opção 2: Deploy Online (Vercel)

### Se você quiser fazer deploy para testar online:

1. **Faça fork do repositório no GitHub**

2. **Conecte com Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Conecte sua conta GitHub
   - Importe o projeto

3. **Configure as variáveis de ambiente**
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL="https://seu-dominio.vercel.app"
   NEXTAUTH_SECRET="sua-chave-secreta"
   JWT_SECRET="sua-jwt-secret"
   WEBHOOK_SECRET="seu-webhook-secret"
   ```

4. **Deploy automático**
   - O Vercel fará o deploy automaticamente

---

## 🔑 Contas de Teste

Use estas contas para testar as diferentes funcionalidades:

### 👨‍💼 Administrador (Acesso Total + Painel Admin)
- **Email**: `admin@example.com`
- **Senha**: `admin123`
- **Funcionalidades**: Todas + gerenciamento de ferramentas e novidades

### ⭐ Usuário Premium (Acesso Completo)
- **Email**: `premium@example.com`
- **Senha**: `demo123`
- **Funcionalidades**: Chat completo, todas as ferramentas

### 📝 Usuário Gratuito (Acesso Limitado)
- **Email**: `free@example.com`
- **Senha**: `demo123`
- **Funcionalidades**: Chat apenas texto, visualização de ferramentas

### 🆓 Qualquer Usuário
- **Email**: Qualquer email (ex: `teste@teste.com`)
- **Senha**: `demo123`
- **Funcionalidades**: Acesso limitado

---

## 🎯 Funcionalidades para Testar

### ✅ Para Todos os Usuários:
1. **Login** - Página de entrada com diferentes tipos de conta
2. **Dashboard Principal** - Novidades em destaque
3. **Status de Acesso** - Indicador visual do tipo de conta
4. **Navegação** - Sidebar responsiva

### 💬 Chat da Comunidade:
1. **Usuários Gratuitos**: 
   - Podem enviar apenas texto
   - Veem mensagens bloqueadas como "🔒 Conteúdo bloqueado"
2. **Usuários Premium**: 
   - Chat completo
   - Podem ver todos os tipos de mensagem

### 🛠️ Marketplace de Ferramentas:
1. **Visualização**: Todos podem ver as ferramentas
2. **Acesso**: Só premium pode "usar"
3. **Busca**: Sistema de busca funcional
4. **Layout**: Grade responsiva

### 👨‍💼 Painel Administrativo (apenas admin):
1. **Gerenciar Ferramentas**:
   - Criar nova ferramenta
   - Editar existentes
   - Upload de imagens
   - Título e descrição opcionais
2. **Gerenciar Novidades**:
   - Criar novidades
   - Marcar como destaque
   - Upload de imagens

---

## 🔧 Testando o Webhook

Para simular uma compra e dar acesso premium a um usuário:

```bash
curl -X POST http://localhost:3000/api/webhook/purchase \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: your-webhook-secret-change-this-in-production" \
  -d '{
    "email": "novousuario@example.com",
    "paymentId": "payment_123",
    "amount": 99.90,
    "status": "completed"
  }'
```

Depois faça login com:
- **Email**: `novousuario@example.com`
- **Senha**: `demo123`

---

## 🐛 Solução de Problemas

### Erro de Banco de Dados:
```bash
rm -rf prisma/dev.db
npx prisma migrate dev --name init
npm run db:seed
```

### Erro de Dependências:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro de Port:
- Certifique-se que a porta 3000 está livre
- Ou use: `npm run dev -- -p 3001`

---

## 📱 Screenshots Esperados

### 1. Página de Login
- Formulário elegante com credenciais de demonstração

### 2. Dashboard Principal
- Novidades em destaque
- Status de acesso do usuário
- Botão para o chat

### 3. Chat da Comunidade
- Mensagens em tempo real
- Diferenciação entre usuários premium/gratuitos
- Conteúdo bloqueado para usuários sem acesso

### 4. Marketplace de Ferramentas
- Grade de ferramentas
- Imagens, títulos e descrições
- Status de acesso para cada ferramenta

### 5. Painel Admin (apenas admin)
- Gerenciamento de ferramentas
- Criação de novidades
- Upload de imagens

---

## ✨ Recursos Implementados

✅ **Sistema de Autenticação Completo**
✅ **Bate-papo com Permissões Limitadas**
✅ **Marketplace Interno de Ferramentas**
✅ **Painel Administrativo**
✅ **Sistema de Webhook para Compras**
✅ **Upload de Imagens**
✅ **Interface Responsiva**
✅ **Dados de Demonstração**

---

**🎉 A aplicação está pronta para uso! Escolha uma das opções acima para testar.**