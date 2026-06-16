import { cpSync, existsSync, rmSync } from "node:fs";

const src = "shop/dist";
const dest = "site/app";

if (!existsSync(`${src}/index.html`)) {
  console.error("[stage-shop] shop/dist missing — run: npm run build --prefix shop");
  process.exit(1);
}

rmSync(dest, { recursive: true, force: true });
cpSync(src, dest, { recursive: true });
console.log("[stage-shop] copied shop/dist → site/app");
