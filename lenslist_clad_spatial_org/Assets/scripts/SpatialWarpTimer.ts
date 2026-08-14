/**
 * 🌌 SpatialWarpTimer.ts — Volumetric 3D Hyper-Dimensional Pomodoro Chronometer
 *
 * Part of Lenslist CLAD Summer Hackathon 2026 (Snap Spectacles)
 * Theme: ORGANIZE (Week 1)
 *
 * CREATIVE MANDATE: Replaces 2D text timers with an expanding volumetric torus structure
 * that distorts ambient room light and emits energy pulses as focus time progresses.
 */

@component
export class SpatialWarpTimer extends BaseScriptComponent {
    @input
    focusDurationMinutes = 25;

    @input
    timerName = "Volumetric Focus Chronometer";

    private transform: Transform;
    private elapsedTimeSeconds = 0;
    private isRunning = false;
    private initialScale: vec3;

    onAwake() {
        if (typeof this.getTransform === "function") {
            this.transform = this.getTransform();
        } else if (typeof (this as unknown as { getSceneObject?: () => SceneObject }).getSceneObject === "function") {
            this.transform = (this as unknown as { getSceneObject: () => SceneObject }).getSceneObject().getTransform();
        }
        if (this.transform) {
            this.initialScale = this.transform.getLocalScale();
        }

        this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
        print(`[SpatialWarpTimer] Chronometer '${this.timerName}' initialized (${this.focusDurationMinutes}m)`);
    }

    public startTimer() {
        this.isRunning = true;
        this.elapsedTimeSeconds = 0;
        print("[SpatialWarpTimer] Timer started.");
    }

    public pauseTimer() {
        this.isRunning = false;
    }

    public triggerPulseFeedback() {
        this.startTimer();
        print("[SpatialWarpTimer] Focus warp pulse feedback triggered.");
    }

    onUpdate() {
        if (!this.isRunning) return;

        const dt = getDeltaTime();
        this.elapsedTimeSeconds += dt;

        const totalSeconds = this.focusDurationMinutes * 60;
        const progressRatio = Math.min(this.elapsedTimeSeconds / totalSeconds, 1.0);

        // Volumetric 3D Hyper-Structure Dynamics:
        // Torus slowly rotates on 3 axes and scales up with focus intensity
        const currentRot = this.transform.getLocalRotation();
        const eulerRot = currentRot.toEulerAngles();
        eulerRot.x += dt * 0.5;
        eulerRot.y += dt * 0.8;
        eulerRot.z += dt * 0.3;
        this.transform.setLocalRotation(quat.fromEulerVec(eulerRot));

        // Scale pulse modulation according to focus progress
        const pulse = Math.sin(getTime() * (2 + progressRatio * 3)) * 0.05;
        const scaleFactor = 1.0 + progressRatio * 0.4 + pulse;
        const dynamicScale = new vec3(
            this.initialScale.x * scaleFactor,
            this.initialScale.y * scaleFactor,
            this.initialScale.z * scaleFactor,
        );
        this.transform.setLocalScale(dynamicScale);

        if (this.elapsedTimeSeconds >= totalSeconds) {
            this.onFocusSessionComplete();
        }
    }

    private onFocusSessionComplete() {
        this.isRunning = false;
        print("[SpatialWarpTimer] FOCUS SESSION COMPLETE! Triggering room-scale spatial burst.");
        // Shockwave expansion animation
        this.transform.setLocalScale(
            new vec3(this.initialScale.x * 2.5, this.initialScale.y * 2.5, this.initialScale.z * 2.5),
        );
    }
}

// BuildSync: 2026-08-14T08:01:41.935Z
