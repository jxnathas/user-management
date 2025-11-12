# Desafio Fullstack - Gestão de Usuários

Sistema para cadastro e gerenciamento de usuários e perfis, com APIs RESTful robustas e interface responsiva.

## Pré-requisitos

- Node.js 16+
- npm/yarn/pnpm

## Instalação e Execução

### Backend

```bash
cd backend
npm install
npm run start:dev
```

A API estará disponível em `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:3001`

## Estrutura do Projeto

### Backend

```
backend/
├── src/
│   ├── app.controller.ts          # Controller principal
│   ├── app.service.ts             # Serviço principal
│   ├── app.module.ts              # Módulo raiz
│   ├── main.ts                    # Ponto de entrada
│   ├── seed.ts                    # Dados de inicialização
│   ├── models/
│   │   ├── user.ts               # Modelo de Usuário
│   │   └── profile.ts            # Modelo de Perfil
│   ├── users/
│   │   ├── users.controller.ts    # Controller de Usuários
│   │   ├── users.service.ts       # Serviço de Usuários
│   │   ├── users.module.ts        # Módulo de Usuários
│   │   └── dto/
│   │       ├── create-user.dto.ts
│   │       └── update-user.dto.ts
│   ├── profiles/
│   │   ├── profiles.controller.ts # Controller de Perfis
│   │   ├── profiles.service.ts    # Serviço de Perfis
│   │   ├── profiles.module.ts     # Módulo de Perfis
│   │   └── dto/
│   │       ├── create-profile.dto.ts
│   │       └── update-profile.dto.ts
│   └── services/                  # Serviços compartilhados
├── test/
│   ├── app.e2e-spec.ts           # Testes E2E
│   └── jest-e2e.json
└── package.json
```

### Frontend

```
frontend/
├── app/
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Página inicial
│   ├── globals.css               # Estilos globais
│   ├── users/
│   │   └── page.tsx             # Página de Usuários
│   └── profiles/
│       └── page.tsx             # Página de Perfis
├── components/
│   ├── Navigation.tsx            # Componente de navegação
│   ├── UsersComponent.tsx        # Componente de Usuários
│   └── ProfilesComponent.tsx     # Componente de Perfis
├── hooks/
│   ├── useUsers.ts              # Hook para Usuários
│   └── useProfiles.ts           # Hook para Perfis
├── lib/
│   └── api.ts                   # Configuração de API
└── package.json
```

## Tecnologias Utilizadas

### Backend
- **NestJS** - Framework robusto para APIs Node.js
- **TypeScript** - Tipagem estática
- **UUID** - Identificadores únicos

### Frontend
- **Next.js** - Framework React com SSR/SSG
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária

## Endpoints da API

### Usuários

| Método | Endpoint | Descrição | Status Code |
|--------|----------|-----------|-------------|
| GET | `/users` | Listar todos os usuários | 200 |
| GET | `/users/with-profiles` | Listar usuários com seus perfis | 200 |
| GET | `/users?profileId=:id` | Filtrar usuários por perfil | 200 |
| GET | `/users/:id` | Obter detalhes de um usuário | 200/404 |
| POST | `/users` | Criar novo usuário | 201 |
| PATCH | `/users/:id` | Atualizar usuário | 200/404 |
| DELETE | `/users/:id` | Deletar usuário | 204/404 |
| PATCH | `/users/:id/activate` | Ativar usuário | 200/404 |
| PATCH | `/users/:id/deactivate` | Desativar usuário | 200/404 |

### Perfis

| Método | Endpoint | Descrição | Status Code |
|--------|----------|-----------|-------------|
| GET | `/profiles` | Listar todos os perfis | 200 |
| GET | `/profiles/:id` | Obter detalhes de um perfil | 200/404 |
| POST | `/profiles` | Criar novo perfil | 201 |
| PATCH | `/profiles/:id` | Atualizar perfil | 200/404 |
| DELETE | `/profiles/:id` | Deletar perfil | 204/404 |

## Status Codes HTTP

A API segue os padrões HTTP apropriados:

- **200 OK** - Requisição bem-sucedida (GET, PATCH com sucesso)
- **201 Created** - Recurso criado com sucesso (POST)
- **204 No Content** - Recurso deletado com sucesso (DELETE)
- **404 Not Found** - Recurso não encontrado
- **400 Bad Request** - Requisição inválida (dados malformados)
- **500 Internal Server Error** - Erro no servidor

## Modelos de Dados

### User
```typescript
{
  id: string (UUID)
  name: string
  email: string
  isActive: boolean
  profileId: string (FK)
  createdAt: Date
  updatedAt: Date
}
```

### Profile
```typescript
{
  id: string (UUID)
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}
```

## Fluxo da Aplicação

1. Frontend faz requisições HTTP para a API Backend
2. Backend processa requisições nos Controllers
3. Controllers delegam lógica para Services
4. Services manipulam dados e retornam respostas
5. Frontend renderiza os dados com React
6. Componentes customizados gerenciam estado com hooks

## O que poderia ser melhorado

### Autenticação
- Implementar JWT (JSON Web Tokens) para autenticação segura
- Adicionar endpoints de login e logout
- Incluir refresh tokens para manter sessões
- Implementar hash de senhas com bcrypt
- Adicionar validação de email com confirmação

### Controle de Acesso (CASL)
- Implementar CASL para controle granular de permissões
- Definir políticas de acesso baseadas em papéis (Role-Based Access Control)
- Controlar quais usuários podem visualizar, criar, atualizar ou deletar recursos
- Implementar middleware de autorização nos controllers
- Adicionar validação de permissões no frontend para melhor UX 

### Conexão com banco de dados
- Implementar propiamente uma conexão com banco de dados para persistência