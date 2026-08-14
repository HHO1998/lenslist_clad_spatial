/**
 * 🌌 Lens Studio 5.x Custom Project Component Type Declarations
 *
 * Ambient declarations for custom project components inside Lens Studio.
 * Standard engine types (vec3, quat, Transform, SceneObject, BaseScriptComponent, etc.)
 * are automatically provided by Lens Studio's built-in LensifyTS library declarations.
 */

declare class KineticTaskOrb extends BaseScriptComponent {
    taskTitle: string;
    isCompleted: boolean;
    priorityWeight: number;
    markComplete(): boolean;
    runOrbAssertions(): boolean;
}

declare class SpatialAdaptivePhysicsEngine extends BaseScriptComponent {
    registerNode(id: string, initialPosition: vec3): void;
    updatePhysics(dt: number): void;
    runLeafPhysicsAssertions(): boolean;
}

declare class SpatialAudioController extends BaseScriptComponent {
    playTetherLaserSound(): void;
    playTaskCompletionSound(): void;
    runLeafAudioAssertions(): boolean;
}

declare class SpatialBurstFX extends BaseScriptComponent {
    triggerBurst(originPos: vec3): number;
    runLeafBurstAssertions(): boolean;
}

declare class SpatialCategoryClusterSwitcher extends BaseScriptComponent {
    switcherName: string;
    activeCategory: string;
    switchCategory(targetCategory: string): { previousCategory: string; newCategory: string; success: boolean };
    cycleNextCategory(): string;
    runLeafCategoryAssertions(): boolean;
    getActiveCategory(): string;
}

declare class SpatialHolographicRingHUD extends BaseScriptComponent {
    setCategory(category: string): void;
    pulseHUD(): void;
    runLeafHUDAssertions(): boolean;
}

declare class SpatialMatrixManager extends BaseScriptComponent {
    clusterCategoryName: string;
    runLeafTestSuite(): boolean;
    rebalanceOrbs(): void;
}

declare class SpatialPersistenceManager extends BaseScriptComponent {
    saveTaskState(taskId: string, completed: boolean): void;
    loadTaskState(taskId: string): boolean;
    runLeafPersistenceAssertions(): boolean;
}

declare class SpatialPriorityColorAura extends BaseScriptComponent {
    setPriorityLevel(level: number): vec3;
    runLeafPriorityAssertions(): boolean;
}

declare class SpatialQuantumBeacon extends BaseScriptComponent {
    activateBeacon(): void;
    deactivateBeacon(): void;
    runLeafBeaconAssertions(): boolean;
}

declare class SpatialRoomOcclusion extends BaseScriptComponent {
    isPointOccluded(point: vec3): boolean;
    runLeafOcclusionAssertions(): boolean;
}

declare class SpatialTaskSpawner extends BaseScriptComponent {
    spawnerName: string;
    spawnSatelliteTaskOrb(
        orbName: string,
        priorityMass?: number,
        initialPos?: vec3,
    ): { orbId: string; orbName: string; mass: number; position: vec3 };
    shatterParentOrb(
        parentName: string,
        parentPos: vec3,
    ): { shatteredOrbsCount: number; burstParticlesTriggered: number };
    runLeafSpawnerAssertions(): boolean;
    getSpawnedCount(): number;
}

declare class SpatialTetherRenderer extends BaseScriptComponent {
    connectNodes(startPos: vec3, endPos: vec3): void;
    runLeafTetherAssertions(): boolean;
}

declare class SpatialVoiceGestureController extends BaseScriptComponent {
    parseVoiceCommand(phrase: string): string;
    triggerGestureAction(gestureName: string): void;
    runLeafVoiceAssertions(): boolean;
}

declare class SpatialWarpTimer extends BaseScriptComponent {
    triggerPulseFeedback(): void;
    runLeafWarpAssertions(): boolean;
}

// BuildSync: 2026-08-14T04:04:23.940Z
