# CLAUDE.md

## Project Overview

Brnd Write — a full-stack document/content management web application built with Next.js App Router. Users create, organize, and manage collections of documents with authentication.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19, TypeScript 5.9
- **Runtime/Package Manager:** Bun
- **Database:** PostgreSQL (Neon serverless) with Drizzle ORM
- **API:** Elysia (TypeBox validation, OpenAPI docs, Eden Treaty client)
- **Auth:** Better Auth (magic link, GitHub/Google OAuth, passkeys)
- **UI:** shadcn/ui (base-nova style), Tailwind CSS 4 (OKLch color space), HugeIcons
- **Validation:** Zod v4 (Server Actions), Elysia TypeBox (API routes)
- **Forms:** React Hook Form with Zod resolvers
- **Tables:** TanStack React Table
- **File Upload:** UploadThing
- **Email:** Resend + React Email
- **Animation:** Motion
- **Notifications:** Sonner (toast)

## Key Commands

```bash
bun dev              # Dev server (Turbopack)
bun run build        # Production build (Turbopack)
bun run lint         # ESLint
bun run lint:fix     # Auto-fix lint issues
bun run db:generate  # Generate Drizzle migrations
bun run db:migrate   # Run migrations
bun run db:studio    # Visual DB editor
bun run dev:email    # Email template dev server
```

## Project Structure

```
app/
  (app)/                # Protected routes (dashboard, collections, documents)
    dashboard/
      [collection]/     # Dynamic collection route
        [document]/     # Dynamic document route
      account/          # Settings & security pages
      trash/            # Trash page
  (auth)/               # Auth routes (sign-in)
  api/
    [[...slug]]/        # Elysia API catch-all handler
    auth/               # Better Auth handler + auth macro
    collections/        # Collections REST API (model, service, routes)
actions/                # Server actions (.action.ts suffix)
  account/              # Avatar, user update actions
  files/                # Collection & document CRUD actions
components/
  ui/                   # shadcn/ui base components (~50+)
    animate-ui/         # Animation utilities
    brnd-ui/            # Custom Brnd components (badge, input)
    coss-ui/            # Advanced components (autocomplete, color-picker, cropper, toolbar)
    dice-ui/            # Data table skeleton
  account/              # Account settings & security components
  auth/                 # Auth card
  breadcrumb/           # Breadcrumb navigation
  files/                # Collection cards, document list, create dialogs
  icons/                # MDX, provider, theme icons
  sidebar/              # Sidebar layout (nav-tree, nav-user, nav-search)
  theme/                # Theme provider, switcher, storage
lib/
  auth/                 # Better Auth config, client, context, OpenAPI schema
  db/                   # Drizzle schema, relations, types, utils, migrations
  data/                 # Server-side data fetching with caching
    account/            # Session, images fetchers
    collections/        # Collection fetchers
    documents/          # Document fetchers
  safe-action.ts        # next-safe-action client setup
  eden.ts               # Eden Treaty type-safe API client
  utils.ts              # Shared utilities (cn, etc.)
schemas/                # Zod validation schemas (.schema.ts suffix)
hooks/                  # Custom React hooks (use-file-upload, use-mobile, use-meta-color)
config/                 # App configuration (dashboard.config.ts)
emails/                 # React Email templates (sign-in-email.tsx)
styles/                 # Global CSS
```

## Architecture Patterns

### Dual Mutation Layer

The project uses two complementary approaches for data mutations:

**1. Server Actions (UI Mutations)** — `actions/*.action.ts`

```typescript
// All UI-triggered mutations use next-safe-action with Zod validation
authActionClient
  .metadata({ actionName: "createCollection" })
  .inputSchema(CreateCollectionFormSchema)
  .action(async ({ parsedInput, ctx: { sessionData } }) => {
    const result = await db.insert(collection).values({ ... }).returning().then(takeFirstOrThrow);
    updateTag("files"); // Revalidate cache
    return { success: true, collection: result };
  })
```

**2. Elysia REST API** — `app/api/`

Mounted at `/api` via catch-all route with service layer pattern:

```typescript
// Route definitions (app/api/collections/index.ts)
export const Collections = new Elysia({ prefix: "/collections" })
  .use(BetterAuth)
  .get("/", ({ user }) => CollectionService.getAll(user.id), { auth: true })
  .post("/", ({ user, body }) => CollectionService.create(user.id, body),
    { auth: true, body: CollectionModel.create /* TypeBox */ });

// Service layer (app/api/collections/service.ts) — abstract class with static methods
// Validation models (app/api/collections/model.ts) — Elysia t.Object schemas
```

Eden Treaty client for type-safe API calls from the client:

```typescript
// lib/eden.ts
export const api = treaty<typeof app>("localhost:3000").api;
// Usage: const result = await api.collections.get();
```

### Data Fetching & Caching

Server-only functions in `lib/data/` using Next.js caching:

```typescript
export async function getCollections() {
  "use cache: private";
  cacheTag("files");
  cacheLife({ expire: 3600 });
  const ctx = await getAuthContext();
  return db.select().from(collection).where(eq(collection.userId, ctx.user.id));
}
```

After mutations, call `updateTag("files")` to revalidate all data with that cache tag.

### Page Composition

Async server components wrapped in Suspense for streaming:

```typescript
export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <DataAsync />
    </Suspense>
  );
}
async function DataAsync() {
  const [collections, documents] = await Promise.all([getCollections(), getDocuments()]);
  return <Component collections={collections} documents={documents} />;
}
```

### Database

Drizzle ORM schema in `lib/db/schema.ts`. Key tables: `user`, `session`, `account`, `verification`, `passkey`, `rateLimit`, `image`, `collection`, `document`. Relations in `lib/db/relations.ts`. Types inferred via `typeof table.$inferSelect`. Helpers in `lib/db/utils.ts`:

- `takeFirstOrNull(data)` — returns first item or null
- `takeFirstOrThrow(data)` — returns first item or throws

### Authentication

Better Auth in `lib/auth/index.ts`. **No middleware** — auth handled at each layer:

- **Server components:** `getAuthContext()` from `lib/auth/auth-context.ts` (redirects if unauthenticated)
- **Server actions:** `authActionClient` middleware checks session, returns `unauthorized()` if missing
- **Elysia routes:** `auth` macro resolves session from headers, returns 401 if missing
- **Client:** `authClient` from `lib/auth/auth-client.ts` with `magicLinkClient()` plugin

## Conventions

- **File naming:** kebab-case (e.g., `get-collections.ts`, `create-document.action.ts`)
- **Suffixes:** `.action.ts` for server actions, `.schema.ts` for Zod schemas
- **Components:** PascalCase, organized by feature in `components/`
- **Path alias:** `@/*` maps to project root
- **Unused variables:** Prefix with `_`
- **Imports:** Sorted by eslint-plugin-perfectionist (React → Next → external → internal → relative)
- **No tests:** Project currently has no test framework

## Linting

ESLint flat config (`eslint.config.mjs`): `eslint-plugin-perfectionist` (import sorting), `eslint-plugin-unicorn` (code quality), `eslint-plugin-unused-imports`, Next.js core-web-vitals, TypeScript rules.

## Environment Variables

See `.example.env`: `DATABASE_URL`, `REDIS_URL`, `UPSTASH_REDIS_REST_URL/TOKEN`, `BETTER_AUTH_URL/SECRET`, `GITHUB_CLIENT_ID/SECRET`, `GOOGLE_CLIENT_ID/SECRET`, `UPLOADTHING_TOKEN`, `RESEND_API_KEY`.
