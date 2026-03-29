# My Calendar

Um aplicativo PWA de calendário e agendador de tarefas, construído com foco em funcionar offline, ser mobile-first e oferecer uma experiência fluida sem depender de servidores externos.

## Sobre o Projeto

O **My Calendar** nasceu da necessidade de ter um calendário pessoal simples, rápido e que funcione completamente offline. Diferente de soluções tradicionais que dependem de contas e servidores, este aplicativo adota a filosofia **local-first**: todos os dados ficam armazenados diretamente no navegador do usuário via IndexedDB.

O projeto é uma **Progressive Web App (PWA)**, o que significa que pode ser instalado no celular ou desktop como um aplicativo nativo, com suporte a funcionamento offline e notificações do sistema.

A interface é **mobile-first** — projetada primeiramente para telas pequenas e adaptada para telas maiores — e conta com suporte bilíngue (Português do Brasil e Inglês).

## Funcionalidades

- **Visualizações de calendário** — Alterne entre visualização por mês, semana ou dia
- **Gestão completa de tarefas** — Crie, edite e exclua tarefas com título, descrição, datas, prioridade e status
- **Categorias personalizáveis** — Organize tarefas em categorias com cores e ícones à sua escolha
- **Tarefas recorrentes** — Configure recorrência diária, semanal, mensal ou anual com intervalos customizáveis
- **Sistema de lembretes** — Notificações do navegador (Web Notifications) e feed de notificações dentro do app
- **Temas** — Tema claro, escuro ou automático (segue a preferência do sistema)
- **Funciona offline** — Dados persistidos localmente no IndexedDB, sem necessidade de internet
- **Instalável como app** — PWA completa com ícones, splash screen e experiência nativa
- **Internacionalização** — Interface disponível em Português (pt-BR) e Inglês (en-US)

## Stack Tecnológica

| Tecnologia | Versão | Função |
|---|---|---|
| React | 19 | Biblioteca de UI |
| TypeScript | 5 | Tipagem estática |
| Vite | 6 | Build tool e dev server |
| React Router | 7 | Roteamento (hash-based para GitHub Pages) |
| TanStack React Query | 5 | Cache e gerenciamento de estado assíncrono |
| Dexie | 4 | Wrapper para IndexedDB (banco de dados local) |
| Zustand | 5 | Gerenciamento de estado da UI |
| Zod | 4 | Validação de schemas |
| date-fns | 4 | Utilitários de manipulação de datas |
| Lucide React | 1 | Biblioteca de ícones |
| CSS Modules | — | Estilos com escopo por componente |
| Vite PWA | — | Configuração de Progressive Web App |

## Arquitetura

O projeto segue uma arquitetura em **três camadas** no lado do cliente, com separação clara de responsabilidades:

```
Páginas / Componentes (UI)
        |
        v
  Hooks (React Query)
        |
        v
  Services (lógica de negócio)
        |
        v
  Database (Dexie / IndexedDB)
```

### Fluxo de dados

- **Leituras**: Páginas chamam hooks de query (`hooks/queries/`) que encapsulam chamadas aos services, que por sua vez consultam o Dexie. O React Query cuida do cache com tempo de stale de 5 minutos.
- **Escritas**: Páginas chamam hooks de mutation (`hooks/mutations/`) que executam operações nos services e invalidam os caches relacionados automaticamente.
- **Notificações**: Sistema duplo — Web Notifications agendadas (verificadas a cada 60 segundos) e feed de notificações dentro do app. IDs determinísticos previnem duplicatas.

### Gerenciamento de estado

O estado da UI (não dos dados) é gerenciado por stores Zustand:

| Store | Responsabilidade |
|---|---|
| `calendar.store` | Data selecionada, modo de visualização (mês/semana/dia), navegação |
| `theme.store` | Tema (claro/escuro/sistema), persistido no localStorage |
| `ui.store` | Estados de modais e formulários |
| `notification.store` | Fila de toasts (máximo 3, auto-dismiss em 4 segundos) |

