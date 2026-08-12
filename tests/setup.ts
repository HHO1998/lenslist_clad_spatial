/**
 * 🌌 tests/setup.ts — Global Ambient Mocks for Vitest Runtime
 */

class MockTransform {
    private pos = { x: 0, y: 0, z: -1.5 };
    private scale = { x: 1, y: 1, z: 1 };

    getWorldPosition() {
        return this.pos;
    }
    setWorldPosition(p: { x: number; y: number; z: number }) {
        this.pos = p;
    }
    getLocalScale() {
        return this.scale;
    }
    setLocalScale(s: { x: number; y: number; z: number }) {
        this.scale = s;
    }
    getLocalRotation() {
        return {
            toEulerAngles: () => ({ x: 0, y: 0, z: 0 }),
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
g.BaseScriptComponent = MockBaseScriptComponent;
g.component = () => {};
g.input = () => {};
g.getTime = () => Date.now() / 1000;
g.getDeltaTime = () => 0.016;
g.print = (...args: unknown[]) => console.log(...args);
