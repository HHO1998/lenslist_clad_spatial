/**
 * 🌌 SpatialQuantumBeacon.ts — Volumetric Priority Beacon & Aura Indicator
 *
 * Part of Lenslist CLAD Spatial AR Project (Snap Spectacles Hackathon 2026)
 *
 * CREATIVE MANDATE: Renders a 3D pulsing holographic beacon aura above parent & sub-task orbs,
 * highlighting priority level, focus status, and task matrix health.
 */

export interface KineticTaskOrb extends BaseScriptComponent {
    orbName: string;
    priorityMass: number;
    isCompleted: boolean;
    pulseFrequency: number;
    onTetherGrab: (handPosition: vec3) => void;
    completeTask: () => void;
}

@component
export class SpatialQuantumBeacon extends BaseScriptComponent {
    @input
    beaconName = "Volumetric Matrix Quantum Beacon";

    @input
    targetOrb: KineticTaskOrb = null as unknown as KineticTaskOrb;

    @input
    beaconHeightOffset = 0.25; // Height in meters above target orb

    @input
    pulseFrequency = 3.0; // Dynamic aura oscillation frequency

    @input
    beaconRadius = 0.15; // Radius of 3D volumetric beacon ring

    @input
    isBeaconActive = true;

    private transform: Transform;
    private currentPulseTime = 0.0;

    onAwake() {
        if (typeof this.getTransform === "function") {
            this.transform = this.getTransform();
        } else if (typeof (this as unknown as { getSceneObject?: () => SceneObject }).getSceneObject === "function") {
            this.transform = (this as unknown as { getSceneObject: () => SceneObject }).getSceneObject().getTransform();
        }
        this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
        print(`[SpatialQuantumBeacon] Initialized '${this.beaconName}' at offset +${this.beaconHeightOffset}m`);
    }

    onUpdate() {
        if (!this.isBeaconActive || !this.targetOrb) return;

        const deltaTime = getDeltaTime();
        this.currentPulseTime += deltaTime * this.pulseFrequency;

        // Position beacon floating directly above target orb's world position
        const targetPos = this.targetOrb.getTransform().getWorldPosition();
        const floatWave = Math.sin(this.currentPulseTime) * 0.02;

        const beaconPos = new vec3(targetPos.x, targetPos.y + this.beaconHeightOffset + floatWave, targetPos.z);

        this.transform.setWorldPosition(beaconPos);
    }

    /**
     * Calculates the dynamic beacon aura scale and glow pulse intensity
     */
    public getBeaconPulseMetrics(): { scaleFactor: number; glowIntensity: number } {
        const pulse = (Math.sin(this.currentPulseTime) + 1.0) * 0.5; // 0.0 -> 1.0
        const scaleFactor = 1.0 + pulse * 0.15;
        const glowIntensity = 0.5 + pulse * 0.5;

        return { scaleFactor, glowIntensity };
    }

    /**
     * Toggles beacon activity mode
     */
    public setBeaconActive(active: boolean): boolean {
        this.isBeaconActive = active;
        print(`[SpatialQuantumBeacon] Beacon activity set to -> ${this.isBeaconActive}`);
        return this.isBeaconActive;
    }

    /**
     * LEAF Automated assertion suite for Quantum Beacon runtime integrity
     */
    public runLeafBeaconAssertions(): boolean {
        print("[LEAF Quantum Beacon] Running automated beacon assertions...");
        const metrics = this.getBeaconPulseMetrics();
        if (metrics.scaleFactor < 1.0 || metrics.scaleFactor > 1.2) {
            throw new Error(`LEAF Assertion Failed: invalid pulse scale ${metrics.scaleFactor}`);
        }
        if (metrics.glowIntensity < 0.5 || metrics.glowIntensity > 1.0) {
            throw new Error(`LEAF Assertion Failed: invalid glow intensity ${metrics.glowIntensity}`);
        }
        print("[LEAF Quantum Beacon] ✅ ALL BEACON ASSERTIONS PASSED!");
        return true;
    }
}

// BuildSync: 2026-08-14T06:47:20.629Z
