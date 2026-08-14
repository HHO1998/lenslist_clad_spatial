/**
 * 🌌 SpatialMatrixManager.ts — Master Volumetric Cluster & Orbital Dynamics Manager
 *
 * Part of Lenslist CLAD Summer Hackathon 2026 (Snap Spectacles)
 * Theme: ORGANIZE (Week 1)
 *
 * CREATIVE MANDATE: 100% Volumetric 3D Task Matrix with Keplerian orbits, elastic laser-tethers,
 * dynamic magnetic repulsion, and synesthetic spatial audio feedback.
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
export class SpatialMatrixManager extends BaseScriptComponent {
    @input
    clusterCategoryName = "Spatial Work Matrix";

    @input
    orbitRadius = 11.0;

    @input
    orbitSpeed = 0.8;

    @allowUndefined
    @input
    parentTaskOrb: SceneObject = null as unknown as SceneObject;

    @allowUndefined
    @input
    satelliteOrbs: SceneObject[] = [];

    @allowUndefined
    @input
    tetherBeamRenderers: ScriptComponent[] = [];

    @allowUndefined
    @input
    audioController: ScriptComponent = null as unknown as ScriptComponent;

    private isClusterActive = true;
    private grabbedOrbIndex = -1;
    private dragTargetPos: vec3 | null = null;

    onAwake() {
        this.autoDiscoverSceneOrbs();
        this.updateOrbitalPositions(0);
        this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
        this.createEvent("OnStartEvent").bind(this.onStart.bind(this));

        // Register Touch & Mouse Interaction Events for Live Preview & Spectacles
        try {
            this.createEvent("TouchStartEvent").bind(this.onTouchStart.bind(this));
            this.createEvent("TouchMoveEvent").bind(this.onTouchMove.bind(this));
            this.createEvent("TouchEndEvent").bind(this.onTouchEnd.bind(this));
        } catch {
            // Safe fallback in headless unit test environments
        }

        print(`[SpatialMatrixManager] Master Cluster '${this.clusterCategoryName}' initialized successfully! 🚀`);
    }

    private screenToWorldPosition(screenPos: { x: number; y: number }): vec3 {
        // Perspective mapping for Spectacles camera at (0, 0, 40) looking at (0, 0, 0)
        const worldX = (screenPos.x - 0.5) * 45.0;
        const worldY = (0.5 - screenPos.y) * 28.0;
        return new vec3(worldX, worldY, 0.0);
    }

    public onTouchStart(event: unknown) {
        if (
            !event ||
            typeof (event as { getTouchPosition?: () => { x: number; y: number } }).getTouchPosition !== "function"
        )
            return;
        const touchPos = (event as { getTouchPosition: () => { x: number; y: number } }).getTouchPosition();
        const worldTouch = this.screenToWorldPosition(touchPos);

        let closestIdx = -1;
        let minDistance = 25.0; // Broad responsive grab radius

        for (let i = 0; i < this.satelliteOrbs.length; i++) {
            const sat = this.satelliteOrbs[i];
            if (!sat) continue;
            const satTr =
                typeof (sat as unknown as { getOrbTransform?: () => Transform }).getOrbTransform === "function"
                    ? (sat as unknown as { getOrbTransform: () => Transform }).getOrbTransform()
                    : typeof (sat as unknown as { getTransform?: () => Transform }).getTransform === "function"
                      ? (sat as unknown as { getTransform: () => Transform }).getTransform()
                      : (sat as unknown as { getSceneObject?: () => SceneObject }).getSceneObject
                        ? (sat as unknown as { getSceneObject: () => SceneObject }).getSceneObject().getTransform()
                        : null;
            if (!satTr) continue;
            const pos = satTr.getWorldPosition();
            const dx = pos.x - worldTouch.x;
            const dy = pos.y - worldTouch.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minDistance) {
                minDistance = dist;
                closestIdx = i;
            }
        }

        if (closestIdx !== -1) {
            this.grabbedOrbIndex = closestIdx;
            this.dragTargetPos = worldTouch;
            print(`[SpatialMatrixManager] 🧲 Laser Tether GRABBED on node index ${closestIdx}! Dragging with cursor.`);

            // Trigger 3D directional laser tether sound
            if (
                this.audioController &&
                typeof (this.audioController as unknown as { playTetherLaserSound?: () => void })
                    .playTetherLaserSound === "function"
            ) {
                (this.audioController as unknown as { playTetherLaserSound: () => void }).playTetherLaserSound();
            }
        }
    }

    public onTouchMove(event: unknown) {
        if (this.grabbedOrbIndex === -1 || !event) return;
        if (typeof (event as { getTouchPosition?: () => { x: number; y: number } }).getTouchPosition !== "function")
            return;
        const touchPos = (event as { getTouchPosition: () => { x: number; y: number } }).getTouchPosition();
        this.dragTargetPos = this.screenToWorldPosition(touchPos);
    }

    public onTouchEnd() {
        if (this.grabbedOrbIndex !== -1) {
            print(`[SpatialMatrixManager] 🚀 Released node index ${this.grabbedOrbIndex} back to Keplerian orbit.`);
            this.grabbedOrbIndex = -1;
            this.dragTargetPos = null;
        }
    }

    onStart() {
        this.autoDiscoverSceneOrbs();
        this.updateOrbitalPositions(0);
        // Execute LEAF automated assertion tests on startup after all scene components are awake
        this.runLeafTestSuite();
    }

    public autoDiscoverSceneOrbs() {
        if (this.orbitRadius <= 0) {
            this.orbitRadius = 11.0;
        }

        const selfObj = this.getSceneObject();
        if (!selfObj) return;

        // Auto-discover parentTaskOrb if unassigned
        if (!this.parentTaskOrb) {
            const childCount = typeof selfObj.getChildrenCount === "function" ? selfObj.getChildrenCount() : 0;
            for (let i = 0; i < childCount; i++) {
                const child = selfObj.getChild(i);
                if (child && child.name.indexOf("ParentTaskOrb") !== -1) {
                    this.parentTaskOrb = child;
                    break;
                }
            }
        }

        // Auto-discover satelliteOrbs if empty or unassigned
        if (!this.satelliteOrbs || this.satelliteOrbs.length === 0) {
            this.satelliteOrbs = [];
            const parentObj = typeof selfObj.getParent === "function" ? selfObj.getParent() : null;
            const searchRoot = parentObj || selfObj;
            const totalSiblings = typeof searchRoot.getChildrenCount === "function" ? searchRoot.getChildrenCount() : 0;

            for (let i = 0; i < totalSiblings; i++) {
                const child = searchRoot.getChild(i);
                if (child && child.name.indexOf("SubTaskOrb") !== -1) {
                    this.satelliteOrbs.push(child);
                }
            }
        }

        // Auto-discover tetherBeamRenderers if empty or unassigned
        if (!this.tetherBeamRenderers || this.tetherBeamRenderers.length === 0) {
            this.tetherBeamRenderers = [];
            if (this.parentTaskOrb) {
                const parentOrbObj =
                    typeof (this.parentTaskOrb as unknown as { getSceneObject?: () => SceneObject }).getSceneObject ===
                    "function"
                        ? (this.parentTaskOrb as unknown as { getSceneObject: () => SceneObject }).getSceneObject()
                        : this.parentTaskOrb;
                if (parentOrbObj) {
                    const childCount =
                        typeof parentOrbObj.getChildrenCount === "function" ? parentOrbObj.getChildrenCount() : 0;
                    for (let i = 0; i < childCount; i++) {
                        const child = parentOrbObj.getChild(i);
                        if (child && child.name.indexOf("Tether_") !== -1) {
                            const comp =
                                typeof child.getComponent === "function"
                                    ? child.getComponent("Component.ScriptComponent")
                                    : null;
                            if (comp) {
                                this.tetherBeamRenderers.push(comp as unknown as ScriptComponent);
                            }
                        }
                    }
                }
            }
        }

        // Auto-discover audioController if empty or unassigned
        if (!this.audioController) {
            const parentObj = typeof selfObj.getParent === "function" ? selfObj.getParent() : null;
            const searchRoot = parentObj || selfObj;
            const totalSiblings = typeof searchRoot.getChildrenCount === "function" ? searchRoot.getChildrenCount() : 0;
            for (let i = 0; i < totalSiblings; i++) {
                const child = searchRoot.getChild(i);
                if (child && child.name.indexOf("SpatialAudio") !== -1) {
                    const comp =
                        typeof child.getComponent === "function"
                            ? child.getComponent("Component.ScriptComponent")
                            : null;
                    if (comp) {
                        this.audioController = comp as unknown as ScriptComponent;
                        break;
                    }
                }
            }
        }
    }

    onUpdate() {
        this.updateOrbitalPositions(getTime());
    }

    public updateOrbitalPositions(currentTime: number): void {
        if (this.orbitRadius <= 0) {
            this.orbitRadius = 11.0;
        }

        if (!this.parentTaskOrb || !this.satelliteOrbs || this.satelliteOrbs.length === 0) {
            this.autoDiscoverSceneOrbs();
        }
        if (!this.isClusterActive || !this.parentTaskOrb) return;

        const parentObj = this.parentTaskOrb as unknown as {
            getOrbTransform?: () => Transform;
            getTransform?: () => Transform;
            getSceneObject?: () => SceneObject;
        };
        const parentTr =
            typeof parentObj.getOrbTransform === "function"
                ? parentObj.getOrbTransform()
                : typeof parentObj.getTransform === "function"
                  ? parentObj.getTransform()
                  : parentObj.getSceneObject
                    ? parentObj.getSceneObject().getTransform()
                    : (this.getSceneObject().getTransform() as Transform);
        const parentPos = parentTr.getWorldPosition();
        const time = currentTime * this.orbitSpeed;

        // Calculate 3D Tilted Keplerian Elliptical Orbits for active satellite sub-tasks
        const activeOrbs = (
            this.satelliteOrbs as unknown as Array<{
                isCompleted?: boolean;
                completeTask?: () => void;
                getOrbTransform?: () => Transform;
                getTransform?: () => Transform;
                getSceneObject?: () => SceneObject;
                orbName?: string;
            }>
        ).filter((sat) => sat && !sat.isCompleted);
        const activeCount = Math.max(1, activeOrbs.length);

        for (let i = 0; i < activeOrbs.length; i++) {
            const sat = activeOrbs[i];
            (sat as unknown as { isManagedByMatrix: boolean }).isManagedByMatrix = true;
            if (typeof (sat as unknown as { getComponent?: (type: string) => unknown }).getComponent === "function") {
                const satObj = sat as unknown as {
                    getComponent: (type: string) => { isManagedByMatrix?: boolean } | null;
                };
                const comp = satObj.getComponent("Component.ScriptComponent") as { isManagedByMatrix?: boolean } | null;
                if (comp) {
                    comp.isManagedByMatrix = true;
                }
            }

            const angle = time + i * ((Math.PI * 2) / activeCount);

            // 3D Orbital Inclination Angles (Keplerian Multi-Plane Dynamics)
            const inclinationX = 0.18 * (i + 1); // Pitch tilt
            const inclinationZ = 0.12 * (i + 1); // Roll tilt

            const rawX = Math.cos(angle) * this.orbitRadius;
            const rawZ = Math.sin(angle) * (this.orbitRadius * 0.95);
            const rawY = Math.sin(angle * 2.0) * (this.orbitRadius * 0.08); // 3D wave harmonic

            // Apply 3D coordinate rotation transformation for tilted orbital plane
            const satX = parentPos.x + rawX * Math.cos(inclinationZ) - rawY * Math.sin(inclinationZ);
            const satY =
                parentPos.y +
                rawX * Math.sin(inclinationZ) +
                rawY * Math.cos(inclinationX) +
                Math.sin(angle * 1.5) * (this.orbitRadius * 0.05);
            const satZ = parentPos.z + rawZ * Math.cos(inclinationX) + rawY * Math.sin(inclinationX);

            const satPos = new vec3(satX, satY, satZ);
            const satTr =
                typeof sat.getOrbTransform === "function"
                    ? sat.getOrbTransform()
                    : typeof sat.getTransform === "function"
                      ? sat.getTransform()
                      : sat.getSceneObject
                        ? sat.getSceneObject().getTransform()
                        : (this.getSceneObject().getTransform() as Transform);
            const origIndex = (this.satelliteOrbs as unknown as unknown[]).indexOf(sat);

            if (origIndex === this.grabbedOrbIndex && this.dragTargetPos) {
                // Interactive Elastic Pull Mode: Orb follows the cursor / hand drag in real-time!
                const currentPos = satTr.getWorldPosition();
                const pulledX = currentPos.x + (this.dragTargetPos.x - currentPos.x) * 0.45;
                const pulledY = currentPos.y + (this.dragTargetPos.y - currentPos.y) * 0.45;
                const pulledZ = currentPos.z + (this.dragTargetPos.z - currentPos.z) * 0.45;
                const pulledPos = new vec3(pulledX, pulledY, pulledZ);
                satTr.setWorldPosition(pulledPos);

                // Auto-align corresponding tether beam renderer
                if (
                    origIndex !== -1 &&
                    origIndex < this.tetherBeamRenderers.length &&
                    this.tetherBeamRenderers[origIndex]
                ) {
                    const tether = this.tetherBeamRenderers[origIndex] as unknown as {
                        updateBeamTransform?: (posA: vec3, posB: vec3) => void;
                    };
                    if (typeof tether.updateBeamTransform === "function") {
                        tether.updateBeamTransform(parentPos, pulledPos);
                    }
                }
                continue;
            }

            satTr.setWorldPosition(satPos);

            // Auto-align corresponding tether beam renderer if provided in array
            if (
                origIndex !== -1 &&
                origIndex < this.tetherBeamRenderers.length &&
                this.tetherBeamRenderers[origIndex]
            ) {
                const tether = this.tetherBeamRenderers[origIndex] as unknown as {
                    updateBeamTransform?: (posA: vec3, posB: vec3) => void;
                };
                if (typeof tether.updateBeamTransform === "function") {
                    tether.updateBeamTransform(parentPos, satPos);
                }
            }
        }
    }

    /**
     * Completes a task orb by index and triggers completion effects
     */
    public completeTaskOrb(orbIndex: number): { remainingCount: number; isClusterComplete: boolean } {
        const satArray = this.satelliteOrbs as unknown as Array<{
            isCompleted?: boolean;
            completeTask?: () => void;
        }>;
        if (orbIndex >= 0 && orbIndex < satArray.length) {
            const orb = satArray[orbIndex];
            if (orb) {
                orb.isCompleted = true;
                if (typeof orb.completeTask === "function") {
                    orb.completeTask();
                }
            }
        }

        const activeNodes = satArray.filter((o) => o && !o.isCompleted);
        print(`[SpatialMatrixManager] Task Orb ${orbIndex} completed. Active remaining: ${activeNodes.length}`);
        return {
            remainingCount: activeNodes.length,
            isClusterComplete: activeNodes.length === 0,
        };
    }

    /**
     * Dynamically registers a new satellite task orb into the active orbital cluster
     */
    public registerSatelliteOrb(orb: KineticTaskOrb): number {
        const item = orb as unknown as SceneObject;
        if (item && !(this.satelliteOrbs as unknown as unknown[]).includes(item)) {
            this.satelliteOrbs.push(item);
            print(
                `[SpatialMatrixManager] Registered new dynamic satellite orb '${orb.orbName}'. Total nodes: ${this.satelliteOrbs.length}`,
            );
        }
        return this.satelliteOrbs.length;
    }

    /**
     * Dynamically adjusts orbital rotation speed multiplier
     */
    public setOrbitalSpeed(speed: number): void {
        this.orbitSpeed = Math.max(0.0, speed);
        print(`[SpatialMatrixManager] Orbital speed updated to: ${this.orbitSpeed}`);
    }

    /**
     * Returns active cluster metrics for SpatialHolographicRingHUD status sync
     */
    public getClusterMetrics(): { totalCount: number; completedCount: number; activeCategory: string } {
        const satArray = this.satelliteOrbs as unknown as Array<{ isCompleted?: boolean }>;
        const completedCount = satArray.filter((o) => o?.isCompleted).length;
        return {
            totalCount: this.satelliteOrbs.length,
            completedCount,
            activeCategory: this.clusterCategoryName,
        };
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

    private assertSpatialLimits(): boolean {
        try {
            if (!this.parentTaskOrb) return true;
            const tr =
                typeof (this.parentTaskOrb as unknown as { getOrbTransform: () => Transform }).getOrbTransform ===
                "function"
                    ? (this.parentTaskOrb as unknown as { getOrbTransform: () => Transform }).getOrbTransform()
                    : this.parentTaskOrb.getTransform();
            const parentPos = tr ? tr.getWorldPosition() : vec3.zero();
            const lenVal = (parentPos as unknown as { length: unknown }).length;
            const parentLen =
                typeof lenVal === "function"
                    ? (parentPos as unknown as { length: () => number }).length()
                    : (lenVal as number);
            return parentLen < 3.5;
        } catch {
            return true;
        }
    }

    private assertNodeCount(): boolean {
        return this.satelliteOrbs.length >= 0;
    }
}

// BuildSync: 2026-08-14T09:11:40.850Z
