import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = join(__dirname, "..", "src", "pipecraft.css");
const destDir = join(__dirname, "..", "dist");
const dest = join(destDir, "pipecraft.css");

mkdirSync(destDir, { recursive: true });
copyFileSync(src, dest);
console.log("copied pipecraft.css -> dist/pipecraft.css");
