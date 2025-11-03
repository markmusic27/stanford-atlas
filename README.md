<p align="center">
<p align="center">
   <img width="80" height="80" src="https://github.com/markmusic27/stanford-atlas/blob/main/public/brand/logo.png?raw=true" alt="Logo">
  </p>
  <h1 align="center"><b>Stanford Atlas</b></h1>
  <p align="center">
  ✶ AI Course Planning & Academic Advising Platform  ✶
    <br />
    <a href="https://stanfordatlas.com">Try it out »</a>
    <br />
  </p>
</p>

Stanford Atlas is an intelligent planning interface built on Stanford’s sole MCP server ([also developed for Atlas](https://github.com/markmusic27/stanford-mcp)), designed to make course exploration and degree mapping effortless for every student. It aggregates *128k course records* alongside professor reviews, grade distributions, scheduling data, and major requirements to create a **unified academic knowledge base of Stanford.**

![Project Demo](https://github.com/markmusic27/stanford-atlas/blob/main/public/demo.png?raw=true)

## Motivation
At its core, Stanford Atlas takes what has always been a word-of-mouth process, figuring out which classes are actually worth taking, and makes it accessible to everyone.

Like most Stanford students, I found the process of deciding which courses to take, and how to balance what I wanted to study with what I had to, almost incomprehensible. As a sophomore still deciding between EE and CS, I felt the advising resources fell short of helping students make truly informed decisions. Many classes turned out to be very different from what their descriptions suggested—*sometimes harder, less engaging, or packed with unexpected prerequisites.*

By combining all the scattered pieces—course data, historical grade distributions, professor ratings, schedules, and requirements—Atlas builds a complete picture of what a course is actually like. It also extends beyond static search: Atlas leverages LLMs to work for you, programmatically fetching, synthesizing, and reasoning over Stanford’s entire academic dataset to surface what matters most. In doing so, it turns course discovery and degree planning from a manual, fragmented process into an intelligent, conversational experience.

## Technical Overvie
Atlas combines a modern web stack with LLM-based orchestration to create an interactive, data-driven advising platform.

- **Remote MCP Server** — Python + FastAPI service deployed via Docker on Cloud Run. Exposes structured course search and retrieval tools built on Stanford’s ExploreCourses dataset. [[link to GitHub](https://github.com/markmusic27/stanford-mcp)]
- **LLM Tool-Calling Agent** — Powered by `mistral-medium-latest`, the agent dynamically calls MCP tools to search, reason, and synthesize results. Runs server-side via SSR in Next.js for consistent, low-latency responses.  
- **React + Next.js 15 Frontend** — TypeScript/Tailwind app deployed on Vercel, using `zod` for type validation and `zustand` for global state management.
- **Typed Streaming Protocol** — Streams partial assistant responses as structured UI blocks, progressively rendering course cards, grids, and recommendations as results are generated.
- **Supabase Integration** — Manages authentication, session hydration, and user preference–based personalization.

## File structure

```text
atlas/
  api/                     # Python FastAPI service (ExploreCourses wrapper)
    Dockerfile
    pyproject.toml
    src/
      app.py              # /course endpoint
      auth.py             # Bearer auth guard
      handlers.py         # explorecourses integration

  src/                     # Next.js 15 app
    app/
      api/
        stream-content/    # Streaming LLM + MCP
          route.ts
          prompt.ts
          parser.ts
          schemas.ts
        course/
          route.ts         # Proxy → FastAPI course service
      layout.tsx
      page.tsx
    components/            # UI components (Tailwind CSS)
    hooks/                 # e.g., useStreamContent, useCourseServer
    lib/                   # schemas, utils, formatting
    stores/                # Zustand stores (chat, user)
    utils/
      supabase/            # client, server, middleware
  public/                  # static assets (logos, images)
  package.json             # scripts, deps
  next.config.js
  README.md
```

## Inference and Streaming API
**`POST /api/stream-content`**
  - File: `src/app/api/stream-content/route.ts`
  - Uses `@ai-sdk/mistral` with `mistral("mistral-medium-latest")` to stream text and tool calls.
  - Initializes an MCP client to `https://stanfordmcp.com/mcp/` and registers tools (course search, course detail fetch, etc.).
  - Emits NDJSON lines shaped as `PayloadSchema` (see `schemas.ts`) to the browser, ensuring each line is valid and only sending incremental changes.

## API

- POST `/api/stream-content`
  - Streams NDJSON lines matching `PayloadSchema`.
  - Uses Mistral Medium (`mistral-medium-latest`) and remote MCP tools.
  - Requires header `Authorization: Bearer <server API secret>`.

- GET `/api/course`
  - Proxy to the FastAPI service (ExploreCourses wrapper).
  - Query params: `id`, `class_id` (both required), returns JSON course payload.

The FastAPI course service is located under `api/` and exposes typed responses (`CourseResponse`).

## Conventions

- Conventional Commits for history clarity (e.g., `feat(ui): add course-card hover state`).
- Tailwind CSS 4 for styling; utility-first classes across all components.
- Zustand for global state: `src/stores/chat.store.ts`, `src/stores/user.store.ts`.  

## License

Apache-2.0. See `LICENSE` for details.