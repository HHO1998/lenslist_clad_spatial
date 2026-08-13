import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const sceneFilePath = path.resolve(__dirname, "../lenslist_clad_spatial_org/Assets/Scene.scene");
const scriptsAssetsDir = path.resolve(__dirname, "../lenslist_clad_spatial_org/Assets/scripts");

describe("🏛️ Dimension 3: Lens Studio Scene & GUID Graph Integrity Audit", () => {
    it("should locate Scene.scene and Assets/scripts directory", () => {
        expect(fs.existsSync(sceneFilePath)).toBe(true);
        expect(fs.existsSync(scriptsAssetsDir)).toBe(true);
    });

    it("should have zero dangling ScriptAsset references in Scene.scene", () => {
        const metaFiles = fs.readdirSync(scriptsAssetsDir).filter((file) => file.endsWith(".ts.meta"));
        const scriptAssetGuids = new Set<string>();

        for (const metaFile of metaFiles) {
            const metaPath = path.join(scriptsAssetsDir, metaFile);
            const content = fs.readFileSync(metaPath, "utf-8");
            const match = content.match(/(?:PrimaryAsset|TypeScriptAsset):\s*!<reference>\s*([a-f0-9-]+)/i);
            if (match) {
                scriptAssetGuids.add(match[1].toLowerCase());
            }
        }

        const sceneContent = fs.readFileSync(sceneFilePath, "utf-8");
        const lines = sceneContent.split("\n");

        for (let i = 0; i < lines.length; i++) {
            const match = lines[i].match(/ScriptAsset:\s*!<reference>\s*([a-f0-9-]+)/i);
            if (match) {
                const referencedGuid = match[1].toLowerCase();
                expect(
                    scriptAssetGuids.has(referencedGuid),
                    `Dangling ScriptAsset reference found on line ${i + 1}: ${referencedGuid}`,
                ).toBe(true);
            }
        }
    });

    it("should have zero dangling SceneObject references in ScriptInputs", () => {
        const sceneContent = fs.readFileSync(sceneFilePath, "utf-8");
        const lines = sceneContent.split("\n");
        const sceneObjectIds = new Set<string>();

        for (const line of lines) {
            const match = line.match(/^-\s*!<SceneObject\/([a-f0-9-]+)>/i);
            if (match) {
                sceneObjectIds.add(match[1].toLowerCase());
            }
        }

        for (let i = 0; i < lines.length; i++) {
            const match = lines[i].match(/!<reference\.SceneObject>\s*([a-f0-9-]+)/i);
            if (match) {
                const refId = match[1].toLowerCase();
                if (refId !== "00000000-0000-0000-0000-000000000000") {
                    expect(
                        sceneObjectIds.has(refId),
                        `Dangling SceneObject reference found on line ${i + 1}: ${refId}`,
                    ).toBe(true);
                }
            }
        }
    });
});
