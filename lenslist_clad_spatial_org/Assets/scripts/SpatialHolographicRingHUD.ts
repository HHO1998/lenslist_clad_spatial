// Lens Studio TypeScript Component — Spectacles Volumetric Holographic Ring HUD
// Event: Lenslist CLAD Summer Hackathon 2026 (Theme: ORGANIZE)

@component
export class SpatialHolographicRingHUD extends BaseScriptComponent {
    @input
    hudName = "Volumetric Wrist Status Ring";

    @input
    ringRadiusMeters = 0.12;

    @input
    smoothDampingSpeed = 8.0;

    @input
    isVisible = true;

    @input
    totalTaskCount = 4;

    @input
    completedTaskCount = 1;

    @input
    activeCategory = "WORK";

    private transform: Transform;
    private targetPosition: vec3 = new vec3(0, 1.4, 0.4);
    private currentRotationDeg = 0.0;

    onAwake() {
        if (typeof this.getTransform === "function") {
            this.transform = this.getTransform();
        } else if (typeof (this as unknown as { getSceneObject?: () => SceneObject }).getSceneObject === "function") {
            this.transform = (this as unknown as { getSceneObject: () => SceneObject }).getSceneObject().getTransform();
        }
        print(`[SpatialHolographicRingHUD] Initialized: '${this.hudName}' (Radius: ${this.ringRadiusMeters}m)`);
    }

    onUpdate() {
        if (!this.isVisible) return;

        // Smooth spatial damping follow towards target wrist/hand anchor position
        const currentPos = this.transform.getWorldPosition();
        const deltaTime = getDeltaTime();
        const t = Math.min(1.0, deltaTime * this.smoothDampingSpeed);
        const lerpedPos = new vec3(
            currentPos.x + (this.targetPosition.x - currentPos.x) * t,
            currentPos.y + (this.targetPosition.y - currentPos.y) * t,
            currentPos.z + (this.targetPosition.z - currentPos.z) * t,
        );
        this.transform.setWorldPosition(lerpedPos);

        // Continuous subtle rotational pulse for 3D volumetric HUD resonance
        this.currentRotationDeg = (this.currentRotationDeg + deltaTime * 25.0) % 360.0;
    }

    /**
     * Toggles 3D volumetric HUD visibility (triggered via palm-up gesture or voice command)
     */
    public toggleVisibility(show?: boolean): boolean {
        this.isVisible = show !== undefined ? show : !this.isVisible;
        print(`[SpatialHolographicRingHUD] Visibility updated -> ${this.isVisible ? "VISIBLE" : "HIDDEN"}`);
        return this.isVisible;
    }

    /**
     * Updates completed vs pending task counts for radial status arc calculations
     */
    public updateTaskCompletionMetrics(
        completed: number,
        total: number,
    ): { completedRatio: number; pendingCount: number } {
        this.completedTaskCount = Math.max(0, completed);
        this.totalTaskCount = Math.max(1, total);

        const ratio = Math.min(1.0, this.completedTaskCount / this.totalTaskCount);
        const pending = Math.max(0, this.totalTaskCount - this.completedTaskCount);

        print(
            `[SpatialHolographicRingHUD] Task Metrics: ${this.completedTaskCount}/${this.totalTaskCount} completed (${(ratio * 100).toFixed(0)}%)`,
        );
        return { completedRatio: ratio, pendingCount: pending };
    }

    /**
     * Computes start and end radian angles for 3D holographic ring arc segments
     */
    public calculateRingArcSegment(
        segmentIndex: number,
        totalSegments: number,
    ): { startAngleRad: number; endAngleRad: number; arcLength: number } {
        if (totalSegments <= 0) {
            return { startAngleRad: 0, endAngleRad: 0, arcLength: 0 };
        }

        const step = (Math.PI * 2) / totalSegments;
        const start = segmentIndex * step;
        const end = start + step * 0.85; // Leave small gap between volumetric arc nodes
        const arcLen = (end - start) * this.ringRadiusMeters;

        return {
            startAngleRad: start,
            endAngleRad: end,
            arcLength: arcLen,
        };
    }

    /**
     * Sets current active category preset (WORK / FOCUS / PERSONAL)
     */
    public setCategory(category: string): void {
        this.activeCategory = category.toUpperCase();
        print(`[SpatialHolographicRingHUD] HUD Preset Category switched to -> '${this.activeCategory}'`);
    }

    /**
     * Update target spatial anchor position relative to Spectacles hand tracking
     */
    public updateHandAnchorPosition(handPos: vec3): void {
        // Offset slightly above wrist/palm in front of camera view
        this.targetPosition = handPos.add(new vec3(0, 0.08, -0.05));
    }

    /**
     * Closed-loop automated LEAF runtime assertion suite
     */
    public runLeafHudAssertions(): boolean {
        print("[LEAF HUD Engine] Running automated volumetric HUD assertions...");

        const metrics = this.updateTaskCompletionMetrics(2, 4);
        if (metrics.completedRatio !== 0.5) {
            throw new Error(`LEAF HUD Assertion Failed: expected ratio 0.5, got ${metrics.completedRatio}`);
        }

        const arc = this.calculateRingArcSegment(0, 4);
        if (arc.arcLength <= 0) {
            throw new Error("LEAF HUD Assertion Failed: arc length must be positive");
        }

        print("[LEAF HUD Engine] ✅ ALL VOLUMETRIC HUD ASSERTIONS PASSED!");
        return true;
    }
}

// BuildSync: 2026-08-13T19:15:39.361Z
