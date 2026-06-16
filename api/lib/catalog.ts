import type { VercelRequest, VercelResponse } from "@vercel/node";
import catalog from "../data/catalog.json";

export type Product = (typeof catalog.products)[number];
export type Promotion = (typeof catalog.promotions)[number];

export function getProducts(): Product[] {
  return catalog.products;
}

export function getProductById(id: string): Product | undefined {
  return catalog.products.find((p) => p.id === id);
}

export function getPromotions(): Promotion[] {
  return catalog.promotions.map((promo) => ({
    ...promo,
    products: promo.product_ids
      .map((pid) => getProductById(pid))
      .filter(Boolean) as Product[],
  }));
}

export function getPromotionById(id: string) {
  const promo = catalog.promotions.find((p) => p.id === id);
  if (!promo) return undefined;
  return {
    ...promo,
    products: promo.product_ids
      .map((pid) => getProductById(pid))
      .filter(Boolean) as Product[],
  };
}

export function cors(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export function handleOptions(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    cors(res);
    res.status(204).end();
    return true;
  }
  return false;
}
