# AI Development Rules

Before changing this repository, read this file and the relevant files under `app/`.

## Architecture

- This is Next.js App Router with TypeScript and pnpm.
- Keep server-side API fetching in `app/lib/`; reusable presentation belongs in `app/components/`.
- Server components should handle page data fetching. Use client components only for interaction and browser state.
- Preserve the `/`, `/products/[id]`, and `/cart` routes.

## Implementation conventions

- Use semantic HTML, accessible names, keyboard-operable controls, and meaningful image alternative text.
- Keep styling in `app/globals.css` unless a change clearly requires route-scoped styles.
- Format prices through `formatCurrency` in `app/lib/products.ts`.
- Do not call the live DummyJSON API in tests; mock requests at the API boundary.
- Keep dependencies minimal and respect the existing pnpm package manager.
- Handle loading, empty, API failure, malformed data, and not-found states explicitly.

## Cart conventions

- Quantities are summed for the header and cart item counts.
- Cart data lives in React Context and persists in `sessionStorage` under `ecommerce-cart`.
- Do not write storage during hydration before restored data has loaded.
- Invalid, outdated, or inaccessible storage must fall back safely to an empty cart.

## Verification

- Run `pnpm lint`, relevant tests, and `pnpm build` before finalizing user-facing changes.
- Do not claim a check passed unless it was run in the current change.
- Keep commits focused and do not add unrelated features.
