# Megasoft Market

**Parody B2B digital nonsense portal** — AI prompts, 3D models, meme NFTs, and other absurd SKUs. Full mock catalog on Vercel.

| | |
|---|---|
| **Landing** | https://megasoft-market.vercel.app |
| **Shop** | [/app](https://megasoft-market.vercel.app/app/) |
| **Docs** | [/docs](https://megasoft-market.vercel.app/docs) |
| **Legacy** | Vue 2 client in `legacy/vue2-client/` · [megasoft-market-bff](https://github.com/m3yevn/megasoft-market-bff) |

## What it is (and isn't)

**Yes — parody marketplace:** resellers browse promotions and “acquire” nonsense digital goods via a mock transaction API. Suggested donation amounts are optional hints.

**No — not a real business:** PayNow / Touch ’n Go QR codes are **voluntary consensual gifts**, not purchases. No upstream telco API. No goods owed.

## Demo login

- Reseller: `demo` / `demo`
- Admin: `admin` / `admin`

## Features

- 12 mock products + 3 promotion bundles (`data/catalog.json`)
- Vue 3 + Vite shop at `/app`
- Vercel serverless API (`api/`)
- Donation page with QR env placeholders

## Local dev

```bash
npm install && npm install --prefix shop
npm run dev:shop          # Vite on :5173, proxies /api
vercel dev                # full stack including API
```

## Env (Vercel)

See `.env.example` — `JWT_SECRET`, `DONATION_PAYNOW_QR_URL`, `DONATION_TNG_QR_URL`.

## Stack

Vue 3 · Vite · Vue Router · Vercel serverless · JWT · TypeScript

## License

MIT · Kevin Moe Myint Myat · Eternal Flame
