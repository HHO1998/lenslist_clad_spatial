/**
 * 🌌 tests/setup.ts — Global Ambient Mocks for Vitest Runtime
 */

class MockVec3 {
    x: number;
    y: number;
    z: number;

    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static zero(): MockVec3 {
        return new MockVec3(0, 0, 0);
    }

    static one(): MockVec3 {
        return new MockVec3(1, 1, 1);
    }

    static up(): MockVec3 {
        return new MockVec3(0, 1, 0);
    }

    sub(other: MockVec3): MockVec3 {
        return new MockVec3(this.x - other.x, this.y - other.y, this.z - other.z);
    }

    add(other: MockVec3): MockVec3 {
        return new MockVec3(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    normalize(): MockVec3 {
        const len = this.length();
        return len > 0 ? new MockVec3(this.x / len, this.y / len, this.z / len) : new MockVec3();
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    distance(other: MockVec3): number {
        return this.sub(other).length();
    }
}

class MockTransform {
    private pos = new MockVec3(0, 0, -1.5);
    private scale = new MockVec3(1, 1, 1);

    getWorldPosition() {
        return this.pos;
    }
    setWorldPosition(p: MockVec3) {
        this.pos = p;
    }
    getLocalScale() {
        return this.scale;
    }
    setLocalScale(s: MockVec3) {
        this.scale = s;
    }
    getLocalRotation() {
        return {
            toEulerAngles: () => new MockVec3(0, 0, 0),
        };
    }
    setLocalRotation() {}
}

class MockSceneObject {
    name = "MockSceneObject";
    private transform = new MockTransform();

    getTransform() {
        return this.transform;
    }
}

class MockBaseScriptComponent {
    private sceneObject = new MockSceneObject();

    getTransform() {
        return this.sceneObject.getTransform();
    }
    getSceneObject() {
        return this.sceneObject;
    }
    createEvent() {
        return {
            bind: (cb: (data?: unknown) => void) => cb(),
        };
    }
    onAwake() {}
    onUpdate() {}
}

const g = globalThis as unknown as Record<string, unknown>;
g.vec3 = MockVec3;
g.BaseScriptComponent = MockBaseScriptComponent;
g.ScriptComponent = MockBaseScriptComponent;
g.Component = {
    ScriptComponent: MockBaseScriptComponent,
};
g.component = () => {};
g.input = () => {};
g.allowUndefined = () => {};
g.getTime = () => Date.now() / 1000;
g.getDeltaTime = () => 0.016;
g.print = (...args: unknown[]) => console.log(...args);
