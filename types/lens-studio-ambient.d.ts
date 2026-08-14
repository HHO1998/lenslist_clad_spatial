/**
 * 🌌 Lens Studio 5.x Ambient & Project Type Definitions
 * 
 * Synchronized ambient type declarations for root tsconfig and Lens Studio compilation.
 */

declare function print(message: string): void;
declare function getTime(): number;
declare function getDeltaTime(): number;

declare class vec3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    static zero(): vec3;
    static one(): vec3;
    static up(): vec3;
    static lerp(a: vec3, b: vec3, t: number): vec3;
    sub(other: vec3): vec3;
    add(other: vec3): vec3;
    scale(factor: number | vec3): vec3;
    uniformScale(factor: number | vec3): vec3;
    normalize(): vec3;
    distance(other: vec3): number;
    length: number;
}

declare class quat {
    x: number;
    y: number;
    z: number;
    w: number;
    static fromEulerVec(euler: vec3): quat;
    static lookAt(forward: vec3, up: vec3): quat;
    static fromRotationTo(from: vec3, to: vec3): quat;
    toEulerAngles(): vec3;
}

declare class Transform {
    getWorldPosition(): vec3;
    setWorldPosition(position: vec3): void;
    getWorldRotation(): quat;
    setWorldRotation(rotation: quat): void;
    getWorldScale(): vec3;
    setWorldScale(scale: vec3): void;
    getLocalPosition(): vec3;
    setLocalPosition(position: vec3): void;
    getLocalScale(): vec3;
    setLocalScale(scale: vec3): void;
    getLocalRotation(): quat;
    setLocalRotation(rotation: quat): void;
}

declare class AudioTrackAsset {}

declare class AudioComponent {
    audioTrack: AudioTrackAsset;
    volume: number;
    play(loops: number): void;
    stop(): void;
    getSceneObject(): SceneObject;
}

declare class SceneObject {
    name: string;
    getTransform(): Transform;
    getComponent(componentType: string): unknown;
    getParent(): SceneObject | null;
    getChildrenCount(): number;
    getChild(index: number): SceneObject;
    destroy(): void;
}

declare class BaseScriptComponent {
    getTransform(): Transform;
    getSceneObject(): SceneObject;
    createEvent(eventType: string): {
        bind(callback: (data?: unknown) => void): void;
    };
}

declare class ScriptComponent extends BaseScriptComponent {}

declare namespace Component {
    export class ScriptComponent extends BaseScriptComponent {}
}

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
    spawnSatelliteTaskOrb(orbName: string, priorityMass?: number, initialPos?: vec3): { orbId: string; orbName: string; mass: number; position: vec3 };
    shatterParentOrb(parentName: string, parentPos: vec3): { shatteredOrbsCount: number; burstParticlesTriggered: number };
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

declare function component(target: unknown): void;
declare function input(target: unknown, propertyKey: string): void;
declare function allowUndefined(target: unknown, propertyKey?: string): void;
