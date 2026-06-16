import type { VercelRequest, VercelResponse } from "@vercel/node";
import { cors, getProducts, handleOptions } from "./lib/catalog.js";
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

  return res.json(getProducts());
}
