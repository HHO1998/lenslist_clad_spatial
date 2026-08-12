import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("🌌 Dimension 5: GLSL Shader Syntax & Uniform Validator", () => {
    const shadersDir = path.resolve(__dirname, "../assets/shaders");

    it("should validate FresnelEnergyShader.glsl structure and uniforms", () => {
        const shaderPath = path.join(shadersDir, "FresnelEnergyShader.glsl");
        expect(fs.existsSync(shaderPath)).toBe(true);

        const content = fs.readFileSync(shaderPath, "utf-8");

        // Verify Shader Stage Directives
        expect(content).toContain("#ifdef VERTEX_SHADER");
        expect(content).toContain("#ifdef FRAGMENT_SHADER");

        // Verify Vertex Attributes
        expect(content).toContain("attribute vec3 position");
        expect(content).toContain("attribute vec3 normal");

        // Verify Fragment Uniforms
        expect(content).toContain("uniform vec3 baseColor");
        expect(content).toContain("uniform vec3 rimColor");
        expect(content).toContain("uniform float fresnelPower");
        expect(content).toContain("uniform float time");

        // Verify Main Entry Points
        expect(content).toContain("void main()");
        expect(content).toContain("gl_FragColor");
    });

    it("should validate SpatialShockwaveShader.glsl structure and uniforms", () => {
        const shaderPath = path.join(shadersDir, "SpatialShockwaveShader.glsl");
        expect(fs.existsSync(shaderPath)).toBe(true);

        const content = fs.readFileSync(shaderPath, "utf-8");

        expect(content).toContain("#ifdef VERTEX_SHADER");
        expect(content).toContain("#ifdef FRAGMENT_SHADER");

        expect(content).toContain("uniform float expansionProgress");
        expect(content).toContain("uniform vec3 shockwaveColor");

        expect(content).toContain("void main()");
        expect(content).toContain("gl_FragColor");
    });

    it("should validate SpatialTetherShader.glsl structure and uniforms", () => {
        const shaderPath = path.join(shadersDir, "SpatialTetherShader.glsl");
        expect(fs.existsSync(shaderPath)).toBe(true);

        const content = fs.readFileSync(shaderPath, "utf-8");

        expect(content).toContain("#ifdef VERTEX_SHADER");
        expect(content).toContain("#ifdef FRAGMENT_SHADER");

        expect(content).toContain("uniform vec3 tetherColor");
        expect(content).toContain("uniform vec3 coreGlowColor");
        expect(content).toContain("uniform float beamThickness");
        expect(content).toContain("uniform float pulseSpeed");

        expect(content).toContain("void main()");
        expect(content).toContain("gl_FragColor");
    });
});