## Estrutura de Diretórios

```
src/
├── pages/              # Páginas da aplicação (Calendar, TaskCreate, TaskDetail, Categories, Settings)
├── components/         # Componentes reutilizáveis (Layout, Task, Calendar, Notification, common)
├── hooks/
│   ├── queries/        # Hooks de leitura (React Query)
│   └── mutations/      # Hooks de escrita com invalidação de cache
├── services/           # Lógica de negócio (task, category, notification, sync)
├── db/                 # Definição do banco Dexie e seed de dados iniciais
├── stores/             # Stores Zustand para estado da UI
├── core/
│   ├── types/          # Definições de tipos TypeScript
│   └── constants/      # Cores, labels de recorrência, configurações
├── lib/                # Utilitários (datas, recorrência, IDs, agendamento de notificações)
├── i18n/               # Sistema de tradução (en-US, pt-BR)
├── router/             # Configuração de rotas (hash-based)
├── styles/             # CSS global, reset e variáveis CSS
└── assets/             # Recursos estáticos
```

## Rotas

| Rota | Página |
|---|---|
| `/` | Calendário principal |
| `/task/new` | Criar nova tarefa |
| `/task/:taskId` | Detalhes da tarefa |
| `/categories` | Gerenciar categorias |
| `/settings` | Configurações do app |

## Como Executar

### Pre-requisitos

- **Node.js** 20 ou superior
- **npm**

### Instalação

```bash
git clone https://github.com/mauriciobenjamin700/my-calendar.git
cd my-calendar
npm install
```

### Desenvolvimento

```bash
npm run dev
```

O servidor de desenvolvimento estará disponível em `http://localhost:5173/my-calendar/`.

### Build de produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Verificação TypeScript + build Vite |
| `npm run lint` | Verifica o código com ESLint |
| `npm run lint:fix` | Corrige problemas do ESLint automaticamente |
| `npm run format` | Formata o código com Prettier |
| `npm run format:check` | Verifica se o código está formatado |
| `npm run check` | Verificação completa (TypeScript + ESLint + Prettier) |
| `npm run fix` | Correção automática (Prettier + ESLint) |

## Deploy

O deploy é feito automaticamente via **GitHub Actions**. A cada push na branch `main`, o workflow:

1. Instala as dependências (`npm ci`)
2. Executa o build (`npm run build`)
3. Publica os arquivos no **GitHub Pages**

A aplicação fica disponível em: `https://mauriciobenjamin700.github.io/my-calendar/`

## Modelo de Dados

O banco de dados local (IndexedDB via Dexie) possui quatro tabelas:

- **tasks** — Tarefas e eventos, com suporte a recorrência, prioridades, status e lembretes
- **categories** — Categorias para organizar tarefas, com cor e ícone customizáveis
- **scheduledNotifications** — Controle de Web Notifications agendadas (evita duplicatas)
- **inAppNotifications** — Feed de notificações dentro do aplicativo

## Padrões de Código

O projeto segue padrões rígidos aplicados por ESLint e Prettier:

- Indentação de 4 espaços
- Largura máxima de 79 caracteres por linha
- Aspas duplas em todas as strings e JSX
- Ponto e vírgula obrigatório
- Vírgula trailing em estruturas multiline
- Imports organizados: react, externos, internos (`@/`), relativos
- CSS Modules para estilos com escopo por componente
- `console.log` proibido (apenas `console.warn`, `console.error`, `console.info`)

## Planos Futuros

- **Sincronização com backend** — A infraestrutura de sync já está preparada no código (services, tipos, status de sincronização nos modelos), porém desabilitada (`SYNC_ENABLED = false`). O próximo grande passo é implementar o servidor e ativar a sincronização entre dispositivos.
- **Melhorias de acessibilidade** — Aprimorar suporte a leitores de tela e navegação por teclado.
- **Mais opções de personalização** — Novos temas, fontes e layouts de visualização.
- **Compartilhamento de calendários** — Permitir que usuários compartilhem calendários entre si.
