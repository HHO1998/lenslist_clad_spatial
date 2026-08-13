import { describe, expect, it } from "vitest";

// Mock ambient Lens Studio classes & functions for headless execution
class MockVec3 {
    x: number;
    y: number;
    z: number;

    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    distance(other: MockVec3): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dz = this.z - other.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    add(other: MockVec3): MockVec3 {
        return new MockVec3(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    sub(other: MockVec3): MockVec3 {
        return new MockVec3(this.x - other.x, this.y - other.y, this.z - other.z);
    }

    scale(factor: number): MockVec3 {
        return new MockVec3(this.x * factor, this.y * factor, this.z * factor);
    }

    uniformScale(factor: number): MockVec3 {
        return this.scale(factor);
    }

    normalize(): MockVec3 {
        const len = this.length;
        return len > 0 ? new MockVec3(this.x / len, this.y / len, this.z / len) : new MockVec3();
    }
}

class BaseScriptComponent {}

(globalThis as unknown as { BaseScriptComponent: typeof BaseScriptComponent }).BaseScriptComponent =
    BaseScriptComponent;
(globalThis as unknown as { input: () => (target: unknown, propertyKey: string) => void }).input = () => () => {};
(globalThis as unknown as { allowUndefined: () => void }).allowUndefined = () => {};
(globalThis as unknown as { component: (target: unknown) => void }).component = () => {};
(globalThis as unknown as { vec3: typeof MockVec3 }).vec3 = MockVec3;
(globalThis as unknown as { getDeltaTime: () => number }).getDeltaTime = () => 0.016;
(globalThis as unknown as { print: (msg: string) => void }).print = () => {};

describe("💥 Dimension 8 & 9: Volumetric Particle Shockwave FX & Magnetic Repulsion Physics Tests", () => {
    it("should generate radial particle velocity vectors on shockwave burst", async () => {
        const { SpatialBurstFX } = await import("../scripts/SpatialBurstFX");
        const burst = new SpatialBurstFX();
        burst.onAwake();

        const count = burst.triggerBurst(new MockVec3(0, 1.5, 1.0));
        expect(count).toBe(16);

        const states = burst.getActiveParticleStates();
        expect(states.length).toBe(16);
        expect(states[0].alpha).toBe(1.0);
        expect(states[0].scale).toBeGreaterThan(0);
    });

    it("should run LEAF volumetric burst assertions cleanly", async () => {
        const { SpatialBurstFX } = await import("../scripts/SpatialBurstFX");
        const burst = new SpatialBurstFX();
        expect(burst.runLeafBurstAssertions()).toBe(true);
    });

    it("should calculate inverse-square magnetic repulsion forces between spatial nodes", async () => {
        const { SpatialAdaptivePhysicsEngine } = await import("../scripts/SpatialAdaptivePhysicsEngine");
        const physics = new SpatialAdaptivePhysicsEngine();
        physics.onAwake();

        const posA = new MockVec3(0, 1.5, 1.0);
        const posB = new MockVec3(0.05, 1.5, 1.0); // Close distance 0.05m < 0.25m limit

        const force = physics.calculateRepulsionForce(posA, posB);
        expect(force.length).toBeGreaterThan(0);

        physics.registerNode("nodeA", posA);
        physics.registerNode("nodeB", posB);

        const updatedPositions = physics.computePhysicsStep(0.016);
        const nodeAPos = updatedPositions.get("nodeA");
        const nodeBPos = updatedPositions.get("nodeB");
        expect(nodeAPos).toBeDefined();
        expect(nodeBPos).toBeDefined();
        if (nodeAPos && nodeBPos) {
            const newDist = nodeAPos.distance(nodeBPos);
            expect(newDist).toBeGreaterThan(0.05); // Repelled apart
        }
    });

    it("should run LEAF magnetic repulsion physics assertions cleanly", async () => {
        const { SpatialAdaptivePhysicsEngine } = await import("../scripts/SpatialAdaptivePhysicsEngine");
        const physics = new SpatialAdaptivePhysicsEngine();
        expect(physics.runLeafPhysicsAssertions()).toBe(true);
    });

    it("should compute tether dynamic stretch color transitions in SpatialTetherRenderer", async () => {
        const { SpatialTetherRenderer } = await import("../scripts/SpatialTetherRenderer");
        const tether = new SpatialTetherRenderer();
        tether.maxTetherLength = 2.5;

        const relaxed = tether.computeTetherColor(0.5);
        expect(relaxed.hexColor).toBe("#00F0FF");
        expect(relaxed.isOverstretched).toBe(false);

        const overstretched = tether.computeTetherColor(2.4);
        expect(overstretched.hexColor).toBe("#FF0055");
        expect(overstretched.isOverstretched).toBe(true);
    });
});
