# Backend - API de Gerenciamento de Usuários

API RESTful construída com NestJS para gerenciar usuários e perfis.

## Quick Start

```bash
npm install
npm run start:dev
```

A API estará disponível em `http://localhost:3000`

## Desenvolvimento

```bash
# Watch mode (recarrega automático)
npm run start:dev

# Produção
npm run start:prod

# Testes unitários
npm run test

# Testes E2E
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## Arquitetura

### Camadas

- **Controllers** - Recebem requisições HTTP e delegam para Services
- **Services** - Contêm a lógica de negócio
- **Models** - Definem a estrutura dos dados (User, Profile)
- **DTOs** - Data Transfer Objects para validação de entrada

### Módulos

- **UsersModule** - Gerenciamento de usuários
- **ProfilesModule** - Gerenciamento de perfis
- **AppModule** - Módulo raiz

## Funcionalidades Principais

### Usuários
- CRUD completo
- Ativar/Desativar usuários
- Listar usuários com seus perfis
- Filtrar por perfil

### Perfis
- CRUD completo
- Relacionamento com usuários

## Dados de Exemplo

Na inicialização, a API popula o banco com dados de exemplo através de `seed.ts`. Execute manualmente:

```bash
npm run seed
```

## Variáveis de Ambiente

Configure conforme necessário (atualmente usando in-memory storage para desenvolvimento).

## Estrutura de Respostas

### Sucesso
```json
{
  "id": "uuid",
  "name": "Nome",
  "email": "email@example.com",
  "isActive": true,
  "profileId": "uuid",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### Erro
```json
{
  "statusCode": 400,
  "message": "Descrição do erro",
  "error": "Bad Request"
}
```

## Próximas Melhorias

- Implementar autenticação com JWT
- Adicionar controle de acesso com CASL
- Integração com banco de dados persistente (PostgreSQL/MongoDB)
- Rate limiting
- Logging estruturado
- API documentation com Swagger
