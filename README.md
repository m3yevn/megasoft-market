# Megasoft Market

**B2B digital value reseller portal** — browse promotions and products, credit airtime/prepaid to subscribers.

| | |
|---|---|
| **Landing** | https://megasoft-market.vercel.app |
| **Docs** | [/docs](https://megasoft-market.vercel.app/docs) |
| **Client** | This repo (Vue 2 SPA) |
| **API** | [megasoft-market-bff](https://github.com/m3yevn/megasoft-market-bff) |

## What it is (and isn't)

**Yes — selling digital value:** resellers purchase wholesale digital products (mobile airtime, data bundles, prepaid SKUs) and **credit** them to an end user's mobile number or account via async transactions.

**No — not Amazon:** there is no physical cart, shipping, or consumer checkout. It's a **partner portal** on top of an upstream digital value services API.

## Features

- Promotion bundles with operator/country metadata
- Product catalog (wholesale price, benefits, validity, zones)
- Purchase → credit `mobile_number` or `account_number`
- Admin: transactions + balances

## Local dev

```bash
# Terminal 1 — BFF (needs .env)
cd megasoft-market-bff && npm install && npm run dev

# Terminal 2 — Vue client
cd megasoft-market && npm install && npm run serve
```

Docker: `npm run docker-build && npm run docker-run` (port 8080).

## Stack

Vue 2 · Vue Router · Express BFF · JWT auth · axios · Docker

## License

MIT · Kevin Moe Myint Myat · Eternal Flame
