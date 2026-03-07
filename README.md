# Bizarre Lineage Wiki

The ultimate optimization hub for [Bizarre Lineage](https://www.roblox.com/) (Roblox). Fan-made, not affiliated with Roblox or the game developers.

## Live Pages

| Page | Route | Purpose |
|------|-------|---------|
| Homepage | `/` | Search, trending stands, CTA hub |
| Tier List | `/tier-list` | Filterable S+/S/A/B rankings (Overall / PvP / PvE) |
| Build Planner | `/build-planner` | Stand + Style + Sub → 5-dimension score |
| Vault | `/vault` | Save / export / import builds (localStorage) |
| Compare | `/compare` | Side-by-side build diff with stat highlighting |
| Stand Pages | `/stands/[slug]` | 17 individual SSG pages with SEO metadata |
| Fighting Styles | `/fighting-styles/[slug]` | Style details (Boxing, Kendo, Karate) |
| Sub-Abilities | `/sub-abilities/[slug]` | Sub details (Hamon, Vampire, Cyborg, Spin) |
| Codes | `/codes` | Active game codes tracker |
| Guides | `/guides/leveling`, `/guides/prestige` | Progression guides |

## Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS (dark theme, grid background)
- **Data**: Static JSON (`src/data/`)
- **Storage**: `localStorage` via custom `useLocalStorage<T>` hook
- **SEO**: Route-level `generateMetadata`, `sitemap.ts`, `robots.ts`, misspelling redirects

## Data Files

All game data lives in `src/data/`:

- `stands.json` — 17 Stands with scores, tier, moves, counters, FAQ
- `fighting-styles.json` — 3 Fighting Styles (Boxing, Kendo, Karate)
- `sub-abilities.json` — 3 Sub-Abilities (Hamon, Vampire, Cyborg)

**To add a new Stand:** Add an entry to `stands.json` following the existing schema. The SSG pipeline (`generateStaticParams`) will auto-create the page.

## Development

```bash
npm install
npm run dev        # → http://localhost:3000
npm run build      # production build + static export
```

## Deployment

Optimized for [Vercel](https://vercel.com):

```bash
npx vercel --prod
```

Or push to `main` with Vercel GitHub integration for auto-deploy.

## SEO Features

- Misspelling redirects (`bizare` → `bizarre`, `bizzare` → `bizarre`)
- Comprehensive `sitemap.xml` covering all 37 URLs
- `robots.txt` with sitemap reference
- Per-page `<title>` and `<meta description>` via route-level metadata
- Structured H1/H2 hierarchy on all pages

## License

Fan-made project. Game data sourced from public Trello board and community resources.
