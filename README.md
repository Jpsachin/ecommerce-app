# Ecommerce App

A responsive e-commerce storefront built with Next.js App Router and TypeScript. Products are loaded from the public DummyJSON Products API.

## Prerequisites

- Node.js 20.9 or newer
- pnpm 10

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

For a production build:

```bash
pnpm build
pnpm start
```

## Tests

```bash
pnpm test
```

## Architecture and key decisions

- Server components fetch catalog and product data from DummyJSON through `app/lib/products.ts`.
- Presentation is split into reusable product cards, header, product controls, and cart components.
- React Context manages cart state and quantities across the application.
- Cart contents are persisted in `sessionStorage`; hydration completes before cart controls rely on restored data.
- Plain CSS keeps the dependency list small and provides responsive layouts without a component library.

## Trade-offs and limitations

- Product data and product images depend on the availability of the public DummyJSON service.
- Product API requests are cached and revalidated for five minutes, so changes to DummyJSON may not appear immediately.
- The cart is intentionally session-scoped and is not synchronized across browser tabs or devices.
- This assignment does not include checkout, authentication, inventory reservations, or payments.
