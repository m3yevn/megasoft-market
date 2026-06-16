import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    ok: true,
    service: "megasoft-market-api",
    version: "2.0.0",
    timestamp: new Date().toISOString(),
  });
}
