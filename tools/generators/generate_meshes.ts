/**
 * 🌌 generate_meshes.ts — Procedural 3D Wavefront OBJ Mesh Generator Suite
 * Generates volumetric 3D OBJ meshes for Snap Spectacles Lens Studio without external software dependencies.
 */

import fs from "node:fs";
import path from "node:path";

function generateSphereObj(radius: number, rings: number, sectors: number): string {
    const vertices: string[] = [];
    const uvs: string[] = [];
    const normals: string[] = [];
    const faces: string[] = [];

    const R = 1 / (rings - 1);
    const S = 1 / (sectors - 1);

    for (let r = 0; r < rings; r++) {
        for (let s = 0; s < sectors; s++) {
            const y = Math.sin(-Math.PI / 2 + Math.PI * r * R);
            const x = Math.cos(2 * Math.PI * s * S) * Math.sin(Math.PI * r * R);
            const z = Math.sin(2 * Math.PI * s * S) * Math.sin(Math.PI * r * R);

            vertices.push(`v ${(x * radius).toFixed(5)} ${(y * radius).toFixed(5)} ${(z * radius).toFixed(5)}`);
            uvs.push(`vt ${(s * S).toFixed(5)} ${(r * R).toFixed(5)}`);
            normals.push(`vn ${x.toFixed(5)} ${y.toFixed(5)} ${z.toFixed(5)}`);
        }
    }

    for (let r = 0; r < rings - 1; r++) {
        for (let s = 0; s < sectors - 1; s++) {
            const cur = r * sectors + s + 1;
            const next = r * sectors + (s + 1) + 1;
            const above = (r + 1) * sectors + s + 1;
            const aboveNext = (r + 1) * sectors + (s + 1) + 1;

            faces.push(`f ${cur}/${cur}/${cur} ${next}/${next}/${next} ${aboveNext}/${aboveNext}/${aboveNext}`);
            faces.push(`f ${cur}/${cur}/${cur} ${aboveNext}/${aboveNext}/${aboveNext} ${above}/${above}/${above}`);
        }
    }

    return `# Procedural Kinetic Task Orb 3D Mesh\n${vertices.join("\n")}\n${uvs.join("\n")}\n${normals.join("\n")}\n${faces.join("\n")}`;
}

function generateTorusObj(mainRadius: number, tubeRadius: number, mainSegments: number, tubeSegments: number): string {
    const vertices: string[] = [];
    const uvs: string[] = [];
    const faces: string[] = [];

    for (let i = 0; i <= mainSegments; i++) {
        const u = (i / mainSegments) * Math.PI * 2;
        for (let j = 0; j <= tubeSegments; j++) {
            const v = (j / tubeSegments) * Math.PI * 2;

            const x = (mainRadius + tubeRadius * Math.cos(v)) * Math.cos(u);
            const y = tubeRadius * Math.sin(v);
            const z = (mainRadius + tubeRadius * Math.cos(v)) * Math.sin(u);

            vertices.push(`v ${x.toFixed(5)} ${y.toFixed(5)} ${z.toFixed(5)}`);
            uvs.push(`vt ${(i / mainSegments).toFixed(5)} ${(j / tubeSegments).toFixed(5)}`);
        }
    }

    for (let i = 0; i < mainSegments; i++) {
        for (let j = 0; j < tubeSegments; j++) {
            const first = i * (tubeSegments + 1) + j + 1;
            const second = first + tubeSegments + 1;

            faces.push(`f ${first}/${first} ${second}/${second} ${first + 1}/${first + 1}`);
            faces.push(`f ${second}/${second} ${second + 1}/${second + 1} ${first + 1}/${first + 1}`);
        }
    }

    return `# Procedural Spatial Torus Focus Chronometer 3D Mesh\n${vertices.join("\n")}\n${uvs.join("\n")}\n${faces.join("\n")}`;
}

function main() {
    const modelsDir = path.resolve(__dirname, "../../assets/models");
    if (!fs.existsSync(modelsDir)) {
        fs.mkdirSync(modelsDir, { recursive: true });
    }

    // 1. KineticTaskOrbMesh.obj
    const orbPath = path.join(modelsDir, "KineticTaskOrbMesh.obj");
    fs.writeFileSync(orbPath, generateSphereObj(1.0, 24, 24));
    console.log(`[Mesh Generator] Generated ${orbPath}`);

    // 2. SpatialTorusMesh.obj
    const torusPath = path.join(modelsDir, "SpatialTorusMesh.obj");
    fs.writeFileSync(torusPath, generateTorusObj(0.5, 0.08, 24, 16));
    console.log(`[Mesh Generator] Generated ${torusPath}`);
}

main();
