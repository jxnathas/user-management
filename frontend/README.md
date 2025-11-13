# Frontend - Interface de Gerenciamento

Interface moderna e responsiva construída com Next.js para gerenciar usuários e perfis.

## Quick Start

```bash
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:3001`

## Desenvolvimento

```bash
# Desenvolvimento (watch mode)
npm run dev

# Build para produção
npm run build

# Executar build de produção
npm run start

# Linting
npm run lint
```

## Arquitetura

### Estrutura de Pastas

- **`app/`** - Pages da aplicação (Next.js 13+ App Router)
- **`components/`** - Componentes reutilizáveis
- **`hooks/`** - Hooks customizados para consumir API
- **`lib/`** - Utilitários e configurações

### Componentes Principais

- **Navigation** - Barra de navegação sticky com indicador de página ativa
- **Card** - Componente reutilizável para exibir conteúdo
- **UsersComponent** - Interface para gerenciar usuários
- **ProfilesComponent** - Interface para gerenciar perfis

### Hooks Customizados

- **`useUsers`** - Gerencia estado e requisições de usuários
- **`useProfiles`** - Gerencia estado e requisições de perfis

## Design System

- **Tailwind CSS** - Estilização utilitária

## Configuração da API

O arquivo `lib/api.ts` contém a configuração base para requisições HTTP. Configure a URL da API conforme necessário:

```typescript
const API_URL = 'http://localhost:3000'; // Padrão
```

## Próximas Melhorias

- Implementar autenticação com JWT
- Adicionar paginação nas listagens
- Implementar busca e filtros avançados
- Validação em tempo real de formulários
- Confirmação de ações destrutivas (delete)
- Toast notifications para feedback do usuário
- Suporte a temas customizáveis
