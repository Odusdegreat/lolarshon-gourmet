# Lolarshons Gourmet

Premium food, catering, cakes, hampers and mixology website. Next.js (App Router), TypeScript (strict), Tailwind CSS v4, shadcn/ui-style components, Lucide, Motion, Bun.

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
- **Content**: `data/` (menu, gallery, blog, services, navigation). Prices in `data/menu.ts` are illustrative.
- **Logo**: `public/images/logo.png`, rendered only by `components/layout/logo.tsx`. A higher-resolution transparent PNG or SVG is recommended.

## Images still needed

No photography was supplied. A branded placeholder shows wherever a file is missing; add real files at these paths (next/image will use them automatically). Until then the server log shows 404s for them.

- `public/images/blog/celebration-menu.jpg`
- `public/images/blog/corporate-meals.jpg`
- `public/images/blog/gourmet-hamper.jpg`
- `public/images/gallery/cakes-1.jpg`
- `public/images/gallery/cakes-2.jpg`
- `public/images/gallery/cakes-3.jpg`
- `public/images/gallery/events-1.jpg`
- `public/images/gallery/events-2.jpg`
- `public/images/gallery/events-3.jpg`
- `public/images/gallery/food-1.jpg`
- `public/images/gallery/food-2.jpg`
- `public/images/gallery/food-3.jpg`
- `public/images/gallery/food-4.jpg`
- `public/images/gallery/hampers-1.jpg`
- `public/images/gallery/hampers-2.jpg`
- `public/images/hero/hero.jpg`
- `public/images/hero/kitchen.jpg`
- `public/images/menu/asun-platter.jpg`
- `public/images/menu/celebration-hamper.jpg`
- `public/images/menu/chapman.jpg`
- `public/images/menu/chocolate-drip-cake.jpg`
- `public/images/menu/classic-hamper.jpg`
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
