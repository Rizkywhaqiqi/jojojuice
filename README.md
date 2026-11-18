# JOJO Juice

Independent brand profile website with a protected content dashboard, outlet directory, interactive GIS map, and ordering links. React, TypeScript, Vite, and Leaflet.

## Development

Node.js 22.13+ required.

```sh
npm ci
npm run dev
npm test
npm run build
```

## Architecture

- GitHub: `Rizkywhaqiqi/jojojuice`, production branch `main`.
- Vercel: Vite frontend at https://jojojuice.vercel.app/ . Pushes to `main` deploy automatically.
- Cloudflare Worker: `jojojuice-api`. Same-origin `/api/*` requests are proxied through Vercel.
- Cloudflare D1: `jojojuice-cms`. Database content persists separately from source deployments.
- Cloudflare Web Analytics: production hostname only. The embedded beacon identifier is public, not an API credential.
- Maps: Leaflet with OpenStreetMap tiles and visible attribution; route links open Google Maps.

## Dashboard

Open `/admin`. The owner receives a private one-time activation link to choose their own password (12–128 characters). Activation key is carried in the URL fragment and removed from the address bar after loading. Its hash is configured on the Worker as `BOOTSTRAP_HASH`; never commit the original key. Setup locks after the owner account is created.

Sessions use hashed random tokens and an 8-hour Secure, HttpOnly, SameSite=Strict cookie. Writes require the production Origin and a valid session. Login attempts are rate limited. Passwords use PBKDF2-SHA256 with per-account salts. There is no email password recovery yet; recovery requires an authorized operator using Cloudflare.

Profile, outlet descriptions, hours, coordinates, and order links are stored in D1. Saving uses a version check to prevent overwriting concurrent edits. New outlets start inactive. To hide an outlet, edit it and turn off publication. No fictional outlets are seeded.

## Worker operations

Worker source and schema are in `server/`. `wrangler.json` declares the existing D1 binding. On future Worker deployments preserve the existing `BOOTSTRAP_HASH` binding; it is intentionally absent from source. Apply `server/schema.sql` before first use and insert the default content document only when the `content` row does not already exist. Avoid resetting live content during deployment.

Frontend build: `npm run build`, output `dist`. Vercel configuration is tracked in `vercel.json`. Updating Worker code requires a separate Worker deployment.

## Assets

Official campaign photography is documented in `public/brands/SOURCES.md`. WebP images are served locally; the supplied video is not automatically loaded. Favicon is a temporary typographic J pending an approved icon.

Cloudflare DNS is not configured because the account has no domain zones. When adding a custom domain, update the canonical URL, Open Graph URLs, sitemap, robots.txt, Worker allowed Origin, Vercel rewrites, and analytics hostname together.
