/**
 * 🌌 SpatialCategoryClusterSwitcher.ts — Multi-Category Task Matrix Switcher
 *
 * Part of Lenslist CLAD Summer Hackathon 2026 (Snap Spectacles)
 * Theme: ORGANIZE (Week 1 Upgrade)
 */

export type SpatialTaskCategory = "WORK" | "PERSONAL" | "CREATIVE" | "HEALTH";

export interface SpatialMatrixManagerLike {
    clusterCategoryName: string;
}

export interface SpatialHolographicRingHUDLike {
    setCategory: (category: SpatialTaskCategory) => void;
}

export interface SpatialBurstFXLike {
    triggerBurst: (position: vec3) => number;
}

@component
export class SpatialCategoryClusterSwitcher extends BaseScriptComponent {
    @input
    switcherName = "Multi-Category Matrix Switcher";

    @input
    activeCategory = "WORK";

    @allowUndefined
    @input
    ringHUD: SceneObject = null as unknown as SceneObject;

    @allowUndefined
    @input
    matrixManager: SceneObject = null as unknown as SceneObject;

    @allowUndefined
    @input
    burstFX: SceneObject = null as unknown as SceneObject;

    private availableCategories: SpatialTaskCategory[] = ["WORK", "PERSONAL", "CREATIVE", "HEALTH"];
    private isTransitioning = false;

    onAwake() {
        print(`[SpatialCategoryClusterSwitcher] Initialized switcher in category '${this.activeCategory}'`);
        this.createEvent("OnStartEvent").bind(this.onStart.bind(this));
    }

    onStart() {
        // Run automated LEAF assertions after all scene components are awake
        this.runLeafCategoryAssertions();
    }

    /**
     * Performs volumetric category switch with particle morphing physics and HUD updates
     */
    public switchCategory(targetCategory: SpatialTaskCategory): {
        previousCategory: SpatialTaskCategory;
        newCategory: SpatialTaskCategory;
        success: boolean;
    } {
        const previousCategory = this.activeCategory as SpatialTaskCategory;

        if (!this.availableCategories.includes(targetCategory)) {
            print(`[SpatialCategoryClusterSwitcher] Unknown category '${targetCategory}'. Switch rejected.`);
            return { previousCategory, newCategory: previousCategory, success: false };
        }

        if (targetCategory === this.activeCategory && !this.isTransitioning) {
            print(`[SpatialCategoryClusterSwitcher] Already in category '${targetCategory}'`);
            return { previousCategory, newCategory: targetCategory, success: true };
        }

        this.isTransitioning = true;
        this.activeCategory = targetCategory;

        // Trigger volumetric particle shockwave transition if BurstFX is attached
        if (this.burstFX) {
            const burstComp =
                (this.burstFX as unknown as { getComponent?: (name: string) => unknown }).getComponent?.(
                    "SpatialBurstFX",
                ) ||
                (this.burstFX as unknown as { getComponent?: (name: string) => unknown }).getComponent?.(
                    "ScriptComponent",
                ) ||
                this.burstFX;
            if (burstComp && typeof (burstComp as unknown as SpatialBurstFXLike).triggerBurst === "function") {
                (burstComp as unknown as SpatialBurstFXLike).triggerBurst(new vec3(0, 1.5, 1.0));
            }
        }

        // Sync active category with SpatialHolographicRingHUD
        if (this.ringHUD) {
            const ringComp =
                (this.ringHUD as unknown as { getComponent?: (name: string) => unknown }).getComponent?.(
                    "SpatialHolographicRingHUD",
                ) ||
                (this.ringHUD as unknown as { getComponent?: (name: string) => unknown }).getComponent?.(
                    "ScriptComponent",
                ) ||
                this.ringHUD;
            if (ringComp && typeof (ringComp as unknown as SpatialHolographicRingHUDLike).setCategory === "function") {
                (ringComp as unknown as SpatialHolographicRingHUDLike).setCategory(targetCategory);
            }
        }

        // Sync category name with SpatialMatrixManager
        if (this.matrixManager) {
            const matrixComp =
                (this.matrixManager as unknown as { getComponent?: (name: string) => unknown }).getComponent?.(
                    "SpatialMatrixManager",
                ) ||
                (this.matrixManager as unknown as { getComponent?: (name: string) => unknown }).getComponent?.(
                    "ScriptComponent",
                ) ||
                this.matrixManager;
            if (matrixComp) {
                (matrixComp as unknown as SpatialMatrixManagerLike).clusterCategoryName =
                    `Spatial ${targetCategory} Matrix`;
            }
        }

        this.isTransitioning = false;
        print(
            `[SpatialCategoryClusterSwitcher] Switched task category: ${previousCategory} -> ${this.activeCategory} 🚀`,
        );

        return {
            previousCategory,
            newCategory: this.activeCategory as SpatialTaskCategory,
            success: true,
        };
    }

    /**
     * Cycles to the next available category in radial order
     */
    public cycleNextCategory(): SpatialTaskCategory {
        const currentIndex = this.availableCategories.indexOf(this.activeCategory as SpatialTaskCategory);
        const nextIndex = (currentIndex + 1) % this.availableCategories.length;
        const nextCategory = this.availableCategories[nextIndex];

        this.switchCategory(nextCategory);
        return nextCategory;
    }

    /**
     * LEAF Automated assertion suite for Category Switcher
     */
    public runLeafCategoryAssertions(): boolean {
        print("[LEAF Category Switcher] Running automated category switcher assertions...");

        const result = this.switchCategory("CREATIVE");
        if (!result.success || result.newCategory !== "CREATIVE") {
            throw new Error(`LEAF Category Assertion Failed: expected CREATIVE, got ${result.newCategory}`);
        }

        const next = this.cycleNextCategory();
        if (next !== "HEALTH") {
            throw new Error(`LEAF Category Assertion Failed: expected next category HEALTH, got ${next}`);
        }

        // Reset back to WORK for default runtime state
        this.switchCategory("WORK");

        print("[LEAF Category Switcher] ✅ ALL CATEGORY SWITCHER ASSERTIONS PASSED!");
        return true;
    }

    public getActiveCategory(): SpatialTaskCategory {
        return this.activeCategory as SpatialTaskCategory;
    }
}

// BuildSync: 2026-08-14T09:11:40.848Z
