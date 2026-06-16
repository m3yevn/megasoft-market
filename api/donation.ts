import type { VercelRequest, VercelResponse } from "@vercel/node";
import { cors, handleOptions } from "./lib/catalog.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;
  cors(res);

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  return res.json({
    disclaimer:
      "Megasoft Market is a parody demo. Payments below are voluntary donations — not a store, not financial advice, not a business.",
    paynow: {
      label: "PayNow (Singapore)",
      qrUrl: process.env.DONATION_PAYNOW_QR_URL || null,
      placeholder: "Add DONATION_PAYNOW_QR_URL on Vercel when ready",
    },
    tng: {
      label: "Touch 'n Go eWallet",
      qrUrl: process.env.DONATION_TNG_QR_URL || null,
      placeholder: "Add DONATION_TNG_QR_URL on Vercel when ready",
    },
    suggestedAmounts: [2, 5, 10, "whatever you want"],
    message:
      "If this made you smile, you can send a consensual gift. No pressure. No goods owed.",
  });
}
