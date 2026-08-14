import "./setup";
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

    add(other: MockVec3): MockVec3 {
        return new MockVec3(this.x + other.x, this.y + other.y, this.z + other.z);
    }
}

class MockTransform {
    private pos = new MockVec3(0, 1.5, 0.5);

    getWorldPosition(): MockVec3 {
        return this.pos;
    }

    setWorldPosition(p: MockVec3): void {
        this.pos = p;
    }
}

class BaseScriptComponent {
    createEvent() {
        return { bind: () => {} };
    }
}

(globalThis as unknown as { BaseScriptComponent: typeof BaseScriptComponent }).BaseScriptComponent =
    BaseScriptComponent;
(globalThis as unknown as { input: () => (target: unknown, propertyKey: string) => void }).input = () => () => {};
(globalThis as unknown as { component: (target: unknown) => void }).component = () => {};
(globalThis as unknown as { vec3: typeof MockVec3 }).vec3 = MockVec3;
(globalThis as unknown as { getDeltaTime: () => number }).getDeltaTime = () => 0.016;
(globalThis as unknown as { print: (msg: string) => void }).print = () => {};

describe("📡 Dimension 8: Volumetric Spatial Quantum Beacon Tests", () => {
    it("should toggle beacon active state correctly", async () => {
        const { SpatialQuantumBeacon } = await import("../scripts/SpatialQuantumBeacon");
        const beacon = new SpatialQuantumBeacon();
        (beacon as unknown as { getTransform: () => MockTransform }).getTransform = () => new MockTransform();

        expect(beacon.isBeaconActive).toBe(true);
        expect(beacon.setBeaconActive(false)).toBe(false);
        expect(beacon.isBeaconActive).toBe(false);
    });

    it("should calculate valid pulse metrics within bounds", async () => {
        const { SpatialQuantumBeacon } = await import("../scripts/SpatialQuantumBeacon");
        const beacon = new SpatialQuantumBeacon();
        const metrics = beacon.getBeaconPulseMetrics();

        expect(metrics.scaleFactor).toBeGreaterThanOrEqual(1.0);
        expect(metrics.scaleFactor).toBeLessThanOrEqual(1.2);
        expect(metrics.glowIntensity).toBeGreaterThanOrEqual(0.5);
        expect(metrics.glowIntensity).toBeLessThanOrEqual(1.0);
    });

    it("should run LEAF automated beacon assertions cleanly", async () => {
        const { SpatialQuantumBeacon } = await import("../scripts/SpatialQuantumBeacon");
        const beacon = new SpatialQuantumBeacon();
        expect(beacon.runLeafBeaconAssertions()).toBe(true);
    });
});
