// Lens Studio TypeScript Component — Adaptive Gravitational Repulsion & Multi-Node Physics
// Event: Lenslist CLAD Summer Hackathon 2026 (Snap Spectacles AR)

@component
export class SpatialAdaptivePhysicsEngine extends BaseScriptComponent {
    @input
    engineName = "Spatial Adaptive Physics Engine";

    @input
    magneticRepulsionDistance = 0.25;

    @input
    repulsionStiffness = 2.5;

    @input
    dampingCoefficient = 0.92;

    @input
    maxVelocityMetersPerSec = 3.0;

    private nodePositions: Map<string, vec3> = new Map();
    private nodeVelocities: Map<string, vec3> = new Map();

    onAwake() {
        print(
            `[SpatialAdaptivePhysicsEngine] Physics Engine active: '${this.engineName}' (Repulsion Dist: ${this.magneticRepulsionDistance}m)`,
        );
    }

    /**
     * Registers a spatial node with its unique ID and current 3D position
     */
    public registerNode(id: string, initialPosition: vec3): void {
        this.nodePositions.set(id, initialPosition);
        this.nodeVelocities.set(id, new vec3(0, 0, 0));
    }

    /**
     * Calculates inverse-square magnetic repulsion force vector between two spatial positions
     */
    public calculateRepulsionForce(posA: vec3, posB: vec3): vec3 {
        const delta = posA.sub(posB);
        const distance = delta.length;

        if (distance <= 0.001 || distance >= this.magneticRepulsionDistance) {
            return new vec3(0, 0, 0);
        }

        const forceMagnitude = (1.0 - distance / this.magneticRepulsionDistance) * this.repulsionStiffness;
        const norm = delta.normalize();
        return new vec3(norm.x * forceMagnitude, norm.y * forceMagnitude, norm.z * forceMagnitude);
    }

    /**
     * Computes step physics updates for all registered nodes, applying repulsion and velocity damping
     */
    public computePhysicsStep(deltaTime: number): Map<string, vec3> {
        const ids = Array.from(this.nodePositions.keys());

        // Accumulate mutual repulsion forces
        for (let i = 0; i < ids.length; i++) {
            for (let j = i + 1; j < ids.length; j++) {
                const idA = ids[i];
                const idB = ids[j];
                const posA = this.nodePositions.get(idA);
                const posB = this.nodePositions.get(idB);
                const velAInit = this.nodeVelocities.get(idA);
                const velBInit = this.nodeVelocities.get(idB);

                if (posA && posB && velAInit && velBInit) {
                    const force = this.calculateRepulsionForce(posA, posB);
                    if (force.length > 0) {
                        const forceScaled = new vec3(force.x * deltaTime, force.y * deltaTime, force.z * deltaTime);
                        const velA = velAInit.add(forceScaled);
                        const velB = velBInit.sub(forceScaled);

                        this.nodeVelocities.set(idA, velA);
                        this.nodeVelocities.set(idB, velB);
                    }
                }
            }
        }

        // Apply velocity to position with damping and speed clamping
        for (const id of ids) {
            const velInit = this.nodeVelocities.get(id);
            const currentPos = this.nodePositions.get(id);

            if (velInit && currentPos) {
                let vel = new vec3(
                    velInit.x * this.dampingCoefficient,
                    velInit.y * this.dampingCoefficient,
                    velInit.z * this.dampingCoefficient,
                );
                if (vel.length > this.maxVelocityMetersPerSec) {
                    const normVel = vel.normalize();
                    vel = new vec3(
                        normVel.x * this.maxVelocityMetersPerSec,
                        normVel.y * this.maxVelocityMetersPerSec,
                        normVel.z * this.maxVelocityMetersPerSec,
                    );
                }
                this.nodeVelocities.set(id, vel);

                const velScaled = new vec3(vel.x * deltaTime, vel.y * deltaTime, vel.z * deltaTime);
                const updatedPos = currentPos.add(velScaled);
                this.nodePositions.set(id, updatedPos);
            }
        }

        return this.nodePositions;
    }

    /**
     * Closed-loop automated LEAF runtime assertion suite
     */
    public runLeafPhysicsAssertions(): boolean {
        print("[LEAF Physics Engine] Running automated magnetic repulsion physics assertions...");

        this.registerNode("nodeA", new vec3(0, 1.5, 1.0));
        this.registerNode("nodeB", new vec3(0.05, 1.5, 1.0)); // Very close (0.05m < 0.25m)

        const force = this.calculateRepulsionForce(new vec3(0, 1.5, 1.0), new vec3(0.05, 1.5, 1.0));
        if (force.length <= 0) {
            throw new Error("LEAF Physics Assertion Failed: repulsive force must be non-zero for overlapping nodes");
        }

        const updatedPositions = this.computePhysicsStep(0.016);
        const posA = updatedPositions.get("nodeA");
        const posB = updatedPositions.get("nodeB");

        if (!posA || !posB) {
            throw new Error("LEAF Physics Assertion Failed: node positions missing");
        }

        const newDist = posA.distance(posB);
        if (newDist <= 0.05) {
            throw new Error("LEAF Physics Assertion Failed: magnetic repulsion should push nodes apart");
        }

        print("[LEAF Physics Engine] ✅ ALL MAGNETIC REPULSION ASSERTIONS PASSED!");
        return true;
    }
}

// BuildSync: 2026-08-14T03:41:19.812Z
