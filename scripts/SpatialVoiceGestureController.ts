/**
 * 🎙️ SpatialVoiceGestureController.ts — Voice Command & Hand Gesture Classifier
 *
 * Part of Lenslist CLAD Summer Hackathon 2026 (Snap Spectacles)
 * Theme: ORGANIZE (Week 1 Upgrade)
 * Created At: 2026-08-13T07:49:15+05:30 | Epoch: 1786588155
 */

import type { SpatialAudioController } from "./SpatialAudioController";
import type { SpatialMatrixManager } from "./SpatialMatrixManager";
import type { SpatialWarpTimer } from "./SpatialWarpTimer";

export type SpatialGestureType = "None" | "Pinch" | "DualExpand" | "WaveSwipe";
export type SpatialVoiceIntent = "None" | "OrganizeMatrix" | "FocusWarp" | "ShatterCompleted" | "ResetGravity";

export interface VoiceGestureEvent {
    intent: SpatialVoiceIntent;
    gesture: SpatialGestureType;
    confidence: number;
    timestamp: number;
}

@component
export class SpatialVoiceGestureController extends BaseScriptComponent {
    @input
    enableVoiceCommands = true;

    @input
    enableGestureRecognition = true;

    @input
    minConfidenceThreshold = 0.75;

    @input
    matrixManager: SpatialMatrixManager;

    @input
    warpTimer: SpatialWarpTimer;

    @input
    audioController: SpatialAudioController;

    private activeGesture: SpatialGestureType = "None";
    private activeIntent: SpatialVoiceIntent = "None";
    private lastEventEpoch = 1786588155;
    private recognizedEventsCount = 0;

    onAwake() {
        this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
        print(`[SpatialVoiceGestureController] Initialized at Epoch ${this.lastEventEpoch}`);

        // Run automated LEAF assertions for Voice & Gesture Engine
        this.runVoiceGestureLeafTests();
    }

    onUpdate() {
        if (!this.enableGestureRecognition && !this.enableVoiceCommands) return;
        // Periodic spatial gesture & acoustic polling logic
    }

    /**
     * Parses spoken voice transcript from Spectacles microphone input into spatial intent
     */
    public processVoicePhrase(transcript: string, rawConfidence = 0.9): VoiceGestureEvent {
        if (!this.enableVoiceCommands) {
            return { intent: "None", gesture: "None", confidence: 0, timestamp: getTime() };
        }

        const normalized = transcript.trim().toLowerCase();
        let intent: SpatialVoiceIntent = "None";

        if (normalized.includes("organize") || normalized.includes("matrix")) {
            intent = "OrganizeMatrix";
        } else if (normalized.includes("focus") || normalized.includes("warp") || normalized.includes("timer")) {
            intent = "FocusWarp";
        } else if (normalized.includes("shatter") || normalized.includes("complete") || normalized.includes("clear")) {
            intent = "ShatterCompleted";
        } else if (normalized.includes("reset") || normalized.includes("gravity")) {
            intent = "ResetGravity";
        }

        const event: VoiceGestureEvent = {
            intent,
            gesture: this.activeGesture,
            confidence: rawConfidence,
            timestamp: getTime(),
        };

        if (intent !== "None" && rawConfidence >= this.minConfidenceThreshold) {
            this.activeIntent = intent;
            this.recognizedEventsCount++;
            this.executeVoiceIntent(intent);
        }

        return event;
    }

    /**
     * Classifies Spectacles dual hand tracking spatial vectors into gesture triggers
     */
    public classifyHandTrackingVectors(
        handPinchDistance: number,
        dualHandSpanDelta: number,
        handVelocityZ: number,
    ): SpatialGestureType {
        if (!this.enableGestureRecognition) return "None";

        let detected: SpatialGestureType = "None";

        if (handPinchDistance < 0.03) {
            detected = "Pinch";
        } else if (dualHandSpanDelta > 0.15) {
            detected = "DualExpand";
        } else if (Math.abs(handVelocityZ) > 1.2) {
            detected = "WaveSwipe";
        }

        this.activeGesture = detected;
        return detected;
    }

    private executeVoiceIntent(intent: SpatialVoiceIntent) {
        print(`[SpatialVoiceGestureController] Executing Voice Intent: '${intent}'`);

        if (this.audioController) {
            this.audioController.playTetherLaserSound();
        }

        switch (intent) {
            case "OrganizeMatrix":
                if (this.matrixManager) {
                    this.matrixManager.runLeafTestSuite();
                }
                break;
            case "FocusWarp":
                if (this.warpTimer) {
                    this.warpTimer.triggerPulseFeedback();
                }
                break;
            case "ShatterCompleted":
                if (this.audioController) {
                    this.audioController.playTaskCompletionSound();
                }
                break;
            case "ResetGravity":
                print("[SpatialVoiceGestureController] Resetting Gravitational Field Equilibrium.");
                break;
        }
    }

    /**
     * LEAF Automated Assertion Test Suite for Voice & Gesture Controller
     */
    public runVoiceGestureLeafTests(): boolean {
        print("[LEAF Voice/Gesture] Running automated classification unit assertions...");

        const voiceEvt = this.processVoicePhrase("Organize task matrix now", 0.95);
        const passVoice = voiceEvt.intent === "OrganizeMatrix" && voiceEvt.confidence >= 0.75;

        const gesturePinch = this.classifyHandTrackingVectors(0.01, 0.02, 0.1);
        const passPinch = gesturePinch === "Pinch";

        const gestureExpand = this.classifyHandTrackingVectors(0.1, 0.25, 0.1);
        const passExpand = gestureExpand === "DualExpand";

        if (passVoice && passPinch && passExpand) {
            print("[LEAF Voice/Gesture] ✅ ALL VOICE & GESTURE ASSERTIONS PASSED!");
            return true;
        }
        print("[LEAF Voice/Gesture] ❌ ASSERTION FAILURE IN VOICE/GESTURE ENGINE.");
        return false;
    }

    public getActiveIntent(): SpatialVoiceIntent {
        return this.activeIntent;
    }

    public getActiveGesture(): SpatialGestureType {
        return this.activeGesture;
    }

    public getRecognizedCount(): number {
        return this.recognizedEventsCount;
    }
}
