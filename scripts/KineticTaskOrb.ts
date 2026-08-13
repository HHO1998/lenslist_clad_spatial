/**
 * 🌌 KineticTaskOrb.ts — Volumetric Gravitational Task Orb System for Snap Spectacles
 *
 * Part of Lenslist CLAD Spatial AR Project (The CLAD Summer Hackathon 2026)
 *
 * CREATIVE MANDATE: 100% Unique, World-First Spatial Interaction Mechanics.
 * Tasks are represented as physical kinetic 3D volumetric energy spheres.
 */

@component
export class KineticTaskOrb extends BaseScriptComponent {
    @input
    orbName = "Gravitational Task Node";

    @input
    priorityMass = 1.5; // High priority = higher gravitational mass

    @input
    isCompleted = false;

    @input
    pulseFrequency = 2.0;

    @allowUndefined
    @input
    isManagedByMatrix = false;

    private transform: Transform | undefined;
    private initialPosition: vec3 | undefined;
    private currentVelocity: vec3 = vec3.zero();

    public getOrbTransform(): Transform {
        if (!this.transform) {
            this.transform = this.getTransform();
        }
        return this.transform;
    }

    public getOrbInitialPosition(): vec3 {
        if (!this.initialPosition) {
            this.initialPosition = this.getOrbTransform().getWorldPosition();
        }
        return this.initialPosition;
    }

    onAwake() {
        this.getOrbTransform();
        this.getOrbInitialPosition();

        // Register update event for kinetic floating & gravitational oscillation
        this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));

        print(`[KineticTaskOrb] Initialized orb '${this.orbName}' with mass ${this.priorityMass}`);
    }

    onUpdate() {
        if (this.isCompleted) {
            this.applyDissolvePulse();
            return;
        }

        if (this.isManagedByMatrix) {
            return;
        }

        // World-First Kinetic Gravitational Floating Physics with Harmonic Multi-Frequency Oscillations
        const time = getTime();
        const floatOffsetY =
            (Math.sin(time * this.pulseFrequency) * 0.04 + Math.cos(time * 1.7) * 0.015) * this.priorityMass;
        const floatOffsetX = Math.sin(time * 0.9 + this.priorityMass) * 0.01 * this.priorityMass;
        const floatOffsetZ = Math.cos(time * 1.1 + this.priorityMass) * 0.01 * this.priorityMass;

        const initialPos = this.getOrbInitialPosition();
        const tr = this.getOrbTransform();
        const newPos = new vec3(initialPos.x + floatOffsetX, initialPos.y + floatOffsetY, initialPos.z + floatOffsetZ);

        tr.setWorldPosition(newPos);
    }

    /**
     * Triggered when user pinches or tethers the task orb in Snap Spectacles AR
     */
    public onTetherGrab(handPosition: vec3) {
        const tr = this.getOrbTransform();
        const currentPos = tr.getWorldPosition();
        const distance = currentPos.distance(handPosition);

        // Elastic laser-tether spring force calculation
        const springForce = (distance - 0.1) * 0.5 * this.priorityMass;
        const direction = handPosition.sub(currentPos).normalize();

        this.currentVelocity = new vec3(
            direction.x * springForce,
            direction.y * springForce,
            direction.z * springForce,
        );
        const updatedPos = currentPos.add(this.currentVelocity);
        tr.setWorldPosition(updatedPos);
    }

    /**
     * Complete task with a 3D volumetric energy shockwave feedback
     */
    public completeTask() {
        this.isCompleted = true;
        print(`[KineticTaskOrb] Task '${this.orbName}' COMPLETED. Triggering synesthetic spatial shockwave.`);
    }

    private applyDissolvePulse() {
        const tr = this.getOrbTransform();
        const scale = tr.getLocalScale();
        if (scale.x > 0.01) {
            tr.setLocalScale(new vec3(scale.x * 0.92, scale.y * 0.92, scale.z * 0.92));
        } else {
            this.getSceneObject().destroy();
        }
    }
}
