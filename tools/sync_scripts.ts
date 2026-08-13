import fs from "node:fs";
import path from "node:path";

const sourceDir = path.resolve(__dirname, "../scripts");
const targetDir = path.resolve(__dirname, "../lenslist_clad_spatial_org/Assets/scripts");

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

function syncSingleFile(file: string) {
    const srcPath = path.join(sourceDir, file);
    const destPath = path.join(targetDir, file);

    if (!fs.existsSync(srcPath)) return;

    let content = fs.readFileSync(srcPath, "utf-8");
    // Strip any previous build sync tag
    content = content.replace(/\/\/\s*BuildSync:.*\n?/g, "").trimEnd();
    // Append fresh timestamp tag to force WebDAV file watcher trigger in Windows
    const now = new Date();
    content = `${content}\n\n// BuildSync: ${now.toISOString()}\n`;

    fs.writeFileSync(destPath, content, "utf-8");
    // Explicitly update mtime and atime for Windows DavWWWRoot filesystem
    fs.utimesSync(destPath, now, now);

    console.log(`  ✓ Synced & Force-Triggered Compilation: ${file} -> lenslist_clad_spatial_org/Assets/scripts/${file}`);
}

function syncAllFiles() {
    const files = fs.readdirSync(sourceDir).filter((file) => file.endsWith(".ts"));
    console.log(`[Script Sync] Synchronizing ${files.length} scripts to Lens Studio WebDAV workspace...`);

    for (const file of files) {
        syncSingleFile(file);
    }

    console.log("[Script Sync] Real-time WebDAV force-trigger completed successfully! 🚀");
}

syncAllFiles();

if (process.argv.includes("--watch")) {
    console.log(`[Script Sync Watcher] Watching ${sourceDir} for live changes...`);
    fs.watch(sourceDir, (eventType, filename) => {
        if (filename && filename.endsWith(".ts")) {
            console.log(`[Script Sync Watcher] Change detected in ${filename} (${eventType}). Syncing...`);
            syncSingleFile(filename);
        }
    });
}
