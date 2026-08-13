import fs from "node:fs";
import path from "node:path";

const sceneFilePath = path.resolve(__dirname, "../lenslist_clad_spatial_org/Assets/Scene.scene");
const scriptsAssetsDir = path.resolve(__dirname, "../lenslist_clad_spatial_org/Assets/scripts");

interface SceneValidationResult {
    totalSceneObjects: number;
    totalScriptComponents: number;
    totalScriptAssetsFound: number;
    scriptAssetGuidMap: Map<string, string>; // GUID -> script filename
    sceneObjectIds: Set<string>;
    errors: string[];
    warnings: string[];
}

function validateSceneIntegrity(): SceneValidationResult {
    const result: SceneValidationResult = {
        totalSceneObjects: 0,
        totalScriptComponents: 0,
        totalScriptAssetsFound: 0,
        scriptAssetGuidMap: new Map(),
        sceneObjectIds: new Set(),
        errors: [],
        warnings: [],
    };

    console.log("🔍 [Scene Validator] Initiating 101% Multi-Dimensional Lens Studio Scene Audit...");

    if (!fs.existsSync(sceneFilePath)) {
        result.errors.push(`Scene file not found at path: ${sceneFilePath}`);
        return result;
    }

    // 1. Parse Script Asset Meta GUIDs
    if (fs.existsSync(scriptsAssetsDir)) {
        const metaFiles = fs.readdirSync(scriptsAssetsDir).filter((file) => file.endsWith(".ts.meta"));
        for (const metaFile of metaFiles) {
            const metaPath = path.join(scriptsAssetsDir, metaFile);
            const content = fs.readFileSync(metaPath, "utf-8");
            
            // Extract PrimaryAsset GUID or ImportedAssetIds TypeScriptAsset GUID
            const primaryAssetMatch = content.match(/PrimaryAsset:\s*!<reference>\s*([a-f0-9-]+)/i);
            const importedAssetMatch = content.match(/TypeScriptAsset:\s*!<reference>\s*([a-f0-9-]+)/i);
            const scriptName = metaFile.replace(/\.meta$/, "");

            const guid = primaryAssetMatch ? primaryAssetMatch[1] : importedAssetMatch ? importedAssetMatch[1] : null;

            if (guid) {
                result.scriptAssetGuidMap.set(guid.toLowerCase(), scriptName);
                result.totalScriptAssetsFound++;
            } else {
                result.warnings.push(`Could not resolve TypeScriptAsset GUID in meta file: ${metaFile}`);
            }
        }
    } else {
        result.errors.push(`Scripts assets directory not found: ${scriptsAssetsDir}`);
        return result;
    }

    // 2. Parse Scene.scene Content
    const sceneContent = fs.readFileSync(sceneFilePath, "utf-8");
    const lines = sceneContent.split("\n");

    // Extract all SceneObject UUIDs
    for (const line of lines) {
        const sceneObjectMatch = line.match(/^-\s*!<SceneObject\/([a-f0-9-]+)>/i);
        if (sceneObjectMatch) {
            result.sceneObjectIds.add(sceneObjectMatch[1].toLowerCase());
            result.totalSceneObjects++;
        }
    }

    // Extract and Validate Script Components
    let currentScriptComponent: string | null = null;
    let currentScriptAssetGuid: string | null = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        const scriptComponentMatch = line.match(/^-\s*!<ScriptComponent\/([a-f0-9-]+)>/i);
        if (scriptComponentMatch) {
            currentScriptComponent = scriptComponentMatch[1];
            result.totalScriptComponents++;
            currentScriptAssetGuid = null;
            continue;
        }

        if (currentScriptComponent) {
            const scriptAssetMatch = line.match(/^\s*ScriptAsset:\s*!<reference>\s*([a-f0-9-]+)/i);
            if (scriptAssetMatch) {
                currentScriptAssetGuid = scriptAssetMatch[1].toLowerCase();
                if (!result.scriptAssetGuidMap.has(currentScriptAssetGuid)) {
                    result.errors.push(
                        `ScriptComponent [${currentScriptComponent}] references unknown ScriptAsset GUID: ${currentScriptAssetGuid}`
                    );
                }
            }

            // Check for SceneObject references inside ScriptInputs
            const sceneObjectRefMatch = line.match(/!<reference\.SceneObject>\s*([a-f0-9-]+)/i);
            if (sceneObjectRefMatch) {
                const referencedId = sceneObjectRefMatch[1].toLowerCase();
                // Check if referenced ID is valid and non-zero
                if (referencedId !== "00000000-0000-0000-0000-000000000000" && !result.sceneObjectIds.has(referencedId)) {
                    result.errors.push(
                        `ScriptComponent [${currentScriptComponent}] has dangling SceneObject reference: ${referencedId}`
                    );
                }
            }
        }
    }

    return result;
}

const validation = validateSceneIntegrity();

console.log("\n📊 [Scene Audit Summary]");
console.log(`  • Total SceneObjects: ${validation.totalSceneObjects}`);
console.log(`  • Total ScriptComponents: ${validation.totalScriptComponents}`);
console.log(`  • Registered Script Assets: ${validation.totalScriptAssetsFound}`);

if (validation.warnings.length > 0) {
    console.warn("\n⚠️ Warnings:");
    for (const w of validation.warnings) {
        console.warn(`  - ${w}`);
    }
}

if (validation.errors.length > 0) {
    console.error("\n❌ Scene Validation FAILED with errors:");
    for (const err of validation.errors) {
        console.error(`  - ${err}`);
    }
    process.exit(1);
} else {
    console.log("\n✅ 101% Scene & GUID Graph Integrity Validation PASSED CLEANLY! 🚀\n");
    process.exit(0);
}
