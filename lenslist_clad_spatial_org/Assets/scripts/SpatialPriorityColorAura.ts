/**
 * 🌌 SpatialPriorityColorAura.ts — Dynamic Priority Mass & Urgency Fresnel Aura Controller
 *
 * Part of Lenslist CLAD Summer Hackathon 2026 (Snap Spectacles)
 * Theme: ORGANIZE (Week 1 Upgrade)
 */

export interface PriorityAuraColorResult {
    hexColor: string;
    rgbColor: [number, number, number];
    glowIntensity: number;
    urgencyTier: "Standard" | "Medium" | "Urgent";
}

@component
export class SpatialPriorityColorAura extends BaseScriptComponent {
    @input
    auraName: string = "Dynamic Priority Fresnel Color Controller";

    @input
    urgentMassThreshold: number = 2.0;

    @input
    mediumMassThreshold: number = 1.2;

    onAwake() {
        print(`[SpatialPriorityColorAura] Initialized priority color controller '${this.auraName}'`);
        this.runLeafAuraAssertions();
    }

    /**
     * Calculates dynamic Fresnel energy color and RGB vectors based on priority mass and urgency
     */
    public computePriorityAuraColor(priorityMass: number, isOverdue = false): PriorityAuraColorResult {
        if (priorityMass >= this.urgentMassThreshold || isOverdue) {
            return {
                hexColor: "#FF0055", // Luminous Crimson Red
                rgbColor: [1.0, 0.0, 0.33],
                glowIntensity: 1.5,
                urgencyTier: "Urgent",
            };
        }

        if (priorityMass >= this.mediumMassThreshold) {
            return {
                hexColor: "#B000FF", // Luminous Violet
                rgbColor: [0.69, 0.0, 1.0],
                glowIntensity: 1.1,
                urgencyTier: "Medium",
            };
        }

        return {
            hexColor: "#00F0FF", // Luminous Cyber Cyan
            rgbColor: [0.0, 0.94, 1.0],
            glowIntensity: 0.8,
            urgencyTier: "Standard",
        };
    }

    /**
     * LEAF Automated assertion suite for Priority Aura Controller
     */
    public runLeafAuraAssertions(): boolean {
        print("[LEAF Priority Aura] Running automated priority color aura assertions...");

        const urgentResult = this.computePriorityAuraColor(2.5);
        if (urgentResult.urgencyTier !== "Urgent" || urgentResult.hexColor !== "#FF0055") {
            throw new Error(
                `LEAF Priority Aura Assertion Failed: expected Urgent #FF0055, got ${urgentResult.hexColor}`,
            );
        }

        const mediumResult = this.computePriorityAuraColor(1.5);
        if (mediumResult.urgencyTier !== "Medium" || mediumResult.hexColor !== "#B000FF") {
            throw new Error(
                `LEAF Priority Aura Assertion Failed: expected Medium #B000FF, got ${mediumResult.hexColor}`,
            );
        }

        const standardResult = this.computePriorityAuraColor(0.8);
        if (standardResult.urgencyTier !== "Standard" || standardResult.hexColor !== "#00F0FF") {
            throw new Error(
                `LEAF Priority Aura Assertion Failed: expected Standard #00F0FF, got ${standardResult.hexColor}`,
            );
        }

        print("[LEAF Priority Aura] ✅ ALL PRIORITY AURA ASSERTIONS PASSED!");
        return true;
    }
}

// BuildSync: 2026-08-14T03:36:03.029Z
