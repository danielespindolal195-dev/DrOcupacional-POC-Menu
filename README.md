# POC Sistema de Menu - Migração ASP Clássico para .NET 8 + React

Esta é uma POC (Proof of Concept) que demonstra a migração de um sistema ASP Clássico para uma arquitetura moderna utilizando:
- **Backend**: .NET 8 (ASP.NET Core Web API)
- **Frontend**: React 18 com TypeScript e Vite

## 📋 Funcionalidades

### Tela de Buscar Menu
- Busca de menus por nome
- Listagem de todos os menus
- Inclusão de novo menu
- Edição de menu existente
- Exclusão de menu (com confirmação)

### Tela de Cadastro de Menu
- Cadastro de novo menu
- Edição de menu existente
- Campos: Nome, Ordem e Ícone
- Validações de campos obrigatórios
- Validação de duplicidade de nome

## 🏗️ Arquitetura

### Backend (.NET 8)
```
Backend/
├── Controllers/
│   └── MenuController.cs      # API REST endpoints
├── Models/
│   └── Menu.cs                 # Modelo de dados
├── DTOs/
│   └── MenuDTO.cs              # Data Transfer Objects
├── Services/
│   ├── IMenuService.cs        # Interface do serviço
│   └── MenuService.cs          # Implementação com dados mockados
└── Program.cs                   # Configuração da aplicação
```

**Boas Práticas Implementadas:**
- ✅ Separação de responsabilidades (Controller, Service, Model)
- ✅ Dependency Injection
- ✅ DTOs para transferência de dados
- ✅ Validações com Data Annotations
- ✅ Tratamento de erros HTTP apropriado
- ✅ CORS configurado para React
- ✅ Swagger/OpenAPI para documentação

### Frontend (React + TypeScript)
```
Frontend/
├── src/
│   ├── components/
│   │   ├── MenuList.tsx        # Listagem e busca
│   │   └── MenuForm.tsx        # Cadastro/Edição
│   ├── services/
│   │   └── api.ts              # Serviço de comunicação com API
│   ├── types/
│   │   └── Menu.ts             # Tipos TypeScript
│   ├── App.tsx                 # Roteamento
│   └── main.tsx                # Entry point
└── package.json
```

**Boas Práticas Implementadas:**
- ✅ Componentes funcionais com Hooks
- ✅ TypeScript para type safety
- ✅ Separação de serviços (API)
- ✅ Roteamento com React Router
- ✅ Tratamento de erros
- ✅ Feedback visual (loading, success, error)
- ✅ Validações no frontend

## 🚀 Como Executar

### Pré-requisitos
- .NET 8 SDK instalado
- Node.js 18+ e npm instalados

### Backend

1. Navegue até a pasta do backend:
```bash
cd Backend
```

2. Restaure as dependências:
```bash
dotnet restore
```

3. Execute a aplicação:
```bash
dotnet run
```

A API estará disponível em:
- HTTP: `http://localhost:5000`
- Swagger UI: `http://localhost:5000/swagger`

### Frontend

1. Navegue até a pasta do frontend:
```bash
cd Frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute a aplicação:
```bash
npm run dev
```

O frontend estará disponível em: `http://localhost:3000`

## 📡 Endpoints da API

### GET /api/menu
Retorna todos os menus ordenados por ordem e nome.

### GET /api/menu/search?nome={nome}
Busca menus por nome (case-insensitive).

### GET /api/menu/{id}
Retorna um menu específico por ID.

### POST /api/menu
Cria um novo menu.
```json
{
  "nome": "Dashboard",
  "ordem": 1,
  "icone": "fa fa-dashboard"
}
```

### PUT /api/menu/{id}
Atualiza um menu existente.
```json
{
  "nome": "Dashboard",
  "ordem": 1,
  "icone": "fa fa-dashboard"
}
```

### DELETE /api/menu/{id}
Exclui um menu.

## 🗄️ Dados Mockados

O sistema utiliza dados mockados em memória (sem banco de dados). Os dados são inicializados com alguns menus de exemplo:
- Dashboard (Ordem: 1)
- Usuários (Ordem: 2)
- Relatórios (Ordem: 3)
- Configurações (Ordem: 4)

**Nota**: Os dados são perdidos quando a aplicação é reiniciada, pois são armazenados apenas em memória.

## 🎨 Interface

A interface foi desenvolvida com:
- Design limpo e moderno
- Responsividade básica
- Font Awesome para ícones
- Feedback visual para ações do usuário
- Validações em tempo real

## 📝 Notas de Desenvolvimento

- A API está configurada para aceitar requisições do frontend React (CORS)
- Todas as validações são feitas tanto no backend quanto no frontend
- O sistema verifica duplicidade de nomes de menu
- Mensagens de erro são retornadas de forma amigável
- O código segue padrões de Clean Architecture

## 🔧 Tecnologias Utilizadas

### Backend
- .NET 8
- ASP.NET Core Web API
- Swashbuckle (Swagger)

### Frontend
- React 18
- TypeScript
- Vite
- React Router DOM
- Axios
- Font Awesome

## 📅 Entrega

Esta POC foi desenvolvida como demonstração de:
- Migração de sistema legado para arquitetura moderna
- Boas práticas de desenvolvimento
- Separação de frontend e backend
- API RESTful bem estruturada
- Interface de usuário moderna e responsiva

---

**Desenvolvido para POC de Migração de Sistema**

