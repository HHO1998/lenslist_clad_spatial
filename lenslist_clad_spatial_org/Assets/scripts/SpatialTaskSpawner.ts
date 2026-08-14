/**
 * 🌌 SpatialTaskSpawner.ts — Volumetric Task Spawner & Parent Shatter Engine
 *
 * Part of Lenslist CLAD Summer Hackathon 2026 (Snap Spectacles)
 * Theme: ORGANIZE (Week 1 Upgrade)
 */

export interface SpatialAdaptivePhysicsEngineLike {
    registerNode: (id: string, initialPos: vec3) => void;
}

export interface SpatialBurstFXLike {
    triggerBurst: (pos: vec3) => number;
}

export interface SpatialMatrixManagerLike {
    clusterCategoryName: string;
}

@component
export class SpatialTaskSpawner extends BaseScriptComponent {
    @input
    spawnerName = "Volumetric Task Spawner & Shatter Engine";

    @allowUndefined
    @input
    matrixManager: SceneObject = null as unknown as SceneObject;

    @allowUndefined
    @input
    burstFX: SceneObject = null as unknown as SceneObject;

    @allowUndefined
    @input
    physicsEngine: SceneObject = null as unknown as SceneObject;

    @input
    defaultPriorityMass = 1.5;

    private spawnedOrbCount = 0;

    onAwake() {
        print(`[SpatialTaskSpawner] Initialized '${this.spawnerName}'`);
        this.createEvent("OnStartEvent").bind(this.onStart.bind(this));
    }

    onStart() {
        // Run automated LEAF assertions after all scene components are awake
        this.runLeafSpawnerAssertions();
    }

    /**
     * Dynamically creates satellite task orb parameters and metadata
     */
    public spawnSatelliteTaskOrb(
        orbName: string,
        priorityMass: number = this.defaultPriorityMass,
        initialPos: vec3 = new vec3(0, 1.5, 1.0),
    ): { orbId: string; orbName: string; mass: number; position: vec3 } {
        this.spawnedOrbCount++;
        const orbId = `dynamic_orb_${this.spawnedOrbCount}`;

        if (this.physicsEngine) {
            const physComp =
                (this.physicsEngine as unknown as { getComponent?: (name: string) => unknown }).getComponent?.(
                    "SpatialAdaptivePhysicsEngine",
                ) ||
                (this.physicsEngine as unknown as { getComponent?: (name: string) => unknown }).getComponent?.(
                    "ScriptComponent",
                ) ||
                this.physicsEngine;
            if (
                physComp &&
                typeof (physComp as unknown as SpatialAdaptivePhysicsEngineLike).registerNode === "function"
            ) {
                (physComp as unknown as SpatialAdaptivePhysicsEngineLike).registerNode(orbId, initialPos);
            }
        }

        print(
            `[SpatialTaskSpawner] Spawned new spatial task orb '${orbName}' (ID: ${orbId}, Mass: ${priorityMass}) at (${initialPos.x.toFixed(2)}, ${initialPos.y.toFixed(2)}, ${initialPos.z.toFixed(2)})`,
        );

        return {
            orbId,
            orbName,
            mass: priorityMass,
            position: initialPos,
        };
    }

    /**
     * Shatters a parent orb into 3 sub-task satellite nodes with spherical particle shockwaves
     */
    public shatterParentOrb(
        parentName: string,
        parentPos: vec3,
    ): { shatteredOrbsCount: number; burstParticlesTriggered: number } {
        print(`[SpatialTaskSpawner] SHATTERING parent orb '${parentName}' at origin...`);

        let burstParticlesTriggered = 0;
        if (this.burstFX) {
            const burstComp =
                (this.burstFX as unknown as { getComponent?: (name: string) => unknown }).getComponent?.(
                    "SpatialBurstFX",
                ) ||
                (this.burstFX as unknown as { getComponent?: (name: string) => unknown }).getComponent?.(
                    "ScriptComponent",
                ) ||
                this.burstFX;
            if (burstComp && typeof (burstComp as unknown as SpatialBurstFXLike).triggerBurst === "function") {
                burstParticlesTriggered = (burstComp as unknown as SpatialBurstFXLike).triggerBurst(parentPos);
            }
        }

        const subTaskNames = [`${parentName} - Sub A`, `${parentName} - Sub B`, `${parentName} - Sub C`];

        for (let i = 0; i < subTaskNames.length; i++) {
            const angle = i * ((Math.PI * 2) / subTaskNames.length);
            const offsetX = Math.cos(angle) * 0.25;
            const offsetZ = Math.sin(angle) * 0.25;
            const subPos = new vec3(parentPos.x + offsetX, parentPos.y + 0.05, parentPos.z + offsetZ);

            this.spawnSatelliteTaskOrb(subTaskNames[i], 1.0, subPos);
        }

        return {
            shatteredOrbsCount: subTaskNames.length,
            burstParticlesTriggered,
        };
    }

    /**
     * LEAF Automated assertion suite for Spawner & Shatter Engine
     */
    public runLeafSpawnerAssertions(): boolean {
        print("[LEAF Task Spawner] Running automated spawner & shatter assertions...");

        const orb = this.spawnSatelliteTaskOrb("Test Spawner Orb", 1.8, new vec3(0, 1.6, 1.2));
        if (!orb.orbId || orb.mass !== 1.8) {
            throw new Error("LEAF Spawner Assertion Failed: invalid spawned orb parameters");
        }

        const result = this.shatterParentOrb("Parent Test Orb", new vec3(0, 1.5, 1.0));
        if (result.shatteredOrbsCount !== 3) {
            throw new Error(
                `LEAF Spawner Assertion Failed: expected 3 shattered sub-orbs, got ${result.shatteredOrbsCount}`,
            );
        }

        print("[LEAF Task Spawner] ✅ ALL TASK SPAWNER ASSERTIONS PASSED!");
        return true;
    }

    public getSpawnedCount(): number {
        return this.spawnedOrbCount;
    }
}

// BuildSync: 2026-08-14T09:11:40.855Z
