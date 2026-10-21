# Convex and Next.js real-time demo

A small full-stack starter that shows live presence and a shared todo list, with Convex keeping every connected browser in sync without polling.

## The problem

Real-time features usually mean wiring websockets, a server cache and client state by hand. This project shows another approach: components subscribe to queries, and the backend pushes changes. An update in one browser appears in the others without a refresh and without a separate API layer.

## What it does

- **Email sign-in.** Entering an email creates the user, or signs in the existing user with that address.
- **Live presence list.** Every user is shown as online or offline, and the list updates as people sign in and out.
- **Per-user todos.** Each signed-in user adds todos and toggles them done. Every todo shows who created it.
- **Expiring todos.** Each new todo is scheduled for deletion five seconds after it is created.
- **Logout.** Marks the user offline and returns to the sign-in form.

## How it's built

- **Stack:** Next.js 15 with the App Router and Turbopack, React 19, Convex, Tailwind CSS v4, Radix UI primitives and TypeScript.
- **Reactive data flow.** Components call `useQuery` and `useMutation` from `convex/react` with generated API types, so the UI re-renders when the data changes. The schema has two tables: `user` (email, online, indexed by `byEmail`) and `todo` (title, completed, `createdBy`, `lastUpdatedBy`, indexed by `byCreatedBy`).
- **Expiry runs on the server.** `todos.createTodo` schedules the internal mutation `todos.destruct` with `ctx.scheduler.runAfter`, so deletion does not depend on a browser staying open.
- **One client provider.** `ConvexClientProvider` reads `NEXT_PUBLIC_CONVEX_URL` once and wraps the app in `app/layout.tsx`.

## Running it locally

```bash
pnpm install
```

Create `.env.local` with your Convex deployment URL:

```env
NEXT_PUBLIC_CONVEX_URL="your-convex-deployment-url"
```

Then, in two terminals:

```bash
npx convex dev            # Convex backend, keep running
pnpm dev                  # Next.js with Turbopack on http://localhost:3000
```

Other scripts: `pnpm build`, `pnpm start`, `pnpm lint`.

## What I learned and what I'd do next

- **Todo lifetime doesn't match its name.** `createTodo` defines an unused `after24Hours` constant, but the scheduler deletes todos after 5,000 ms. Pick the intended lifetime and make the code and the names agree.
- **Authorization is missing.** `todos.updateTodo` accepts any todo ID, with no ownership check, and `user.getUsers` returns every user's email. Add ownership checks and real sign-in before any real data goes in.
- **Presence is only cleared on Logout.** Closing the tab leaves a user shown as online. A heartbeat or Convex presence component would fix it.
- **No tests.** `convex/README.md` is still the Convex template text and should be replaced with a description of this project's functions.
