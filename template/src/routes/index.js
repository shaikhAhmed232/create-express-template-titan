import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { Router } from "express";

const router = Router();

// Resolve current file and directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function registerRouters() {
  const files = fs.readdirSync(__dirname);
  for (const file of files) {
    if (file === path.basename(__filename)) continue;

    if (!file.endsWith(".js")) continue;

    const filePath = path.join(__dirname, file);
    const endPoint = `/${path.parse(file).name}`;

    const module = await import(filePath);

    // Each module should export: `export default router`
    if (module?.default) {
      router.use(endPoint, module.default);
    }
  }
}

await registerRouters();

export default router;
