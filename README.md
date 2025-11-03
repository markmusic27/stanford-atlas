<p align="center">
<p align="center">
   <img width="130" height="130" src="https://github.com/markmusic27/stanford-atlas/blob/main/public/brand/logo.png?raw=true" alt="Logo">
  </p>
  <h1 align="center"><b>Stanford Atlas</b></h1>
  <p align="center">
  ✶ AI Course Planning & Academic Advising Platform  ✶
    <br />
    <a href="https://stanfordatlas.com">Try it out »</a>
    <br />
  </p>
</p>

Stanford Atlas is a Next.js 15 application that streams structured advising content from the Mistral Medium model in real time. The server orchestrates tool-augmented inference via a remote MCP server to query Stanford's course catalog, then emits NDJSON lines conforming to strict Zod schemas. The client incrementally parses these lines and renders typed UI blocks (markdown, course-card, course-list) for a fast, interactive course-planning experience. Personalization (major/interests/goals) and auth are powered by Supabase. The app’s model runtime uses `@ai-sdk/mistral` with `mistral("mistral-medium-latest")`.

![Project Demo](https://github.com/markmusic27/stanford-atlas/blob/main/public/image.png?raw=true)


## Overview

Stanford Atlas is an AI course planning and advising platform that combines:

- A tool-using agent backed by Mistral Medium for natural language advising
- A remote MCP server exposing course search and retrieval tools backed by ExploreCourses
- A typed streaming protocol that renders partial assistant results as concrete UI blocks
- Supabase for authentication, session hydration, and user preference–based personalization

I also independently built the production MCP service that powers Atlas’s tools: [Stanford MCP](https://github.com/markmusic27/stanford-mcp). It’s deployed at `https://stanfordmcp.com/mcp/` and exposes the courses toolset used by Atlas.


## System architecture (high level)

- **Frontend (Next.js 15, React 19)**: Renders chat and course UIs; consumes NDJSON from the server and updates state via Zustand.
  - Streaming hook: `src/hooks/useStreamContent.ts` parses newline-delimited JSON, validates each line against Zod, and incrementally updates the chat UI.
  - UI blocks: `markdown`, `course-card`, `course-list` are rendered via components under `src/components/ui` and `src/components/single-course-card` / `course-grid`.

- **Inference and streaming API**: `POST /api/stream-content`
  - File: `src/app/api/stream-content/route.ts`
  - Uses `@ai-sdk/mistral` with `mistral("mistral-medium-latest")` to stream text and tool calls.
  - Initializes an MCP client to `https://stanfordmcp.com/mcp/` and registers tools (course search, course detail fetch, etc.).
  - Emits NDJSON lines shaped as `PayloadSchema` (see `schemas.ts`) to the browser, ensuring each line is valid and only sending incremental changes.

- **Typed streaming protocol**
  - Zod schemas in `src/app/api/stream-content/schemas.ts` define the wire format:
    - `BlockSchema` union of `markdown | course-card | course-list`
    - `PayloadSchema` with `{ chainOfThought, reasoning, blocks }`
  - The server validates candidate payloads before emitting; the client validates again prior to rendering.

- **Course data service**
  - Internal proxy: `GET /api/course` → `src/app/api/course/route.ts`
  - Forwards to a FastAPI wrapper around the `explorecourses` library (deployed on Cloud Run) with a bearer token (`COURSE_API_KEY`).
  - Python service lives in `api/` and exposes a typed `CourseResponse` that the frontend formats for UI consumption.

- **Auth and personalization (Supabase)**
  - Server-side client: `src/utils/supabase/server.ts` and middleware for session continuity.
  - `UserStoreHydrator` rehydrates auth state on the client.
  - `constructPrompt` reads `user_preferences` (major, interests, future goals) and appends a personalization section to the system prompt.


## Model and tool usage

- **Model**: Mistral Medium via `@ai-sdk/mistral`, explicitly: `mistral("mistral-medium-latest")`.
- **Orchestration**: `ai.streamText` full stream with event handling for `reasoning-start`, `tool-call`, `text-start`, and `text-delta`.
- **Tooling via MCP**: The API connects to the remote MCP server and obtains the tool manifest at runtime; the agent is constrained to use only those tools and to a max of 4 tool calls per response.
- **Safety/consistency**: The agent’s output is strictly marshaled into typed UI blocks before being sent to the client.

Related MCP project powering the tools: [github.com/markmusic27/stanford-mcp](https://github.com/markmusic27/stanford-mcp).


## Prompt design (selected constraints)

Defined in `src/app/api/stream-content/prompt.ts`:

- Target role and voice for an academic advisor (Stanford-specific)
- Tool-only responses (no fabrication; no emojis)
- Hard cap of 4 tool calls per answer
- Required use of `course-card`/`course-list` blocks when presenting course info

This prompt is augmented with user personalization based on Supabase-stored preferences and display name.


## Streaming details

The server converts model deltas into a buffer and periodically emits NDJSON lines when a valid `PayloadSchema` state can be constructed. On the client:

1. Fetch is initiated with `Authorization: Bearer NEXT_PUBLIC_API_SECRET_KEY`.
2. The browser reads the response stream, splits on newlines, and `JSON.parse`s each line.
3. Lines are validated against Zod; valid lines update the chat store (`zustand`).
4. The UI renders partial blocks immediately (optimistic, debounced by schema changes).

This design achieves low-latency interactivity while keeping the client strictly typed.


## Local development

Prereqs: Node 20+, pnpm, a Supabase project, and API keys.

```bash
pnpm install
pnpm dev
```

Environment variables (see `src/env.js` for validation):

```bash
# Server-only
NODE_ENV=development
API_SECRET_KEY=...                # server gate for /api/stream-content
COURSE_API_KEY=...                # bearer for the Course API proxy
MISTRAL_API_KEY=...               # used by @ai-sdk/mistral
OPENAI_API_KEY=...                # reserved; not required for Mistral flow
ANTHROPIC_API_KEY=...             # reserved; not required for Mistral flow
MCP_KEY=...                       # bearer for remote MCP server
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET=...

# Exposed to client
NEXT_PUBLIC_API_SECRET_KEY=...    # client → server auth for /api/stream-content
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Key scripts:

```bash
pnpm dev        # run Next.js in dev
pnpm build      # production build
pnpm preview    # build + start
pnpm typecheck  # TypeScript checks
pnpm lint       # ESLint
```


## Tech stack

- **Web**: Next.js 15, React 19, Tailwind CSS 4
- **AI runtime**: `ai@^5`, `@ai-sdk/mistral@^2` (Mistral Medium)
- **Tooling**: MCP client (`@modelcontextprotocol/sdk`) against remote MCP server
- **Data**: FastAPI wrapper around `explorecourses` (Python) → proxied by Next.js route
- **State**: Zustand stores for chat and user
- **Types**: Zod-validated streaming protocol and UI block schema


## Security and privacy

- `POST /api/stream-content` is gated by a server-side `API_SECRET_KEY`.
- The client never sees model API keys; it only presents `NEXT_PUBLIC_API_SECRET_KEY` to reach the server route.
- Tool responses are the sole source of course data (no fabricated course facts).


## Related work

- Stanford MCP (tools backend for Atlas): [https://github.com/markmusic27/stanford-mcp](https://github.com/markmusic27/stanford-mcp)


## License

Apache-2.0. See `LICENSE` for details.