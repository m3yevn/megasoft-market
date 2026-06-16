import type { VercelRequest, VercelResponse } from "@vercel/node";
import { cors, getPromotions, getPromotionById, handleOptions } from "./lib/catalog.js";
import { requireAuth } from "./lib/auth.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;
  cors(res);

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!requireAuth(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const id = req.query.id as string | undefined;
  if (id) {
    const promo = getPromotionById(id);
    if (!promo) return res.status(404).json({ error: "Promotion not found" });
    return res.json(promo);
  }

  return res.json(getPromotions());
}
