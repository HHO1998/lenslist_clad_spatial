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

    sub(other: MockVec3): MockVec3 {
        return new MockVec3(this.x - other.x, this.y - other.y, this.z - other.z);
    }

    static lerp(a: MockVec3, b: MockVec3, t: number): MockVec3 {
        return new MockVec3(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
    }
}

class MockTransform {
    private pos = new MockVec3(0, 1.4, 0.4);

    getWorldPosition(): MockVec3 {
        return this.pos;
    }

    setWorldPosition(p: MockVec3): void {
        this.pos = p;
    }
}

class BaseScriptComponent {}

(globalThis as unknown as { BaseScriptComponent: typeof BaseScriptComponent }).BaseScriptComponent =
    BaseScriptComponent;
(globalThis as unknown as { input: () => (target: unknown, propertyKey: string) => void }).input = () => () => {};
(globalThis as unknown as { component: (target: unknown) => void }).component = () => {};
(globalThis as unknown as { vec3: typeof MockVec3 }).vec3 = MockVec3;
(globalThis as unknown as { getDeltaTime: () => number }).getDeltaTime = () => 0.016;
(globalThis as unknown as { print: (msg: string) => void }).print = () => {};

describe("💍 Dimension 7: Volumetric Spatial Holographic Ring HUD Tests", () => {
    it("should toggle HUD visibility correctly", async () => {
        const { SpatialHolographicRingHUD } = await import("../scripts/SpatialHolographicRingHUD");
        const hud = new SpatialHolographicRingHUD();
        (hud as unknown as { getTransform: () => MockTransform }).getTransform = () => new MockTransform();
        hud.onAwake();

        expect(hud.isVisible).toBe(false);

        const isVis = hud.toggleVisibility();
        expect(isVis).toBe(true);
        expect(hud.isVisible).toBe(true);

        hud.toggleVisibility(false);
        expect(hud.isVisible).toBe(false);
    });

    it("should calculate task completion ratio and pending task count", async () => {
        const { SpatialHolographicRingHUD } = await import("../scripts/SpatialHolographicRingHUD");
        const hud = new SpatialHolographicRingHUD();

        const metricsHalf = hud.updateTaskCompletionMetrics(2, 4);
        expect(metricsHalf.completedRatio).toBe(0.5);
        expect(metricsHalf.pendingCount).toBe(2);

        const metricsFull = hud.updateTaskCompletionMetrics(4, 4);
        expect(metricsFull.completedRatio).toBe(1.0);
        expect(metricsFull.pendingCount).toBe(0);
    });

    it("should calculate radial holographic ring arc segments accurately", async () => {
        const { SpatialHolographicRingHUD } = await import("../scripts/SpatialHolographicRingHUD");
        const hud = new SpatialHolographicRingHUD();
        hud.ringRadiusMeters = 0.12;

        const arc0 = hud.calculateRingArcSegment(0, 4);
        expect(arc0.startAngleRad).toBe(0);
        expect(arc0.endAngleRad).toBeGreaterThan(0);
        expect(arc0.arcLength).toBeGreaterThan(0);

        const arc1 = hud.calculateRingArcSegment(1, 4);
        expect(arc1.startAngleRad).toBeCloseTo(Math.PI / 2, 4);
    });

    it("should run automated LEAF HUD assertions cleanly", async () => {
        const { SpatialHolographicRingHUD } = await import("../scripts/SpatialHolographicRingHUD");
        const hud = new SpatialHolographicRingHUD();
        expect(hud.runLeafHudAssertions()).toBe(true);
    });
});
