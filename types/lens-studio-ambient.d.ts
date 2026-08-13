/**
 * 🌌 Lens Studio 5.x Ambient Type Definitions
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
    sub(other: vec3): vec3;
    add(other: vec3): vec3;
    scale(factor: number): vec3;
    uniformScale(factor: number): vec3;
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
    toEulerAngles(): vec3;
}

declare class Transform {
    getWorldPosition(): vec3;
    setWorldPosition(position: vec3): void;
    getLocalPosition(): vec3;
    setLocalPosition(position: vec3): void;
    getLocalScale(): vec3;
    setLocalScale(scale: vec3): void;
    getLocalRotation(): quat;
    setLocalRotation(rotation: quat): void;
}

declare class AudioComponent {
    play(loops: number): void;
    stop(): void;
    getSceneObject(): SceneObject;
}

declare class SceneObject {
    name: string;
    getTransform(): Transform;
    getComponent(componentType: string): unknown;
    destroy(): void;
}

declare class BaseScriptComponent {
    getTransform(): Transform;
    getSceneObject(): SceneObject;
    createEvent(eventType: string): {
        bind(callback: (data?: unknown) => void): void;
    };
}

declare function component(target: unknown): void;
declare function input(target: unknown, propertyKey: string): void;
