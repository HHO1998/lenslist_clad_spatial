import "./setup";
import { beforeEach, describe, expect, it } from "vitest";
import { SpatialPriorityColorAura } from "../scripts/SpatialPriorityColorAura";

describe("🌌 SpatialPriorityColorAura Component Tests", () => {
    let colorAura: SpatialPriorityColorAura;

    beforeEach(() => {
        colorAura = new SpatialPriorityColorAura();
    });

    it("should compute Urgent Crimson Red for high mass tasks", () => {
        const res = colorAura.computePriorityAuraColor(2.5);
        expect(res.urgencyTier).toBe("Urgent");
        expect(res.hexColor).toBe("#FF0055");
        expect(res.glowIntensity).toBe(1.5);
    });

    it("should compute Medium Violet for medium mass tasks", () => {
        const res = colorAura.computePriorityAuraColor(1.5);
        expect(res.urgencyTier).toBe("Medium");
        expect(res.hexColor).toBe("#B000FF");
        expect(res.glowIntensity).toBe(1.1);
    });

    it("should compute Standard Cyber Cyan for standard mass tasks", () => {
        const res = colorAura.computePriorityAuraColor(0.8);
        expect(res.urgencyTier).toBe("Standard");
        expect(res.hexColor).toBe("#00F0FF");
        expect(res.glowIntensity).toBe(0.8);
    });

    it("should pass LEAF automated priority aura assertion suite", () => {
        const pass = colorAura.runLeafAuraAssertions();
        expect(pass).toBe(true);
    });
});
