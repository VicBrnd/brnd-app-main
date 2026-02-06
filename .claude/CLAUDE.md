# CLAUDE.md

## Project Overview

Brnd Write — a full-stack document/content management web application built with Next.js App Router. Users create, organize, and manage collections of documents with authentication.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19, TypeScript 5.9
- **Runtime/Package Manager:** Bun
- **Database:** PostgreSQL (Neon serverless) with Drizzle ORM
- **Auth:** Better Auth (magic link, GitHub/Google OAuth, passkeys)
- **UI:** shadcn/ui (base-nova style), Tailwind CSS 4 (OKLch color space), HugeIcons
- **State:** Zustand with persistence
- **Validation:** Zod v4
- **Forms:** React Hook Form
- **File Upload:** UploadThing
- **Email:** Resend + React Email
- **Animation:** Motion

## Key Commands

```bash
bun dev              # Dev server (Turbopack)
bun run build        # Production build
bun run lint         # ESLint
bun run lint:fix     # Auto-fix lint issues
bun run db:generate  # Generate Drizzle migrations
bun run db:migrate   # Run migrations
bun run db:studio    # Visual DB editor
bun run dev:email    # Email template dev server
```

## Project Structure

```
app/                    # Next.js App Router
  (app)/                # Protected routes (dashboard, etc.)
  (auth)/               # Auth routes (sign-in)
  api/auth/[...all]/    # Better Auth catch-all endpoint
actions/                # Server actions (.action.ts suffix)
components/             # UI components by feature
  ui/                   # shadcn/ui + custom component libraries (brnd-ui, dice-ui, animate-ui, base-ui)
  sidebar/              # Sidebar layout components
  auth/                 # Auth components
  files/                # File management components
  account/settings/     # Account settings
lib/
  auth/                 # Better Auth config, client, context
  db/                   # Drizzle schema, relations, types, migrations
  data/                 # Server-side data fetching with caching
  safe-action.ts        # next-safe-action client setup
  utils.ts              # Shared utilities (cn, etc.)
  handle-error.ts       # Centralized error handling
schemas/                # Zod validation schemas (.schema.ts suffix)
store/                  # Zustand stores
hooks/                  # Custom React hooks
config/                 # App configuration
emails/                 # React Email templates
styles/                 # Global CSS
```

## Architecture Patterns

### Server Actions (RPC)

All mutations use `next-safe-action` with Zod validation. Located in `actions/` with `.action.ts` suffix:

```typescript
authActionClient
  .metadata({ actionName: "createDocument" })
  .inputSchema(CreateDocumentFormSchema)
  .action(async ({ parsedInput, ctx: { sessionData } }) => { ... })
```

### Data Fetching

Server-only functions in `lib/data/` using Next.js `"use cache"` directive with `cacheTag()`. After mutations, call `updateTag()` to revalidate.

### Database

Drizzle ORM with schema in `lib/db/schema.ts`. Key tables: user, session, account, verification, image, collection, document. Relations defined in `lib/db/relations.ts`. Types inferred via `typeof table.$inferSelect`.

### Authentication

Better Auth configured in `lib/auth/index.ts`. Client-side auth via `lib/auth/auth-client.ts`. Supports magic link (email via Resend), GitHub OAuth, Google OAuth, and passkeys.

## Conventions

- **File naming:** kebab-case (e.g., `get-collections.ts`, `create-document.action.ts`)
- **Suffixes:** `.action.ts` for server actions, `.schema.ts` for Zod schemas
- **Components:** PascalCase, organized by feature in `components/`
- **Path alias:** `@/*` maps to project root
- **Unused variables:** Prefix with `_`
- **Imports:** Sorted by eslint-plugin-perfectionist (React → Next → internal → relative)
- **No tests:** Project currently has no test framework

## Linting

ESLint with flat config (`eslint.config.mjs`):

- `eslint-plugin-perfectionist` — import sorting with custom groups
- `eslint-plugin-unicorn` — code quality
- `eslint-plugin-unused-imports` — removes unused imports
- Next.js core-web-vitals and TypeScript rules

## Environment Variables

See `.example.env` for required variables:

- `DATABASE_URL` — PostgreSQL connection (Neon)
- `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET` — Auth config
- `GITHUB_CLIENT_ID/SECRET`, `GOOGLE_CLIENT_ID/SECRET` — OAuth
- `UPLOADTHING_TOKEN` — File uploads
- `RESEND_API_KEY` — Email
- `REDIS_URL`, `UPSTASH_REDIS_REST_*` — Redis/rate limiting
