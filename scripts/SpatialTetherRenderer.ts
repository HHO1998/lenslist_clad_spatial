/**
 * 🌌 SpatialTetherRenderer.ts — Volumetric Laser-Tether Energy Renderer for Snap Spectacles
 *
 * Part of Lenslist CLAD Summer Hackathon 2026 (Snap Spectacles)
 * Theme: ORGANIZE (Week 1)
 *
 * CREATIVE MANDATE: Renders hyper-futuristic elastic laser-tethers that stretch,
 * vibrate, and bend between the Spectacles hand pinch ray and target Kinetic Task Orbs.
 */

@component
export class SpatialTetherRenderer extends BaseScriptComponent {
    @input
    tetherName = "Elastic Laser Tether";

    @input
    parentOrb: SceneObject;

    @input
    targetOrb: SceneObject;

    @input
    maxTetherLength = 5.0;

    @input
    springStiffness = 1.2;

    @input
    beamWidth = 0.02;

    @input
    isTetherActive = true;

    private transform: Transform;
    private currentTension = 0.0;

    onAwake() {
        this.transform = this.getTransform();
        this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
        print(`[SpatialTetherRenderer] Tether '${this.tetherName}' initialized`);
    }

    onUpdate() {
        if (!this.isTetherActive) return;

        // Auto-orient tether beam between parentOrb and targetOrb if assigned
        if (this.parentOrb && this.targetOrb) {
            const posA = this.parentOrb.getTransform().getWorldPosition();
            const posB = this.targetOrb.getTransform().getWorldPosition();
            this.updateBeamTransform(posA, posB);
        }

        // Animate subtle elastic vibration when active
        const time = getTime();
        this.currentTension = Math.sin(time * 12.0) * 0.02 * this.springStiffness;
    }

    /**
     * Stretches and aligns the tether beam object between two 3D world coordinates
     */
    public updateBeamTransform(posA: vec3, posB: vec3) {
        const delta = posB.sub(posA);
        const lenVal = (delta as unknown as { length: unknown }).length;
        const distance =
            typeof lenVal === "function" ? (delta as unknown as { length: () => number }).length() : (lenVal as number);

        if (distance < 0.001) return;

        // Set midpoint position
        const midPoint = posA.add(posB).uniformScale(0.5);
        this.transform.setWorldPosition(midPoint);

        // Align Z-axis along beam direction
        const dir = delta.normalize();
        const lookRot = quat.lookAt(dir, vec3.up());
        this.transform.setWorldRotation(lookRot);

        // Scale beam length along Z-axis
        this.transform.setWorldScale(new vec3(this.beamWidth, this.beamWidth, distance));
    }

    /**
     * Calculates spatial direction vector between hand ray and target task orb
     */
    public computeTetherVector(originPos: vec3, targetPos: vec3): { direction: vec3; distance: number } {
        const delta = targetPos.sub(originPos);
        const lenVal = (delta as unknown as { length: unknown }).length;
        const distance =
            typeof lenVal === "function" ? (delta as unknown as { length: () => number }).length() : (lenVal as number);
        const direction = distance > 0 ? delta.normalize() : vec3.zero();

        return { direction, distance };
    }

    /**
     * Computes elastic tension force for hand spring physics
     */
    public calculateElasticTension(distance: number, orbMass: number): number {
        const clampedDistance = Math.min(distance, this.maxTetherLength);
        const stretchRatio = clampedDistance / this.maxTetherLength;

        return stretchRatio * this.springStiffness * orbMass;
    }

    /**
     * Activates energy beam tether rendering between two world coordinates
     */
    public activateTether(originPos: vec3, targetPos: vec3) {
        this.isTetherActive = true;
        const { distance } = this.computeTetherVector(originPos, targetPos);
        this.updateBeamTransform(originPos, targetPos);

        print(
            `[SpatialTetherRenderer] Laser tether ACTIVE (${distance.toFixed(2)}m distance, tension: ${this.currentTension.toFixed(3)})`,
        );
    }

    /**
     * Computes dynamic tether energy beam color transitioning from Cyan (#00F0FF) to Magenta (#FF0077) under stretch tension
     */
    public computeTetherColor(distance: number): { hexColor: string; isOverstretched: boolean } {
        const stretchRatio = Math.min(1.0, distance / this.maxTetherLength);
        const isOverstretched = stretchRatio >= 0.85;

        // Transition from Cyan (#00F0FF) to Luminous Magenta (#FF0077)
        const hexColor = isOverstretched ? "#FF0055" : stretchRatio > 0.5 ? "#B000FF" : "#00F0FF";

        return { hexColor, isOverstretched };
    }

    /**
     * Deactivates energy beam tether
     */
    public deactivateTether() {
        this.isTetherActive = false;
        this.currentTension = 0.0;
        print("[SpatialTetherRenderer] Laser tether DEACTIVATED.");
    }
}
