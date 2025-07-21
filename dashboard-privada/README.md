# Dashboard Privada

Uma dashboard privada completa com sistema de autenticação baseado em webhook de compra, bate-papo em tempo real e marketplace interno de ferramentas.

## 🚀 Funcionalidades

### ✅ Sistema de Autenticação
- Login baseado em credenciais
- Verificação de acesso via webhook de compra
- Diferentes níveis de permissão (Admin/Usuário/Premium)

### 💬 Bate-papo da Comunidade
- Chat em tempo real para todos os membros
- **Usuários sem acesso premium**: podem ler e enviar apenas mensagens de texto
- **Usuários premium**: acesso completo (texto, imagens, links)
- Mensagens bloqueadas aparecem com aviso para usuários sem acesso

### 🛠️ Marketplace de Ferramentas
- Marketplace interno sem preços
- Ferramentas com imagens no formato 1:1
- Título e descrição opcionais
- Painel administrativo para gerenciar ferramentas

### 📰 Sistema de Novidades
- Novidades em destaque na página inicial
- Sistema de highlights
- Painel administrativo para gerenciar conteúdo

### 👨‍💼 Painel Administrativo
- Gerenciamento completo de ferramentas
- Criação e edição de novidades
- Upload de imagens
- Interface intuitiva

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados
- **NextAuth.js** - Autenticação
- **Lucide React** - Ícones

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🚀 Instalação

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

4. **Popule o banco com dados de demonstração**
```bash
npm run db:seed
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

6. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 👤 Usuários de Demonstração

O sistema vem com usuários pré-configurados para teste:

### Administrador
- **Email**: `admin@example.com`
- **Senha**: `admin123`
- **Permissões**: Acesso completo + painel administrativo

### Usuário Premium
- **Email**: `premium@example.com`
- **Senha**: `demo123`
- **Permissões**: Acesso premium completo

### Usuário Gratuito
- **Email**: `free@example.com`
- **Senha**: `demo123`
- **Permissões**: Acesso limitado (apenas texto no chat)

### Usuário Genérico
- **Email**: Qualquer email
- **Senha**: `demo123`
- **Permissões**: Acesso limitado

## 🔧 Configuração do Webhook

Para integrar com um sistema de pagamento, configure as seguintes variáveis no `.env`:

```env
WEBHOOK_SECRET="seu-webhook-secret-aqui"
```

### Endpoint do Webhook
`POST /api/webhook/purchase`

### Payload esperado:
```json
{
  "email": "usuario@example.com",
  "paymentId": "payment_123",
  "amount": 99.90,
  "status": "completed"
}
```

### Headers necessários:
```
x-webhook-secret: seu-webhook-secret
Content-Type: application/json
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/                 # API routes
│   │   ├── auth/           # Autenticação NextAuth
│   │   ├── webhook/        # Webhook de compra
│   │   ├── messages/       # API do chat
│   │   ├── news/          # API de novidades
│   │   ├── tools/         # API de ferramentas
│   │   └── upload/        # Upload de imagens
│   ├── dashboard/         # Páginas da dashboard
│   ├── admin/            # Painel administrativo
│   └── login/            # Página de login
├── components/           # Componentes React
├── lib/                 # Configurações e utilitários
└── types/              # Tipos TypeScript
```

## 🎯 Como Usar

### Para Administradores
1. Faça login com a conta admin
2. Acesse o "Painel Admin" na sidebar
3. Gerencie ferramentas e novidades
4. Faça upload de imagens
5. Publique conteúdo

### Para Usuários
1. Faça login com qualquer conta
2. Veja seu status de acesso na página inicial
3. Navegue pelas novidades em destaque
4. Acesse o bate-papo da comunidade
5. Explore o marketplace de ferramentas

### Sistema de Permissões
- **Usuários sem acesso**: Visualização limitada, apenas texto no chat
- **Usuários premium**: Acesso completo a todas as funcionalidades
- **Administradores**: Acesso completo + painel de gerenciamento

## 🔒 Segurança

- Autenticação JWT segura
- Validação de webhook com secret
- Verificação de permissões em todas as rotas
- Upload de arquivos com validação de tipo e tamanho
- Proteção contra acesso não autorizado

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, entre em contato através do email ou abra uma issue no repositório.

---

Feito com ❤️ para criar uma experiência premium para seus usuários!
