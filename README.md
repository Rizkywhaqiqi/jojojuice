# JOJO Juice

Standalone JOJO Juice profile website extracted from JOJO GROUP. React, TypeScript, and Vite.

## Development

Node.js 22.13+ required. Run `npm install` then `npm run dev`.

## Production

Run `npm run build`. Deploy `dist` to a static host. Vercel: Vite preset, build command `npm run build`, output directory `dist`.

Instagram links point to @jojojuiceid. Group and career links point to the existing JOJO GROUP portal, which currently requires ChatGPT sign-in. No recruitment database, applicant data, or credentials are included. The favicon is a temporary typographic J; replace it with the approved icon when available.

## Connected services

- GitHub: `Rizkywhaqiqi/jojojuice`, production branch `main`.
- Vercel: project `jojojuice`, https://jojojuice.vercel.app/ . Git integration builds each push; `vercel.json` fixes Vite build settings.
- Cloudflare Web Analytics: configured for `jojojuice.vercel.app`. The public beacon identifier is embedded in the page and is not an API credential. Analytics loads on the production hostname only.

Cloudflare DNS is not configured because this account currently has no domain zones. When adding a custom domain, update the canonical URL, Open Graph URLs, sitemap, robots.txt, and analytics hostname together.
