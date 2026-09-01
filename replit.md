# Autoclaim - Plan Manager Operating System

## Overview

Autoclaim is a compliance-first claims validation and governance platform designed for NDIS (National Disability Insurance Scheme) plan managers in Australia. The application provides a single operational control surface for processing claims, enforcing NDIS compliance, reducing rejected claims, proving fiduciary diligence, and continuously improving outcomes.

The system is explicitly scoped to handle: Claims + Compliance + Governance + Learning. It intentionally excludes participant goal management, therapy notes, provider rostering, case management, care coordination, and financial advice to prevent scope creep.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query (React Query) for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Design System**: Carbon Design System principles (IBM's enterprise design language) - chosen for data-dense, compliance-driven interfaces requiring trust and precision
- **Typography**: IBM Plex Sans (primary) and IBM Plex Mono (for financial figures, claim IDs)
- **Build Tool**: Vite

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Style**: RESTful JSON API under `/api/*` routes
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)

### Data Layer
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Migrations**: Managed via drizzle-kit (`db:push` command)

### Project Structure
```
├── client/           # React frontend application
│   └── src/
│       ├── components/   # UI components (app-specific + shadcn/ui)
│       ├── pages/        # Route pages (Dashboard, Claims, Compliance, Plans, Outcomes)
│       ├── hooks/        # Custom React hooks
│       └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data access layer
│   └── vite.ts       # Vite dev server integration
├── shared/           # Shared types and schema
│   └── schema.ts     # Drizzle schema + Zod validation
└── migrations/       # Database migrations
```

### Key Domain Entities
- **Claims**: Core entity with statuses (pending, flagged, approved, submitted, paid, rejected, processing)
- **Plans**: NDIS participant plans with budget tracking and categories
- **Validation Rules**: Compliance rules across categories (pricing, category, provider, duplication, completeness, time/frequency)
- **Audit Entries**: Full audit trail for compliance and governance
- **Outcome Metrics**: Aggregated performance and compliance metrics

### Design Patterns
- **Shared Schema**: Single source of truth for types between frontend and backend
- **Validation-first**: Zod schemas derived from Drizzle for runtime validation
- **Component Composition**: Domain-specific components (ClaimCard, PlanCard) built on shadcn/ui primitives
- **Theme System**: Light/dark mode with CSS custom properties

## External Dependencies

### Database
- **PostgreSQL**: Primary data store (connection via `DATABASE_URL` environment variable)

### Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **Radix UI**: Accessible component primitives (dialog, dropdown, tabs, etc.)
- **Recharts**: Data visualization for outcomes and metrics dashboards
- **date-fns**: Date formatting and manipulation
- **lucide-react**: Icon library

### Backend Libraries
- **drizzle-orm**: Type-safe database queries
- **zod**: Runtime schema validation
- **express-session**: Session management
- **connect-pg-simple**: PostgreSQL session store

### Development Tools
- **Vite**: Frontend build and dev server with HMR
- **esbuild**: Server bundling for production
- **drizzle-kit**: Database migration tooling
- **TypeScript**: Full-stack type safety