import type { VercelRequest, VercelResponse } from "@vercel/node";
import { cors, handleOptions } from "./lib/catalog.js";
import { validateToken } from "./lib/auth.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;
  cors(res);
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { token } = req.body || {};
  const user = token ? validateToken(token) : null;
  return res.json({ isValid: !!user });
}
