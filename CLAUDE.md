# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**My Calendar** — a PWA calendar and task scheduler built with React + TypeScript + Vite. Local-first (IndexedDB via Dexie), mobile-first, deployed to GitHub Pages via hash-based routing. Sync infrastructure is stubbed but disabled (`SYNC_ENABLED = false`).

## Commands

```bash
npm run dev          # Start dev server
npm run build        # TypeScript check + Vite build
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier format
npm run format:check # Prettier check
npm run check        # Full check: tsc + eslint + prettier
npm run fix          # Auto-fix: prettier + eslint
```

Deployment: pushes to `main` trigger `.github/workflows/deploy.yml` which builds and deploys to GitHub Pages.

## Architecture

Three-layer client-side architecture: **Presentation → Application Logic → Data Persistence**.

```
Pages/Components (UI)
    ↓
Hooks (React Query wrappers)
    ↓
Services (business logic, no React coupling)
    ↓
Database (Dexie/IndexedDB)
```

### Data Flow

- **Reads**: Pages call query hooks (`hooks/queries/`) → hooks call services → services query Dexie. React Query handles caching (5-min stale time).
- **Writes**: Pages call mutation hooks (`hooks/mutations/`) → hooks call services → services write to Dexie → mutations invalidate related query caches.
- **Notifications**: Dual system — browser Web Notifications (scheduled, checked every 60s) and in-app notification feed. Deterministic IDs prevent duplicates.

### State Management

Multiple Zustand stores for ephemeral UI state (not data):
- `calendar.store` — selected date, view mode (month/week/day), navigation
- `ui.store` — modal/form open states, editing task ID
- `theme.store` — light/dark/system, persisted to localStorage
- `notification.store` — toast queue (max 3, auto-dismiss 4s)

### Key Directories

| Directory | Purpose |
|-----------|---------|
| `src/pages/` | Route pages, each with subcomponents and `data.ts` |
| `src/components/` | Shared UI: Layout, Task, Calendar, Notification, common |
| `src/hooks/queries/` | React Query read hooks wrapping services |
| `src/hooks/mutations/` | React Query write hooks with cache invalidation |
| `src/services/` | Business logic: task, category, notification, sync |
| `src/db/schema.ts` | Dexie database definition (tasks, categories, notifications) |
| `src/stores/` | Zustand stores for UI state |
| `src/core/` | Types, settings/constants, colors, recurrence config |
| `src/lib/` | Utilities: date helpers, recurrence expansion, ID generation, notification scheduler |
| `src/i18n/` | Translation system (en-US, pt-BR) with Zustand store |
| `src/router/` | React Router config (hash-based) |
| `src/styles/` | Global CSS + CSS Modules per component |

### Adding Features

- **New page**: Create in `pages/`, add route in `router/router.tsx`
- **New data query**: Add hook in `hooks/queries/`, wrap service call
- **New mutation**: Add hook in `hooks/mutations/`, invalidate relevant caches
- **New business logic**: Add method to appropriate service in `services/`
- **Schema change**: Update `db/schema.ts`
- **Translations**: Update both `i18n/locales/en-US.ts` and `i18n/locales/pt-BR.ts`

## Code Style

Enforced by ESLint + Prettier — run `npm run check` before committing.

- **4-space indentation**, no tabs
- **79 char line width** (PEP 8 inspired)
- **Double quotes** everywhere (strings and JSX)
- **Semicolons** always
- **Trailing commas** always (multiline)
- **`type` imports**: Use `import type { ... }` for type-only imports (`@typescript-eslint/consistent-type-imports`)
- **Import order**: react → external → `@/` internal → parent → sibling → index, alphabetized, no blank lines between groups
- **Path alias**: `@/*` maps to `src/*` — always use `@/` imports, never relative paths outside the current directory
- **CSS Modules**: Components use `*.module.css` files for scoped styles
- **No `console.log`**: Only `console.warn`, `console.error`, `console.info` allowed
