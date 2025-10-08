#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = process.argv[2] || "my-express-app";
const templateDir = path.join(__dirname, "../template");

if (fs.existsSync(targetDir)) {
  console.error(`❌ Directory "${targetDir}" already exists.`);
  process.exit(1);
}

fs.cpSync(templateDir, targetDir, { recursive: true });

console.log(`✅ Project created at ${targetDir}`);

try {
  execSync("npm install", { cwd: targetDir, stdio: "inherit" });
  console.log("🚀 Dependencies installed!");
} catch (e) {
  console.log("⚠️ Failed to install dependencies. Run 'npm install' manually.");
}
