# Luka Torres — Portfolio

Multi-page portfolio focused on backend development, databases, Linux hardening, and local tools. Each project is documented from the problem through the decisions, code, and results.

## Stack

- **Next.js 16** (App Router, React Server Components where possible)
- **React 19**
- **TypeScript**
- **Tailwind CSS** with a custom design system built on CSS variables
- **Route Handlers** for health checks and contact validation
- No UI framework, no animation library, no client-side data fetching dependencies

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Introduction, project highlights, results, and working principles |
| `/proyectos` | Searchable and filterable project index |
| `/proyectos/[id]` | Project detail: problem, architecture, decisions, results, and code |
| `/sobre-mi` | Profile, background, tools, and recent work |
| `/contacto` | Validated contact form with a mailto fallback |

## Local development

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

```bash
npm run build
npm run start
npm run typecheck
```

## Environment

See `.env.example`.

- `NEXT_PUBLIC_SITE_URL` — canonical URL used by `metadataBase`, Open Graph, sitemap, and robots. Falls back to `http://localhost:3000`.
- `RESEND_API_KEY` — optional. Enables contact-form delivery through Resend.
- `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` — optional delivery addresses.

## Contact API

`POST /api/contact` validates name, email, and message. Without `RESEND_API_KEY`, it returns a validated `mailto:` draft. Malformed JSON and missing or invalid fields return `400`.

The endpoint is limited to 5 requests per 10 minutes per client IP and returns `429` with `Retry-After` when the limit is exceeded.

## Architecture notes

- **Shared shell**: `src/components/SiteShell.tsx` owns theme, language, and shared navigation state so pages keep the selected preferences.
- **Design tokens**: RGB channel variables (`--ink-rgb`, `--acc-rgb`, …) allow Tailwind opacity modifiers such as `border-ink/20` while preserving light and dark themes.
- **Security headers**: CSP, HSTS, nosniff, frame denial, referrer policy, and Permissions Policy are configured in `next.config.js`.
- **Rate limiting**: `src/lib/rate-limit.ts` applies an in-memory fixed window per client IP. Replace the store with Redis for multi-instance or serverless deployments.
- **Images**: originals live in `assets/images`; only optimized derivatives are shipped from `public`.
- **Metadata**: canonical URLs, Open Graph, and Twitter cards are generated from `src/lib/site.ts`.
- **404 metadata**: Next.js can ignore metadata exported from `not-found.tsx` for unmatched routes; `NotFoundMeta` sets the title and `noindex, nofollow` on the client while the route still responds with HTTP `404`.

## Quality checklist

- Keyboard navigation and a skip link on every page
- `prefers-reduced-motion` handling for the ticker and card effects
- Responsive down to 390 px without horizontal scroll
- Validated API input with `400` / `429` responses and `Retry-After`
- No third-party analytics or trackers

## License

Personal portfolio. Case-study text and identity assets are not reusable without permission; code patterns may be referenced.
