/**
 * 🌌 SpatialAudioController.ts — Synesthetic Spatial Audio & Resonance Trigger
 *
 * Part of Lenslist CLAD Summer Hackathon 2026 (Snap Spectacles)
 * Theme: ORGANIZE (Week 1)
 */

@component
export class SpatialAudioController extends BaseScriptComponent {
    @allowUndefined
    @input
    audioComponent: AudioComponent = null as unknown as AudioComponent;

    onAwake() {
        if (!this.audioComponent) {
            const comp = this.getSceneObject().getComponent("Component.AudioComponent");
            if (comp) {
                this.audioComponent = comp as unknown as AudioComponent;
            }
        }
        print("[SpatialAudioController] 3D Synesthetic Spatial Audio Controller ready.");
    }

    /**
     * Plays 3D directional acoustic feedback at specific spatial coordinates
     */
    public playSpatialPulseAt(position: vec3) {
        if (!this.audioComponent) {
            print(
                `[SpatialAudioController] Spatial Pulse at (${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}) [Simulated 3D Audio Frequency Modulated]`,
            );
            return;
        }

        const audioTransform = this.audioComponent.getSceneObject().getTransform();
        audioTransform.setWorldPosition(position);

        this.audioComponent.play(1);
        print(
            `[SpatialAudioController] Triggered spatial audio pulse at world coordinates: (${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)})`,
        );
    }

    public playTetherLaserSound() {
        this.playSpatialPulseAt(new vec3(0, 1.2, 0.5));
    }

    public playTaskCompletionSound() {
        this.playSpatialPulseAt(new vec3(0, 1.5, 1.0));
    }
}

// BuildSync: 2026-08-14T07:09:37.850Z
