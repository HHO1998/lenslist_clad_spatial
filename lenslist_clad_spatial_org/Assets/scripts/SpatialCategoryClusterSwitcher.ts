/**
 * 🌌 SpatialCategoryClusterSwitcher.ts — Multi-Category Task Matrix Switcher
 *
 * Part of Lenslist CLAD Summer Hackathon 2026 (Snap Spectacles)
 * Theme: ORGANIZE (Week 1 Upgrade)
 */

export type SpatialTaskCategory = "WORK" | "PERSONAL" | "CREATIVE" | "HEALTH";

@component
export class SpatialCategoryClusterSwitcher extends BaseScriptComponent {
    @input
    switcherName = "Multi-Category Matrix Switcher";

    @input
    activeCategory = "WORK";

    @allowUndefined
    @input
    ringHUD: SpatialHolographicRingHUD = null as unknown as SpatialHolographicRingHUD;

    @allowUndefined
    @input
    matrixManager: SpatialMatrixManager = null as unknown as SpatialMatrixManager;

    @allowUndefined
    @input
    burstFX: SpatialBurstFX = null as unknown as SpatialBurstFX;

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
        if (this.burstFX && typeof this.burstFX.triggerBurst === "function") {
            this.burstFX.triggerBurst(new vec3(0, 1.5, 1.0));
        }

        // Sync active category with SpatialHolographicRingHUD
        if (this.ringHUD && typeof this.ringHUD.setCategory === "function") {
            this.ringHUD.setCategory(targetCategory);
        }

        // Sync category name with SpatialMatrixManager
        if (this.matrixManager) {
            this.matrixManager.clusterCategoryName = `Spatial ${targetCategory} Matrix`;
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

// BuildSync: 2026-08-13T17:26:07.099Z
