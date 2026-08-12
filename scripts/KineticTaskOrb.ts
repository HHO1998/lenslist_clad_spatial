/**
 * 🌌 KineticTaskOrb.ts — Volumetric Gravitational Task Orb System for Snap Spectacles
 *
 * Part of Lenslist CLAD Spatial AR Project (The CLAD Summer Hackathon 2026)
 * Created At: 2026-08-12T18:44:07+05:30 | Epoch: 1786540447
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

    private transform: Transform;
    private initialPosition: vec3;
    private currentVelocity: vec3 = vec3.zero();
    private epochTimestamp = 1786540447;

    onAwake() {
        this.transform = this.getTransform();
        this.initialPosition = this.transform.getWorldPosition();

        // Register update event for kinetic floating & gravitational oscillation
        this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));

        print(
            `[KineticTaskOrb] Initialized orb '${this.orbName}' with mass ${this.priorityMass} at Epoch ${this.epochTimestamp}`,
        );
    }

    onUpdate() {
        if (this.isCompleted) {
            this.applyDissolvePulse();
            return;
        }

        // World-First Kinetic Gravitational Floating Physics
        const time = getTime();
        const floatOffset = Math.sin(time * this.pulseFrequency) * (0.05 * this.priorityMass);
        const currentPos = this.transform.getWorldPosition();

        const newPos = new vec3(currentPos.x, this.initialPosition.y + floatOffset, currentPos.z);

        this.transform.setWorldPosition(newPos);
    }

    /**
     * Triggered when user pinches or tethers the task orb in Snap Spectacles AR
     */
    public onTetherGrab(handPosition: vec3) {
        const currentPos = this.transform.getWorldPosition();
        const distance = currentPos.distance(handPosition);

        // Elastic laser-tether spring force calculation
        const springForce = (distance - 0.1) * 0.5 * this.priorityMass;
        const direction = handPosition.sub(currentPos).normalize();

        this.currentVelocity = direction.uniformScale(springForce);
        const updatedPos = currentPos.add(this.currentVelocity);
        this.transform.setWorldPosition(updatedPos);
    }

    /**
     * Complete task with a 3D volumetric energy shockwave feedback
     */
    public completeTask() {
        this.isCompleted = true;
        print(`[KineticTaskOrb] Task '${this.orbName}' COMPLETED. Triggering synesthetic spatial shockwave.`);
    }

    private applyDissolvePulse() {
        const scale = this.transform.getLocalScale();
        if (scale.x > 0.01) {
            this.transform.setLocalScale(scale.uniformScale(0.92));
        } else {
            this.getSceneObject().destroy();
        }
    }
}
