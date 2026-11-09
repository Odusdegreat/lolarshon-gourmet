# Lolar Shon's Gourmet

Premium food, catering, cakes and mixology website. Next.js (App Router), TypeScript (strict), Tailwind CSS v4, shadcn/ui-style components, Lucide, Motion, Bun.

## Run

```bash
bun install
bun dev            # http://localhost:3000
bun run lint
bunx tsc --noEmit
bun run build && bun run start
```

## Configuration

- **Business details** (phone, WhatsApp, email, structured address, hours, social links): `lib/site-config.ts`. Everything reads from here.
- **WhatsApp helpers** (number normalisation, URL building, order/enquiry messages): `lib/whatsapp.ts`.
- **Env vars**: copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_SITE_URL` for production.
- **Content**: `data/` (menu, gallery, blog, services, navigation). Menu prices are listed in NGN.
- **Logo**: `public/images/logo.png`, rendered only by `components/layout/logo.tsx`. A higher-resolution transparent PNG or SVG is recommended.
- **Blog CMS**: Sanity Studio is available at `/studio`. The blog, homepage preview, and sitemap use published Sanity posts. Presentation Tool previews drafts through Next.js Draft Mode.

## Sanity setup

Copy `.env.example` to `.env.local` and set the Sanity project settings. `SANITY_API_READ_TOKEN` must be a server-side read token for draft previews and private Blog Manager statistics; never prefix it with `NEXT_PUBLIC_`. `SANITY_API_WRITE_TOKEN` is used only by trusted server-side generation-request routes and automation. `SANITY_WEBHOOK_SECRET` signs publishing webhooks.

Sign in to `/studio` with a Sanity account that has access to project `7914q9uo`. Studio permissions are managed by Sanity; this application does not implement a separate login. Add the website origin to the Sanity project's CORS origins, with credentials enabled for Presentation Tool previews.

Configure a Sanity webhook to send POST requests to `/api/sanity/webhook`, use the same secret as `SANITY_WEBHOOK_SECRET`, and include `_id`, `_type`, and `slug` in the payload. For reliable slug invalidation on updates/deletes, use a projection equivalent to `"slug": coalesce(after().slug.current, before().slug.current)`. The endpoint validates Sanity's request signature, ignores draft document changes, and revalidates the blog listing, the affected article, and the sitemap for published document changes.

The Next.js App Router supports Route Handlers, so webhook revalidation is implemented. The repository does not identify a production hosting provider; confirm that the deployment supports Next.js Route Handlers and permits the configured webhook URL.

Blog post, author, and category schemas are defined in `sanity/schemaTypes/`. OpenRouter and n8n are not connected. The schema accepts drafts, while only a manual publish action in Sanity Studio makes a post public.

## Private AI Blog Manager

The private dashboard is at `/admin/blog-manager`. It includes `/admin/blog-manager/articles`, `/admin/blog-manager/create`, `/admin/blog-manager/generate`, `/admin/blog-manager/history`, and `/admin/blog-manager/settings`. There is no existing site authentication provider, so these routes use an HTTP-only, signed eight-hour session cookie. Configure a `BLOG_MANAGER_PASSWORD` of at least 8 characters and a random `BLOG_MANAGER_SESSION_SECRET` of at least 32 characters on the server. Neither value is sent to the browser. The login endpoint checks same-origin requests. Configure your hosting provider's rate limiting or firewall for `/api/admin/blog-manager/auth/login`; the repository does not include a persistent rate-limit service.

Manual article creation and editing use the existing `blogPost` schema. The editor uploads images and saves articles as Sanity drafts through authenticated, same-origin server routes; the Sanity write token must allow image uploads and draft blog-post creation/update. New drafts are not published by the website. Use the article's Studio link to review and publish or unpublish it through Sanity's permissions. Categories and authors must exist as published Sanity documents before they can be selected. The editor supports headings, paragraphs, bullet and numbered lists, links, quotes, inline article images, featured-image alt text, tags, excerpts, and SEO metadata.

Article generation is disabled until all of these are configured server-side:

- `SANITY_API_READ_TOKEN` with permission to query published and draft blog posts and generation-request documents.
- `SANITY_API_WRITE_TOKEN` with permission to create and update `blogGenerationRequest` documents.
- `N8N_BLOG_GENERATION_WEBHOOK_URL` (HTTPS outside local development).
- `N8N_BLOG_GENERATION_WEBHOOK_SECRET`.

The Next.js API sends an authenticated JSON POST to n8n with `Authorization: Bearer <shared-secret>`, `X-Blog-Manager-Batch-Id`, a batch ID, timestamp, and one request ID plus topic per selected idea. The shared secret is server-to-server only. Configure the n8n webhook to validate that bearer value, acknowledge promptly with a successful 2xx response, and treat request IDs as idempotency keys. A slow synchronous n8n response can exceed the API's 20-second timeout.

The Studio registers `blogGenerationRequest` as a separate workflow record type; it does not duplicate or replace the blog-post schema. The n8n workflow must update each request record to `processing`, then `draftCreated` with `articleTitle` and `articleSlug`, or `failed` with a safe `errorMessage`. It must create the article in Sanity as a draft, resolve existing author/category references, upload/set its featured image, and never publish it. The history page infers `Published` when the saved article slug exists as a public post. Retrying a failed item resends the same request ID, so the n8n workflow must be idempotent.

OpenRouter credentials and image-generation configuration belong in n8n's credential store; they are not read by this website. The dashboard and secured integration boundary are implemented, but actual generation, image creation, and draft creation are unavailable until the external workflow is configured and updates the Sanity request records. Review and publish generated articles manually in `/studio`.

## Images still needed

No photography was supplied. A branded placeholder shows wherever a file is missing; add real files at these paths (next/image will use them automatically). Until then the server log shows 404s for them.

- `public/images/gallery/cakes-1.jpg`
- `public/images/gallery/cakes-2.jpg`
- `public/images/gallery/cakes-3.jpg`
- `public/images/gallery/events-1.jpg`
- `public/images/gallery/events-2.jpg`
- `public/images/gallery/food-1.jpg`
- `public/images/gallery/food-2.jpg`
- `public/images/hero/hero.jpg`
- `public/images/hero/kitchen.jpg`
- `public/images/menu/asun-platter.jpg`
- `public/images/menu/chapman.jpg`
- `public/images/menu/chocolate-drip-cake.jpg`
- `public/images/menu/cupcake-box.jpg`
- `public/images/menu/dessert-cups.jpg`
- `public/images/menu/egusi-pounded-yam.jpg`
- `public/images/menu/fruit-smoothie.jpg`
- `public/images/menu/hibiscus-spritz.jpg`
- `public/images/menu/iced-tea.jpg`
- `public/images/menu/jollof-grilled-chicken.jpg`
- `public/images/menu/lagos-sunset.jpg`
- `public/images/menu/mango-mule.jpg`
- `public/images/menu/ofada-rice-sauce.jpg`
- `public/images/menu/peppered-turkey.jpg`
- `public/images/menu/pineapple-ginger.jpg`
- `public/images/menu/red-velvet-cake.jpg`
- `public/images/menu/seafood-pasta.jpg`
- `public/images/menu/spiced-old-fashioned.jpg`
- `public/images/menu/zobo.jpg`

## Notes

- No payment gateway, database or backend. Orders, reservations and enquiries open WhatsApp with a prefilled message; nothing is sent until the customer presses send.
- Mixology items are enquiry-only. Set `orderable: true` on an item in `data/menu.ts` to allow add to cart.
- Fonts are self-hosted with `next/font/local` (Playfair Display, Montserrat from `@fontsource-variable`).
- Cache Components and Partial Prefetching are enabled (Next.js 16 scaffold defaults).
