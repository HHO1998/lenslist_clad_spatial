import "./setup";
import { describe, expect, it } from "vitest";
import { SpatialVoiceGestureController } from "../scripts/SpatialVoiceGestureController";

describe("🎙️ Dimension 6: Spatial Voice Command & Gesture Classifier Tests", () => {
    it("should correctly parse voice phrases into spatial intents", () => {
        const controller = new SpatialVoiceGestureController();

        const evtOrganize = controller.processVoicePhrase("Please organize the spatial matrix", 0.9);
        expect(evtOrganize.intent).toBe("OrganizeMatrix");
        expect(evtOrganize.confidence).toBe(0.9);

        const evtFocus = controller.processVoicePhrase("Start 25m focus warp timer", 0.85);
        expect(evtFocus.intent).toBe("FocusWarp");

        const evtShatter = controller.processVoicePhrase("Shatter completed tasks", 0.95);
        expect(evtShatter.intent).toBe("ShatterCompleted");

        const evtReset = controller.processVoicePhrase("Reset gravity field", 0.88);
        expect(evtReset.intent).toBe("ResetGravity");

        const evtUnknown = controller.processVoicePhrase("Hello random sentence", 0.9);
        expect(evtUnknown.intent).toBe("None");
    });

    it("should respect confidence thresholding", () => {
        const controller = new SpatialVoiceGestureController();
        controller.minConfidenceThreshold = 0.8;

        const lowConf = controller.processVoicePhrase("Organize matrix", 0.5);
        expect(lowConf.intent).toBe("OrganizeMatrix");
        expect(controller.getRecognizedCount()).toBe(0); // Not counted as executed

        const highConf = controller.processVoicePhrase("Organize matrix", 0.85);
        expect(highConf.intent).toBe("OrganizeMatrix");
        expect(controller.getRecognizedCount()).toBe(1);
    });

    it("should classify hand tracking distance & velocity vectors into gestures", () => {
        const controller = new SpatialVoiceGestureController();

        const pinch = controller.classifyHandTrackingVectors(0.015, 0.05, 0.2);
        expect(pinch).toBe("Pinch");
        expect(controller.getActiveGesture()).toBe("Pinch");

        const dualExpand = controller.classifyHandTrackingVectors(0.1, 0.22, 0.1);
        expect(dualExpand).toBe("DualExpand");

        const wave = controller.classifyHandTrackingVectors(0.1, 0.05, 1.5);
        expect(wave).toBe("WaveSwipe");

        const none = controller.classifyHandTrackingVectors(0.1, 0.05, 0.2);
        expect(none).toBe("None");
    });

    it("should run automated LEAF assertions cleanly", () => {
        const controller = new SpatialVoiceGestureController();
        const leafPassed = controller.runVoiceGestureLeafTests();
        expect(leafPassed).toBe(true);
    });
});
