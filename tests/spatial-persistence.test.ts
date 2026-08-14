import "./setup";
import { describe, expect, it } from "vitest";
import type { TaskOrbStateData } from "../scripts/SpatialPersistenceManager";

class BaseScriptComponent {}

(globalThis as unknown as { BaseScriptComponent: typeof BaseScriptComponent }).BaseScriptComponent =
    BaseScriptComponent;
(globalThis as unknown as { input: () => (target: unknown, propertyKey: string) => void }).input = () => () => {};
(globalThis as unknown as { component: (target: unknown) => void }).component = () => {};
(globalThis as unknown as { print: (msg: string) => void }).print = () => {};

describe("💾 Dimension 8: Spatial Persistence Manager Tests", () => {
    it("should initialize cleanly", async () => {
        const { SpatialPersistenceManager } = await import("../scripts/SpatialPersistenceManager");
        const manager = new SpatialPersistenceManager();
        manager.onAwake();
        expect(manager.isInitialized).toBe(true);
        expect(manager.persistenceKey).toBe("SpatialMatrix_State_V1");
    });

    it("should serialize state payload correctly", async () => {
        const { SpatialPersistenceManager } = await import("../scripts/SpatialPersistenceManager");
        const manager = new SpatialPersistenceManager();
        manager.onAwake();

        const tasks: TaskOrbStateData[] = [
            { orbName: "Work Task", priorityMass: 2.0, isCompleted: false, position: [0, 1.5, 1.2] },
            { orbName: "Email", priorityMass: 1.0, isCompleted: true, position: [0.5, 1.2, 1.0] },
        ];

        const jsonString = manager.serializeState("Work Matrix", 25, tasks);
        expect(jsonString).toContain("Work Matrix");
        expect(jsonString).toContain("Work Task");
        expect(jsonString).toContain("Email");
    });

    it("should save and load state cleanly in memory store", async () => {
        const { SpatialPersistenceManager } = await import("../scripts/SpatialPersistenceManager");
        const manager = new SpatialPersistenceManager();
        manager.onAwake();

        const tasks: TaskOrbStateData[] = [
            { orbName: "Design Task", priorityMass: 1.5, isCompleted: false, position: [-0.5, 1.4, 1.1] },
        ];

        const saved = manager.saveState("Design Matrix", 45, tasks);
        expect(saved).toBe(true);

        const loaded = manager.loadState();
        expect(loaded).not.toBeNull();
        expect(loaded?.clusterName).toBe("Design Matrix");
        expect(loaded?.focusDurationMinutes).toBe(45);
        expect(loaded?.tasks.length).toBe(1);
        expect(loaded?.tasks[0].orbName).toBe("Design Task");
    });

    it("should clear state cleanly", async () => {
        const { SpatialPersistenceManager } = await import("../scripts/SpatialPersistenceManager");
        const manager = new SpatialPersistenceManager();
        manager.onAwake();

        manager.saveState("Temp Matrix", 15, []);
        expect(manager.loadState()).not.toBeNull();

        manager.clearState();
        expect(manager.loadState()).toBeNull();
    });
});
