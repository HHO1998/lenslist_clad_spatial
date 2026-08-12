/**
 * 🌌 SpatialAudioController.ts — Synesthetic Spatial Audio & Resonance Trigger
 *
 * Part of Lenslist CLAD Summer Hackathon 2026 (Snap Spectacles)
 * Theme: ORGANIZE (Week 1)
 * Created At: 2026-08-12T19:00:00+05:30 | Epoch: 1786541400
 */

@component
export class SpatialAudioController extends BaseScriptComponent {
    @input
    audioComponent: AudioComponent;

    private epochTimestamp = 1786541400;

    onAwake() {
        print(`[SpatialAudioController] Spatial audio resonator ready at Epoch ${this.epochTimestamp}`);
    }

    /**
     * Plays 3D directional acoustic feedback at specific spatial coordinates
     */
    public playSpatialPulseAt(position: vec3) {
        if (!this.audioComponent) return;

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
