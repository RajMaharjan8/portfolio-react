# Backend From Scratch — Next.js + Supabase (for a Laravel developer)

A complete, practical guide to building a backend with **Next.js (App Router)** and
**Supabase** (`supabase-js`). It assumes you already understand backend *concepts*
from Laravel — routing, controllers, models, migrations, auth — and focuses on
mapping those ideas onto this stack and filling the gaps.

> **Mental model:** Next.js gives you the backend *runtime* (like PHP-FPM running
> Laravel), and Supabase gives you the *database + auth + storage* (like MySQL +
> Laravel's auth + the filesystem). You write the glue.

---

## Table of Contents
1. [How the pieces fit](#1-how-the-pieces-fit)
2. [Laravel → Next.js cheat sheet](#2-laravel--nextjs-cheat-sheet)
3. [Prerequisites & setup](#3-prerequisites--setup)
4. [Create the Supabase project](#4-create-the-supabase-project)
5. [Connect Next.js to Supabase](#5-connect-nextjs-to-supabase)
6. [Your first API route (Route Handlers)](#6-your-first-api-route-route-handlers)
7. [Designing the database (tables = migrations)](#7-designing-the-database-tables--migrations)
8. [A full CRUD resource](#8-a-full-crud-resource)
9. [Validation](#9-validation)
10. [Error handling](#10-error-handling)
11. [Authentication](#11-authentication)
12. [Row Level Security (the most important security concept)](#12-row-level-security-the-most-important-security-concept)
13. [Server Actions & Server Components (the no-API way)](#13-server-actions--server-components-the-no-api-way)
14. [Recommended project structure](#14-recommended-project-structure)
15. [Deploying to Vercel](#15-deploying-to-vercel)
16. [Common pitfalls](#16-common-pitfalls)
17. [Next steps & exercises](#17-next-steps--exercises)

---

## 1. How the pieces fit

```
Browser
  │  (fetch / form / page load)
  ▼
Next.js  ── runs on Vercel as serverless functions ──┐
  ├─ Route Handlers   (app/api/.../route.ts)  ← your REST endpoints (Controllers)
  ├─ Server Components (app/.../page.tsx)      ← fetch data on the server
  └─ Server Actions    ('use server' fns)      ← mutations without an API layer
  │
  ▼  (supabase-js over HTTPS)
Supabase
  ├─ Postgres database   ← your tables (MySQL)
  ├─ Auth                ← users, sessions (Laravel auth)
  └─ Storage             ← file uploads (storage/ disk)
```

Key idea you must internalize: **anything in `app/api/**` or marked `'use server'`
runs on the server** — it can hold secrets and talk to the database directly.
**Client Components (`'use client'`) run in the browser** — never put secrets there.

---

## 2. Laravel → Next.js cheat sheet

| Laravel | Next.js + Supabase |
|---|---|
| `routes/api.php` | file path under `app/api/` (folder = URL) |
| Controller method | exported `GET`/`POST`/`PUT`/`DELETE` in `route.ts` |
| `php artisan serve` | `npm run dev` |
| Eloquent model | `supabase.from('table')` queries |
| Migration file | SQL in Supabase SQL Editor (or migration files) |
| `$request->validate([...])` | `zod` schema `.parse()` |
| `return response()->json()` | `return Response.json()` |
| Middleware | `middleware.ts` / checks inside the handler |
| `auth()->user()` | `supabase.auth.getUser()` |
| Policies / Gates | **Row Level Security (RLS)** in Postgres |
| `.env` | `.env.local` (+ Vercel env vars) |
| `config/` | env vars + small config modules |
| Sanctum/Passport tokens | Supabase Auth (JWT, handled for you) |

---

## 3. Prerequisites & setup

You need **Node.js 18+** and **npm**. Check:

```bash
node -v
npm -v
```

Create the app (TypeScript, App Router, Tailwind — the modern defaults):

```bash
npx create-next-app@latest my-backend
# Choose: TypeScript = Yes, App Router = Yes, Tailwind = Yes (optional), src/ = Yes
cd my-backend
npm run dev          # http://localhost:3000
```

Install the Supabase libraries:

```bash
npm install @supabase/supabase-js @supabase/ssr
npm install zod          # validation (like Laravel's validator)
```

- `@supabase/supabase-js` — the core client (DB, auth, storage).
- `@supabase/ssr` — helpers so auth/sessions work correctly with Next.js
  server/client boundaries (don't skip this for auth).
- `zod` — schema validation.

---

## 4. Create the Supabase project

1. Go to <https://supabase.com> → **New project**. Pick a name, a strong DB
   password (save it), and a region close to you.
2. Wait ~2 minutes for it to provision.
3. Open **Project Settings → API**. You need three values:
   - **Project URL** → `https://xxxx.supabase.co`
   - **anon public key** → safe to expose to the browser (used with RLS)
   - **service_role key** → **SECRET**, bypasses all security. Server-only.

> Think of `anon` as a key that respects your security rules, and `service_role`
> as the root/admin key. The `anon` key is fine in the browser *because* RLS
> protects your data (section 12). The `service_role` key must NEVER reach the
> browser.

---

## 5. Connect Next.js to Supabase

Create `.env.local` in the project root:

```bash
# Public — safe in the browser (prefixed NEXT_PUBLIC_)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Secret — server only, NO NEXT_PUBLIC_ prefix
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> **Rule:** `NEXT_PUBLIC_` = shipped to the browser. Anything without that prefix
> stays on the server. The service_role key has no prefix on purpose.

Create two client factories. Put them in `src/lib/supabase/`.

**`src/lib/supabase/server.ts`** — server-side admin client (full access, for
trusted Route Handlers/Server Actions):

```ts
import { createClient } from '@supabase/supabase-js'

// Uses the service_role key — ONLY import this from server code
// (route.ts, server actions, server components). Never from 'use client' files.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}
```

**`src/lib/supabase/client.ts`** — browser client (respects RLS, used in
Client Components):

```ts
import { createBrowserClient } from '@supabase/ssr'

export function createBrowserSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

> We'll add an auth-aware server client in section 11. For now, `createAdminClient`
> is enough to learn CRUD.

---

## 6. Your first API route (Route Handlers)

In the App Router, a file named `route.ts` inside `app/api/...` becomes an
endpoint. The **folder path is the URL**.

`src/app/api/health/route.ts`:

```ts
// GET /api/health
export async function GET() {
  return Response.json({ status: 'ok', time: new Date().toISOString() })
}
```

Visit <http://localhost:3000/api/health>. That's your first endpoint — no server
boilerplate, no `app.listen()`.

**This is the Laravel parallel:**

```php
// Laravel: routes/api.php
Route::get('/health', fn () => response()->json(['status' => 'ok']));
```

```ts
// Next.js: app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'ok' })
}
```

Each HTTP method is a named export: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
Reading input:

```ts
export async function POST(request: Request) {
  const body = await request.json()             // JSON body
  const { searchParams } = new URL(request.url) // query string ?page=2
  const page = searchParams.get('page')
  return Response.json({ received: body, page })
}
```

For **dynamic segments** (like `/posts/{id}`), use a folder in brackets:

```
app/api/posts/[id]/route.ts   →   /api/posts/123
```

```ts
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params      // note: params is awaited in newer Next.js
  return Response.json({ id })
}
```

---

## 7. Designing the database (tables = migrations)

In Supabase, open the **SQL Editor** and run SQL to create tables. This is your
"migration." We'll build a simple `posts` resource.

```sql
-- A posts table (like a Laravel migration)
create table posts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users (id) on delete cascade,
  title       text not null,
  body        text,
  published   boolean not null default false,
  created_at  timestamptz not null default now()
);

-- An index for common lookups
create index posts_user_id_idx on posts (user_id);
```

Mapping:

| Laravel migration | SQL above |
|---|---|
| `$table->uuid('id')->primary()` | `id uuid primary key default gen_random_uuid()` |
| `$table->foreignId('user_id')` | `user_id uuid references auth.users(id)` |
| `$table->string('title')` | `title text not null` |
| `$table->boolean('published')->default(false)` | `published boolean not null default false` |
| `$table->timestamps()` | `created_at timestamptz default now()` |

> Tip: `auth.users` is Supabase's built-in users table (created by Supabase Auth).
> You reference it for ownership, just like `users.id` in Laravel.

**Enable RLS now** (we configure the rules in section 12 — for now, with RLS on and
no policies, the table is locked to the `anon` key, which is the safe default):

```sql
alter table posts enable row level security;
```

---

## 8. A full CRUD resource

We'll implement `/api/posts` (list + create) and `/api/posts/[id]`
(read + update + delete). For now these use the **admin client** so you can focus
on CRUD mechanics; section 11–12 add real auth + ownership.

**`src/app/api/posts/route.ts`** — list & create:

```ts
import { createAdminClient } from '@/lib/supabase/server'
import { z } from 'zod'

// GET /api/posts  → list
export async function GET() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

// Validation schema (like $request->validate)
const CreatePost = z.object({
  title: z.string().min(1).max(200),
  body: z.string().optional(),
  published: z.boolean().optional(),
})

// POST /api/posts  → create
export async function POST(request: Request) {
  const json = await request.json()

  const parsed = CreatePost.safeParse(json)
  if (!parsed.success) {
    return Response.json(
      { error: 'Validation failed', issues: parsed.error.flatten() },
      { status: 422 }
    )
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('posts')
    .insert(parsed.data)
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data, { status: 201 })
}
```

**`src/app/api/posts/[id]/route.ts`** — read, update, delete:

```ts
import { createAdminClient } from '@/lib/supabase/server'
import { z } from 'zod'

type Ctx = { params: Promise<{ id: string }> }

// GET /api/posts/:id
export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(data)
}

const UpdatePost = z.object({
  title: z.string().min(1).max(200).optional(),
  body: z.string().optional(),
  published: z.boolean().optional(),
})

// PATCH /api/posts/:id
export async function PATCH(request: Request, { params }: Ctx) {
  const { id } = await params
  const parsed = UpdatePost.safeParse(await request.json())
  if (!parsed.success) {
    return Response.json(
      { error: 'Validation failed', issues: parsed.error.flatten() },
      { status: 422 }
    )
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('posts')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

// DELETE /api/posts/:id
export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params
  const supabase = createAdminClient()
  const { error } = await supabase.from('posts').delete().eq('id', id)

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return new Response(null, { status: 204 })
}
```

Test it from the terminal:

```bash
# Create
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","body":"My first post"}'

# List
curl http://localhost:3000/api/posts
```

**supabase-js query reference** (your "Eloquent" for this stack):

```ts
supabase.from('posts').select('*')                 // all columns
supabase.from('posts').select('id, title')         // specific columns
supabase.from('posts').select('*, author:users(*)')// join/relation
  .eq('published', true)                            // where published = true
  .neq('user_id', x)                                // where !=
  .gt('created_at', date)                           // >, gte, lt, lte
  .ilike('title', '%hello%')                         // case-insensitive LIKE
  .in('id', [1,2,3])                                 // whereIn
  .order('created_at', { ascending: false })         // orderBy desc
  .range(0, 9)                                        // pagination (rows 0–9)
  .limit(10)
  .single()                                          // expect exactly one row
```

---

## 9. Validation

We use **Zod** — it's the `zod` equivalent of `$request->validate()`. Define a
schema, parse the input, and get typed data + structured errors.

```ts
import { z } from 'zod'

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().int().min(13).optional(),
})

const result = RegisterSchema.safeParse(input)
if (!result.success) {
  // result.error.flatten() → { fieldErrors: { email: [...] }, ... }
  return Response.json({ issues: result.error.flatten() }, { status: 422 })
}
result.data // fully typed and validated
```

Keep schemas in `src/lib/validators/` and import them into routes (so the same
schema can validate API input *and* type your frontend forms).

---

## 10. Error handling

A small helper keeps responses consistent (like a Laravel exception handler):

**`src/lib/http.ts`**:

```ts
export function ok(data: unknown, status = 200) {
  return Response.json(data, { status })
}

export function fail(message: string, status = 400, extra?: object) {
  return Response.json({ error: message, ...extra }, { status })
}
```

Wrap risky logic in `try/catch` and translate to HTTP:

```ts
export async function POST(request: Request) {
  try {
    const body = await request.json()
    // ... work ...
    return ok(result, 201)
  } catch (e) {
    console.error(e)                       // shows in Vercel logs
    return fail('Something went wrong', 500)
  }
}
```

**Status code conventions:** `200` ok · `201` created · `204` no content (delete)
· `400` bad request · `401` not logged in · `403` logged in but not allowed
· `404` not found · `422` validation failed · `500` server error.

---

## 11. Authentication

Supabase Auth handles users, passwords, sessions, JWTs, OAuth, and email
verification — you don't build login from scratch. With `@supabase/ssr`, sessions
live in cookies and work across server/client.

**`src/lib/supabase/route.ts`** — an auth-aware client for Route Handlers
(reads the logged-in user from cookies, and respects RLS):

```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createRouteClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,   // anon key + RLS = safe
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (toSet) =>
          toSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          ),
      },
    }
  )
}
```

**Sign up / sign in** (call from a Client Component or a Route Handler):

```ts
const supabase = createBrowserSupabase()

// Register
await supabase.auth.signUp({ email, password })

// Login
await supabase.auth.signInWithPassword({ email, password })

// Logout
await supabase.auth.signOut()
```

**Get the current user inside a protected route** (the `auth()->user()` parallel):

```ts
import { createRouteClient } from '@/lib/supabase/route'
import { fail } from '@/lib/http'

export async function POST(request: Request) {
  const supabase = await createRouteClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return fail('Unauthorized', 401)   // like auth middleware

  // Insert owned by the logged-in user:
  const body = await request.json()
  const { data, error } = await supabase
    .from('posts')
    .insert({ ...body, user_id: user.id })
    .select()
    .single()

  if (error) return fail(error.message, 500)
  return Response.json(data, { status: 201 })
}
```

> **Important:** when you use `createRouteClient()` (anon key + the user's session),
> queries run **as that user** and are filtered by RLS automatically. That's how
> you get per-user data without writing `where user_id = ...` everywhere.

---

## 12. Row Level Security (the most important security concept)

This is the biggest mental shift from Laravel. Instead of enforcing "users can only
edit their own posts" in your controllers (Policies/Gates), you enforce it **in the
database** with RLS policies. Then *any* query with the anon key is automatically
safe — even if you forget a check in your code.

Run this once in the SQL Editor:

```sql
-- Already enabled earlier; safe to re-run:
alter table posts enable row level security;

-- Anyone can read published posts; owners can read their own drafts
create policy "read posts"
  on posts for select
  using ( published = true or auth.uid() = user_id );

-- A logged-in user can create posts only as themselves
create policy "create own posts"
  on posts for insert
  with check ( auth.uid() = user_id );

-- Owners can update their own posts
create policy "update own posts"
  on posts for update
  using ( auth.uid() = user_id );

-- Owners can delete their own posts
create policy "delete own posts"
  on posts for delete
  using ( auth.uid() = user_id );
```

- `auth.uid()` = the id of the logged-in user (from their JWT). It's Postgres's
  version of `auth()->id()`.
- `using (...)` = which existing rows this user can see/act on (read/update/delete).
- `with check (...)` = what new/changed rows are allowed (insert/update).

**The golden rule:**
- Use the **anon key + RLS** (`createRouteClient`) for normal user actions → the DB
  enforces ownership for you.
- Use the **service_role key** (`createAdminClient`) only for trusted admin tasks
  (cron jobs, webhooks, seeding) where you intentionally bypass RLS. Never expose it.

Once RLS is in place, rewrite the CRUD in section 8 to use `createRouteClient()`
instead of `createAdminClient()` and drop manual ownership checks — the policies do it.

---

## 13. Server Actions & Server Components (the no-API way)

You don't always need `/api` routes. Next.js lets you fetch and mutate data
*directly* from server code — often simpler.

**Server Component** — fetch data when the page renders (runs on the server):

```tsx
// src/app/posts/page.tsx  (no 'use client' → it's a Server Component)
import { createRouteClient } from '@/lib/supabase/route'

export default async function PostsPage() {
  const supabase = await createRouteClient()
  const { data: posts } = await supabase.from('posts').select('*')

  return (
    <ul>
      {posts?.map((p) => <li key={p.id}>{p.title}</li>)}
    </ul>
  )
}
```

**Server Action** — a server function you can call from a form, no fetch needed:

```tsx
// src/app/posts/actions.ts
'use server'
import { createRouteClient } from '@/lib/supabase/route'
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const supabase = await createRouteClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  await supabase.from('posts').insert({
    title: String(formData.get('title')),
    user_id: user.id,
  })
  revalidatePath('/posts')   // refresh the cached page
}
```

```tsx
// Use it directly in a form — no API endpoint, no fetch():
import { createPost } from './actions'

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Create</button>
    </form>
  )
}
```

**When to use which:**
- **Route Handlers (`/api`)** — public API, webhooks, mobile clients, anything
  external needs to call.
- **Server Components** — reading data to render a page.
- **Server Actions** — form submissions / mutations from your own UI.

---

## 14. Recommended project structure

```
my-backend/
├─ src/
│  ├─ app/
│  │  ├─ api/
│  │  │  ├─ health/route.ts
│  │  │  └─ posts/
│  │  │     ├─ route.ts            # GET (list), POST (create)
│  │  │     └─ [id]/route.ts       # GET, PATCH, DELETE
│  │  ├─ posts/
│  │  │  ├─ page.tsx               # Server Component (list UI)
│  │  │  └─ actions.ts             # Server Actions
│  │  └─ layout.tsx
│  ├─ lib/
│  │  ├─ supabase/
│  │  │  ├─ client.ts              # browser client (anon)
│  │  │  ├─ route.ts               # auth-aware server client (anon + cookies)
│  │  │  └─ server.ts              # admin client (service_role) — server only
│  │  ├─ validators/               # zod schemas (shared FE + BE)
│  │  └─ http.ts                   # ok()/fail() helpers
│  └─ middleware.ts                # optional: refresh sessions, guard routes
├─ .env.local
└─ package.json
```

**Layering tip (maps to Laravel):** keep DB logic in small functions under
`src/lib/` (your "models/repositories"), and let route handlers stay thin
(your "controllers"). Don't scatter `supabase.from(...)` across many files.

---

## 15. Deploying to Vercel

1. Push the project to GitHub.
2. Go to <https://vercel.com> → **Add New → Project** → import the repo.
3. In **Project Settings → Environment Variables**, add the same keys from
   `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy. Every `git push` redeploys automatically.

Your API routes become serverless functions; your pages are served from the edge/CDN.
Supabase stays where it is — Vercel just talks to it over HTTPS.

> **Free-tier reminders:** Supabase pauses a free project after ~1 week of
> inactivity (restore it from the dashboard). Vercel Hobby is free for personal
> projects.

---

## 16. Common pitfalls

- **Leaking the service_role key.** Never import `server.ts` (admin client) into a
  `'use client'` file. Secrets without `NEXT_PUBLIC_` stay server-side — keep it
  that way.
- **Forgetting to enable RLS.** A table without RLS + the anon key = your whole
  table is public. Enable RLS on every table that holds user data.
- **Using the admin client for user actions.** It bypasses RLS, so a bug can expose
  everyone's data. Default to the anon/route client; reserve admin for trusted jobs.
- **Expecting an always-on server.** Route handlers are serverless — no in-memory
  state between requests, cold starts after idle. Store state in the DB.
- **`await params` / `await cookies()`.** In recent Next.js these are async. If
  TypeScript complains, add the `await`.
- **Validation only on the client.** Always validate on the server too (Zod in the
  route). Client checks are UX, not security.
- **CORS for external callers.** Same-origin (your own frontend) needs nothing.
  If a different domain calls your API, add CORS headers in the route or
  `middleware.ts`.

---

## 17. Next steps & exercises

Build these in order — each adds one concept:

1. **Notes API** — `notes` table + full CRUD with RLS, owned by the logged-in user.
   (Reuse sections 7, 8, 11, 12.)
2. **Auth UI** — sign-up/login/logout pages using the browser client; protect
   `/notes` so logged-out users are redirected.
3. **Relations** — add a `comments` table referencing `notes`; fetch a note *with*
   its comments using `.select('*, comments(*)')`.
4. **Pagination & search** — add `?page=` and `?q=` to your list endpoint using
   `.range()` and `.ilike()`.
5. **File upload** — use Supabase Storage to attach an image to a note.
6. **A webhook** — a Route Handler that uses the admin client to process an external
   event (e.g. a payment callback), bypassing RLS intentionally.

### Reference docs
- Next.js Route Handlers — https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- Next.js Server Actions — https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
- supabase-js (database) — https://supabase.com/docs/reference/javascript/select
- Supabase Auth with Next.js — https://supabase.com/docs/guides/auth/server-side/nextjs
- Row Level Security — https://supabase.com/docs/guides/database/postgres/row-level-security
- Zod — https://zod.dev

---

*You already know the concepts from Laravel — this stack just relocates them:
controllers → route handlers, Eloquent → supabase-js, migrations → SQL,
Policies → RLS. Build the Notes API end-to-end and it will all click.*
