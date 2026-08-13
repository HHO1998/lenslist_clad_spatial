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
    maxTetherLength = 2.5;

    @input
    springStiffness = 1.2;

    @input
    isTetherActive = false;

    private transform: Transform;
    private currentTension = 0.0;

    onAwake() {
        this.transform = this.getTransform();
        this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
        print(`[SpatialTetherRenderer] Tether '${this.tetherName}' initialized`);
    }

    onUpdate() {
        if (!this.isTetherActive) return;

        // Animate subtle elastic vibration when active
        const time = getTime();
        this.currentTension = Math.sin(time * 12.0) * 0.02 * this.springStiffness;
    }

    /**
     * Calculates spatial direction vector between hand ray and target task orb
     */
    public computeTetherVector(originPos: vec3, targetPos: vec3): { direction: vec3; distance: number } {
        const delta = targetPos.sub(originPos);
        const distance = delta.length();
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

        print(
            `[SpatialTetherRenderer] Laser tether ACTIVE (${distance.toFixed(2)}m distance, tension: ${this.currentTension.toFixed(3)})`,
        );
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
