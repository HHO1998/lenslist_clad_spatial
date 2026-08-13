import { describe, expect, it } from "vitest";

class MockVec3 {
    x: number;
    y: number;
    z: number;

    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class BaseScriptComponent {}

(globalThis as unknown as { BaseScriptComponent: typeof BaseScriptComponent }).BaseScriptComponent =
    BaseScriptComponent;
(globalThis as unknown as { input: () => (target: unknown, propertyKey: string) => void }).input = () => () => {};
(globalThis as unknown as { component: (target: unknown) => void }).component = () => {};
(globalThis as unknown as { vec3: typeof MockVec3 }).vec3 = MockVec3;
(globalThis as unknown as { print: (msg: string) => void }).print = () => {};

describe("🧱 Dimension 9: Physical Room Mesh Occlusion Engine Tests", () => {
    it("should initialize cleanly", async () => {
        const { SpatialRoomOcclusion } = await import("../scripts/SpatialRoomOcclusion");
        const occlusionEngine = new SpatialRoomOcclusion();
        occlusionEngine.onAwake();
        expect(occlusionEngine.isEngineActive).toBe(true);
        expect(occlusionEngine.enableDepthOcclusion).toBe(true);
    });

    it("should detect points beyond room bounds as occluded", async () => {
        const { SpatialRoomOcclusion } = await import("../scripts/SpatialRoomOcclusion");
        const occlusionEngine = new SpatialRoomOcclusion();
        occlusionEngine.onAwake();

        const cameraPos = new MockVec3(0, 1.6, 0);
        // Point close to camera (1.0m away) -> Not occluded
        const closePoint = new MockVec3(0, 1.6, 1.0);
        const closeResult = occlusionEngine.checkPointOcclusion(
            closePoint as unknown as vec3,
            cameraPos as unknown as vec3,
        );
        expect(closeResult.isOccluded).toBe(false);

        // Far point (3.0m away > 2.0m room surface threshold + 0.15m) -> Occluded
        const farPoint = new MockVec3(0, 1.6, 3.0);
        const farResult = occlusionEngine.checkPointOcclusion(
            farPoint as unknown as vec3,
            cameraPos as unknown as vec3,
        );
        expect(farResult.isOccluded).toBe(true);
    });

    it("should calculate translucent alpha ghosting when occluded", async () => {
        const { SpatialRoomOcclusion } = await import("../scripts/SpatialRoomOcclusion");
        const occlusionEngine = new SpatialRoomOcclusion();
        occlusionEngine.onAwake();

        const normalAlpha = occlusionEngine.computeOcclusionAlpha(false, 1.0);
        expect(normalAlpha).toBe(1.0);

        const occludedAlpha = occlusionEngine.computeOcclusionAlpha(true, 1.0);
        expect(occludedAlpha).toBe(0.25);
    });
});
