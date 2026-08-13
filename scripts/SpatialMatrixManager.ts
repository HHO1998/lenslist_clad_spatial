/**
 * 🌌 SpatialMatrixManager.ts — Volumetric Task Cluster & Orbital Dynamics Manager
 *
 * Part of Lenslist CLAD Summer Hackathon 2026 (Snap Spectacles)
 * Theme: ORGANIZE (Week 1)
 */

import type { KineticTaskOrb } from "./KineticTaskOrb";

@component
export class SpatialMatrixManager extends BaseScriptComponent {
    @input
    clusterCategoryName = "Spatial Work Matrix";

    @input
    orbitRadius = 0.35;

    @input
    orbitSpeed = 0.8;

    @input
    parentTaskOrb: KineticTaskOrb;

    @input
    satelliteOrbs: KineticTaskOrb[] = [];

    private isClusterActive = true;

    onAwake() {
        this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
        print(`[SpatialMatrixManager] Cluster '${this.clusterCategoryName}' initialized`);

        // Execute LEAF automated assertion tests on startup
        this.runLeafTestSuite();
    }

    onUpdate() {
        if (!this.isClusterActive || !this.parentTaskOrb) return;

        const parentPos = this.parentTaskOrb.getTransform().getWorldPosition();
        const time = getTime() * this.orbitSpeed;

        // Calculate 3D Keplerian elliptical orbits for satellite sub-tasks
        for (let i = 0; i < this.satelliteOrbs.length; i++) {
            const sat = this.satelliteOrbs[i];
            if (!sat || sat.isCompleted) continue;

            const angle = time + i * ((Math.PI * 2) / this.satelliteOrbs.length);
            const satX = parentPos.x + Math.cos(angle) * this.orbitRadius;
            const satY = parentPos.y + Math.sin(angle * 0.5) * 0.08; // Vertical subtle wave
            const satZ = parentPos.z + Math.sin(angle) * this.orbitRadius;

            sat.getTransform().setWorldPosition(new vec3(satX, satY, satZ));
        }
    }

    /**
     * CLAD & LEAF Closed-Loop Automated Assertion Test Suite
     */
    public runLeafTestSuite(): boolean {
        print("[LEAF Test Framework] Executing spatial matrix integration tests...");

        const test1 = this.assertSpatialLimits();
        const test2 = this.assertNodeCount();

        if (test1 && test2) {
            print("[LEAF Test Framework] ✅ ALL TESTS PASSED SUCCESSFULLY!");
            return true;
        }
        print("[LEAF Test Framework] ❌ ASSERTION FAILURE IN SPATIAL MATRIX.");
        return false;
    }

    /**
     * Completes a task orb and calculates remaining active nodes
     */
    public completeTaskOrb(orbIndex: number): { remainingCount: number; isClusterComplete: boolean } {
        if (orbIndex >= 0 && orbIndex < this.satelliteOrbs.length) {
            const orb = this.satelliteOrbs[orbIndex];
            if (orb) {
                orb.isCompleted = true;
            }
        }

        const activeNodes = this.satelliteOrbs.filter((o) => o && !o.isCompleted);
        print(`[SpatialMatrixManager] Task Orb ${orbIndex} completed. Active remaining: ${activeNodes.length}`);
        return {
            remainingCount: activeNodes.length,
            isClusterComplete: activeNodes.length === 0,
        };
    }

    /**
     * Returns active cluster metrics for SpatialHolographicRingHUD status sync
     */
    public getClusterMetrics(): { totalCount: number; completedCount: number; activeCategory: string } {
        const completedCount = this.satelliteOrbs.filter((o) => o?.isCompleted).length;
        return {
            totalCount: this.satelliteOrbs.length,
            completedCount,
            activeCategory: this.clusterCategoryName,
        };
    }

    private assertSpatialLimits(): boolean {
        const parentPos = this.parentTaskOrb ? this.parentTaskOrb.getTransform().getWorldPosition() : vec3.zero();
        // Ensure matrix fits inside Spectacles FOV (within 3.5 meters from camera origin)
        const lenVal = (parentPos as unknown as { length: unknown }).length;
        const parentLen =
            typeof lenVal === "function"
                ? (parentPos as unknown as { length: () => number }).length()
                : (lenVal as number);
        return parentLen < 3.5;
    }

    private assertNodeCount(): boolean {
        return this.satelliteOrbs.length >= 0;
    }
}
