/**
 * 🌌 lens-studio-ambient.d.ts — Headless Ambient Mock Types for Snap Lens Studio 5.23.1
 * Global ambient declarations for spatial vector math, BaseScriptComponent, decorators, and engine methods.
 */

declare class vec3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    length(): number;
    distance(v: vec3): number;
    add(v: vec3): vec3;
    sub(v: vec3): vec3;
    scale(s: number): vec3;
    uniformScale(s: number): vec3;
    normalize(): vec3;
    static zero(): vec3;
    static one(): vec3;
}

declare class vec4 {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(x?: number, y?: number, z?: number, w?: number);
}

declare class quat {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(x?: number, y?: number, z?: number, w?: number);
    toEulerAngles(): vec3;
    static identity(): quat;
    static fromEulerVec(v: vec3): quat;
}

declare class Transform {
    getWorldPosition(): vec3;
    setWorldPosition(pos: vec3): void;
    getLocalPosition(): vec3;
    setLocalPosition(pos: vec3): void;
    getWorldScale(): vec3;
    setWorldScale(scale: vec3): void;
    getLocalScale(): vec3;
    setLocalScale(scale: vec3): void;
    getLocalRotation(): quat;
    setLocalRotation(rot: quat): void;
}

declare class SceneObject {
    name: string;
    getTransform(): Transform;
    createComponent(type: string): unknown;
    destroy(): void;
}

declare class AudioComponent {
    getSceneObject(): SceneObject;
    play(loops?: number): void;
}

declare class BaseScriptComponent {
    getTransform(): Transform;
    getSceneObject(): SceneObject;
    createEvent(eventType: string): {
        bind(callback: (eventData?: unknown) => void): void;
    };
    onAwake(): void;
    onUpdate(): void;
}

declare function component(target: unknown): void;
declare function input(target: unknown, propertyKey?: string): void;
declare function getTime(): number;
declare function getDeltaTime(): number;
declare function print(...args: unknown[]): void;
