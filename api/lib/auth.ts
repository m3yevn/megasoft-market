import jwt from "jsonwebtoken";
import type { VercelRequest } from "@vercel/node";

const SECRET = process.env.JWT_SECRET || "megasoft-parody-demo-not-for-production";

const USERS: Record<string, { password: string; type: "reseller" | "admin" }> = {
  demo: { password: "demo", type: "reseller" },
  admin: { password: "admin", type: "admin" },
};

export function login(username: string, password: string) {
  const user = USERS[username];
  if (!user || user.password !== password) return null;
  const token = jwt.sign({ username, type: user.type }, SECRET, { expiresIn: "7d" });
  return { token, type: user.type };
}

export function validateToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { username: string; type: string };
  } catch {
    return null;
  }
}

export function requireAuth(req: VercelRequest) {
  const header = req.headers.authorization;
  const token = header?.replace(/^Bearer\s+/i, "") || "";
  return validateToken(token);
}
