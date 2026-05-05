# Heroes App SPA

A single-page application for browsing, searching, and managing a catalog of superheroes and villains. The UI consumes a REST API and supports favorites, filters, pagination, and detailed hero profiles.

<img width="1240" height="1085" alt="asdas" src="https://github.com/user-attachments/assets/5efb2323-40d6-4e95-9036-86902204fd86" />

**Live demo:** [HeroesSPA](https://heroesappspa.netlify.app/)

---

## Features

- **Home dashboard** — Summary statistics, tabbed views (all characters, favorites, heroes only, villains only), URL-driven pagination (`page`, `limit`, `category`, `tab`), and a responsive hero grid.
- **Hero detail** — Full profile with stats (strength, intelligence, speed, durability), team, universe, powers, and visual progress indicators; invalid slugs redirect home.
- **Search** — Query heroes by name, strength, team, category, universe, and status; results cached with TanStack Query.
- **Favorites** — Toggle favorites per hero; state persisted in `localStorage` via React Context.
- **Theming** — Global theme context for consistent light/dark (or app-wide) styling.
- **Admin section** — Route scaffold at `#/admin` (placeholder page for future tools).
- **Code splitting** — Route-level lazy loading for faster initial load.
- **Developer experience** — React Query Devtools, ESLint, Vitest with Testing Library and optional coverage.

---

## Tech Stack

| Area | Technology |
|------|------------|
| Runtime | React 19 |
| Language | TypeScript |
| Build & dev server | Vite 7 (`@vitejs/plugin-react-swc`) |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`), `tw-animate-css` |
| Routing | React Router 7 — **hash router** (`createHashRouter`) |
| Data fetching | TanStack Query (React Query) 5 |
| HTTP client | Axios (`src/heroes/api/hero.api.ts`) |
| UI primitives | Radix UI–based components (shadcn-style), `class-variance-authority`, `clsx`, `tailwind-merge` |
| Icons | Lucide React |
| Tests | Vitest, jsdom, Testing Library |

Path alias: `@` → `src` (see `vite.config.ts` and `tsconfig`).

---

## Project Structure (overview)

```
src/
├── HeroesApp.tsx          # Root: Theme, QueryClient, Favorites, Router
├── main.tsx
├── router/app.router.tsx  # Hash routes: /, /heroes/:idSlug, /search/, /admin
├── contexts/ThemeContext.tsx
├── heroes/
│   ├── api/               # Axios instance → VITE_API_URL + /api/heroes
│   ├── actions/           # Server actions / query functions
│   ├── components/      # HeroGrid, HeroStats, cards, etc.
│   ├── context/           # FavoriteHeroContext (localStorage)
│   ├── hooks/             # Pagination, summary, search helpers, sound
│   ├── pages/             # Home, Search, Hero detail
│   └── types/             # Hero interface & API response types
├── admin/                 # Admin layout & placeholder page
└── components/            # Shared UI (custom + shadcn-style ui/)
```

---

## Prerequisites

- **Node.js** (LTS recommended)
- A running **backend** that exposes the heroes API under the base URL you configure (see Environment variables).

---

## Environment Variables

Create a `.env` file in the project root (you can copy `.env.template`):

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Base URL of your API server (no trailing path to `/api/heroes`; the client appends `/api/heroes`). Example: `http://localhost:3000` |

Example:

```env
VITE_API_URL=http://localhost:3000
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open the URL printed in the terminal (typically `http://localhost:5173`). Routes use the hash (`#`), e.g. `http://localhost:5173/#/`, `http://localhost:5173/#/search/`.

### Production build

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite in development mode |
| `npm run build` | Typecheck and produce production assets |
| `npm run preview` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest |
| `npm run test:ui` | Vitest with UI |
| `npm run coverage` | Tests with coverage report |

---

## API Client

The Axios instance is configured in `src/heroes/api/hero.api.ts` with:

- `baseURL`: `${VITE_API_URL}/api/heroes`

Ensure your backend implements the endpoints expected by the actions in `src/heroes/actions/` (list by page, get one by slug, search, summary, filter options, etc.).

---

## Testing

Tests live alongside source files (e.g. `*.test.ts`, `*.test.tsx`). Run `npm run test` or `npm run coverage` after installing dependencies. Use `.env.test` if your test setup requires mocked env values.

---

## License

This repository is for educational purposes (course project). Adjust licensing if you publish or reuse the code.

---

## Author

**Brian Alexis Acuña**

- [LinkedIn](https://www.linkedin.com/in/brian-alexis-acu%C3%B1a/)
