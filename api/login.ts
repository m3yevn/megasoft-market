import type { VercelRequest, VercelResponse } from "@vercel/node";
import { cors, handleOptions } from "./lib/catalog.js";
import { login, validateToken } from "./lib/auth.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;
  cors(res);

  if (req.method === "POST" && req.url?.includes("validate")) {
    const { token } = req.body || {};
    const user = token ? validateToken(token) : null;
    return res.json({ isValid: !!user });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body || {};
  const result = login(username, password);
  if (!result) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  return res.json({ isLogin: true, token: result.token, type: result.type });
}
