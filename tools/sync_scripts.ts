import fs from "node:fs";
import path from "node:path";

const sourceDir = path.resolve(__dirname, "../scripts");
const targetDir = path.resolve(__dirname, "../lenslist_clad_spatial_org/Assets/scripts");

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir).filter((file) => file.endsWith(".ts"));

console.log(`[Script Sync] Synchronizing ${files.length} scripts to Lens Studio workspace...`);

for (const file of files) {
    const srcPath = path.join(sourceDir, file);
    const destPath = path.join(targetDir, file);
    fs.copyFileSync(srcPath, destPath);
    console.log(`  ✓ Synced: ${file} -> lenslist_clad_spatial_org/Assets/scripts/${file}`);
}

console.log("[Script Sync] Real-time WebDAV synchronization completed successfully! 🚀");
