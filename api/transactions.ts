import type { VercelRequest, VercelResponse } from "@vercel/node";
import { cors, getProductById, handleOptions } from "./lib/catalog.js";
import { requireAuth } from "./lib/auth.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;
  cors(res);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const user = requireAuth(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { productId, creditTo } = req.body || {};
  const product = getProductById(productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const field = product.required_credit_party_identifier_fields?.[0]?.[0] || "email";
  const value = creditTo?.[field];
  if (!value || typeof value !== "string") {
    return res.status(400).json({
      errors: [{ code: 1000400, message: `${field} is required.` }],
    });
  }

  const id = `txn_${Date.now().toString(36)}`;
  return res.json({
    id,
    status: {
      class: { message: "Delivered (probably)" },
      id: "completed",
    },
    message: `Parody asset "${product.name}" queued for ${value}. No actual goods were harmed.`,
    suggested_donation: product.prices.suggested_donation,
    disclaimer:
      "This is a demo. Nothing was sold. Optional donations are voluntary gifts, not purchases.",
  });
}
