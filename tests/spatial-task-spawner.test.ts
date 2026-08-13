import { beforeEach, describe, expect, it } from "vitest";
import { SpatialTaskSpawner } from "../scripts/SpatialTaskSpawner";

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

describe("🌌 SpatialTaskSpawner Component Tests", () => {
    let spawner: SpatialTaskSpawner;

    beforeEach(() => {
        spawner = new SpatialTaskSpawner();
    });

    it("should initialize clean spawner instance", () => {
        expect(spawner).toBeDefined();
        expect(spawner.spawnerName).toContain("Task Spawner");
        expect(spawner.getSpawnedCount()).toBe(0);
    });

    it("should dynamically spawn satellite task orb parameters", () => {
        const testPos = new MockVec3(0, 1.5, 1.0) as unknown as vec3;
        const orb = spawner.spawnSatelliteTaskOrb("New Sub Task", 2.0, testPos);
        expect(orb.orbId).toBe("dynamic_orb_1");
        expect(orb.orbName).toBe("New Sub Task");
        expect(orb.mass).toBe(2.0);
        expect(spawner.getSpawnedCount()).toBe(1);
    });

    it("should shatter parent orb into 3 sub-tasks", () => {
        const testPos = new MockVec3(0, 1.5, 1.0) as unknown as vec3;
        const result = spawner.shatterParentOrb("Parent Mission", testPos);
        expect(result.shatteredOrbsCount).toBe(3);
        expect(spawner.getSpawnedCount()).toBe(3);
    });

    it("should pass LEAF automated assertion suite", () => {
        const result = spawner.runLeafSpawnerAssertions();
        expect(result).toBe(true);
    });
});
