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

    @allowUndefined
    @input
    tetherAudioTrack: AudioTrackAsset = null as unknown as AudioTrackAsset;

    @allowUndefined
    @input
    completionAudioTrack: AudioTrackAsset = null as unknown as AudioTrackAsset;

    @allowUndefined
    @input
    pulseAudioTrack: AudioTrackAsset = null as unknown as AudioTrackAsset;

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
     * Plays 3D acoustic feedback for Laser Tether Grab
     */
    public playTetherLaserSound() {
        if (this.audioComponent) {
            if (this.tetherAudioTrack) {
                (this.audioComponent as unknown as { audioTrack: AudioTrackAsset }).audioTrack = this.tetherAudioTrack;
            }
            this.audioComponent.volume = 1.0;
            this.audioComponent.play(1);
            print("[SpatialAudioController] 🎵 Played Laser Tether Snap Audio");
        } else {
            print("[SpatialAudioController] Laser Tether Snap Audio simulated.");
        }
    }

    /**
     * Plays 3D acoustic feedback for Task Completion
     */
    public playTaskCompletionSound() {
        if (this.audioComponent) {
            if (this.completionAudioTrack) {
                (this.audioComponent as unknown as { audioTrack: AudioTrackAsset }).audioTrack =
                    this.completionAudioTrack;
            }
            this.audioComponent.volume = 1.0;
            this.audioComponent.play(1);
            print("[SpatialAudioController] 🎵 Played Task Completion Shockwave Chime");
        } else {
            print("[SpatialAudioController] Task Completion Shockwave Chime simulated.");
        }
    }

    /**
     * Plays subtle ambient pulse loop
     */
    public playAmbientPulse() {
        if (this.audioComponent) {
            if (this.pulseAudioTrack) {
                (this.audioComponent as unknown as { audioTrack: AudioTrackAsset }).audioTrack = this.pulseAudioTrack;
            }
            this.audioComponent.volume = 0.6;
            this.audioComponent.play(-1);
        }
    }
}
