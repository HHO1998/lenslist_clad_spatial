// Lens Studio TypeScript Component — Volumetric Kinetic Particle Shockwave Generator
// Event: Lenslist CLAD Summer Hackathon 2026 (Snap Spectacles AR)

@component
export class SpatialBurstFX extends BaseScriptComponent {
    @input
    fxName = "Volumetric Kinetic Particle Shockwave";

    @input
    particleCount = 16;

    @input
    burstExpansionSpeed = 1.5;

    @input
    decayDurationSeconds = 0.8;

    @input
    initialParticleScale = 0.04;

    private activeParticles: Array<{ position: vec3; velocity: vec3; lifeRatio: number }> = [];
    private isBurstActive = false;
    private burstTimer = 0.0;

    onAwake() {
        print(`[SpatialBurstFX] Particle Shockwave System ready: '${this.fxName}' (${this.particleCount} particles)`);
    }

    onUpdate() {
        if (!this.isBurstActive) return;

        const deltaTime = getDeltaTime();
        this.burstTimer += deltaTime;
        const progress = Math.min(1.0, this.burstTimer / this.decayDurationSeconds);

        if (progress >= 1.0) {
            this.isBurstActive = false;
            this.activeParticles = [];
            print("[SpatialBurstFX] Particle shockwave dissolve complete.");
            return;
        }

        // Animate particles along radial explosion vectors with velocity drag
        const expansionStep = deltaTime * this.burstExpansionSpeed;
        for (const particle of this.activeParticles) {
            const posDelta = new vec3(
                particle.velocity.x * expansionStep,
                particle.velocity.y * expansionStep,
                particle.velocity.z * expansionStep,
            );
            particle.position = particle.position.add(posDelta);
            particle.velocity = new vec3(
                particle.velocity.x * 0.92,
                particle.velocity.y * 0.92,
                particle.velocity.z * 0.92,
            ); // Velocity damping
            particle.lifeRatio = 1.0 - progress;
        }
    }

    /**
     * Triggers a 3D volumetric particle shockwave burst at a specified origin position
     */
    public triggerBurst(originPos: vec3): number {
        this.isBurstActive = true;
        this.burstTimer = 0.0;
        this.activeParticles = [];

        // Generate spherical distribution of particle velocities
        for (let i = 0; i < this.particleCount; i++) {
            const phi = Math.acos(1 - 2 * (i / this.particleCount));
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;

            const vx = Math.sin(phi) * Math.cos(theta);
            const vy = Math.sin(phi) * Math.sin(theta);
            const vz = Math.cos(phi);

            const velocity = new vec3(vx, vy, vz).normalize();
            this.activeParticles.push({
                position: new vec3(originPos.x, originPos.y, originPos.z),
                velocity: velocity,
                lifeRatio: 1.0,
            });
        }

        print(
            `[SpatialBurstFX] SHOCKWAVE BURST triggered at (${originPos.x.toFixed(2)}, ${originPos.y.toFixed(2)}, ${originPos.z.toFixed(2)})`,
        );
        return this.activeParticles.length;
    }

    /**
     * Returns current particle positions and scale multipliers for shader rendering
     */
    public getActiveParticleStates(): Array<{ position: vec3; scale: number; alpha: number }> {
        return this.activeParticles.map((p) => ({
            position: p.position,
            scale: this.initialParticleScale * p.lifeRatio,
            alpha: p.lifeRatio,
        }));
    }

    /**
     * Closed-loop automated LEAF runtime assertion suite
     */
    public runLeafBurstAssertions(): boolean {
        print("[LEAF Burst Engine] Running automated volumetric particle shockwave assertions...");

        const count = this.triggerBurst(new vec3(0, 1.5, 1.0));
        if (count !== this.particleCount) {
            throw new Error(`LEAF Burst Assertion Failed: expected ${this.particleCount} particles, got ${count}`);
        }

        const states = this.getActiveParticleStates();
        if (states.length !== this.particleCount || states[0].alpha !== 1.0) {
            throw new Error("LEAF Burst Assertion Failed: invalid initial particle state");
        }

        print("[LEAF Burst Engine] ✅ ALL VOLUMETRIC BURST ASSERTIONS PASSED!");
        return true;
    }
}

// BuildSync: 2026-08-13T17:34:25.642Z
