import type { VercelRequest, VercelResponse } from "@vercel/node";
import { cors, getProductById, handleOptions } from "../lib/catalog.js";
import { requireAuth } from "../lib/auth.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;
  cors(res);

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!requireAuth(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const id = req.query.id as string;
  const product = getProductById(id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  return res.json(product);
}
